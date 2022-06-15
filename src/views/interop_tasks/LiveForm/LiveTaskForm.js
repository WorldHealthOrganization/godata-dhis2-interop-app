import React, { useState, useEffect } from 'react'
import { FormComponent } from './FormComponent.js'
import { DataTablePreview } from './DataTablePreview.js'
import { AlertBar, CenteredContent, CircularLoader } from '@dhis2/ui'

import { useReadProgramsWithStagesQueryForMappings } from '../../../constants'
import {
    buildUrl,
    useCredentials,
    dhis2Headers,
} from '../../../constants/helpers'
import {
    getFromDHIS2,
    getFromGoData,
    getGodataToken,
    postToDHIS2,
    postToGodata,
} from '../../../utils/api.js'
import { Mapping } from '../../../models/mapping.js'
import { Task } from '../../../models/task.js'
import { EndScreen } from './EndScreen.js'

export const LiveTaskForm = () => {
    const { loading, credentials } = useCredentials()
    const [data, setData] = useState()
    const [columns, setColumns] = useState([])
    const [formAnswer, setFormAnswer] = useState({})
    const [alertBar, setAlertBar] = useState(false)
    const [alertBarMessage, setAlertBarMessage] = useState(false)
    const [transmissionLoading, setTransmissionLoading] = useState(false)
    const [taskConfig, setTaskConfig] = useState(true)
    const [endScreen, setEndScreen] = useState(false)
    const [endMessage, setEndMessage] = useState('')
    const [isErrorTransmission, setIsErrorTransmission] = useState([])

    const {
        loadingPrograms,
        data: progData,
        error,
    } = useReadProgramsWithStagesQueryForMappings()

    useEffect(() => {
        return () => {
            setTransmissionLoading(false)
            setEndScreen(true)
        }
    }, [endMessage])

    const dataSubmit = ({ mapping: mappingDump, idsToSend }) => {
        const mapping = new Mapping()
        mapping.setMapping(mappingDump)

        if (idsToSend.length === 0) return

        if (formAnswer.action === 'export') {
            console.log(Task.getIdFromTaskType(formAnswer.taskType))
            const senderObjects = data.filter(elem =>
                idsToSend.includes(
                    elem[Task.getIdFromTaskType(formAnswer.taskType)]
                )
            )
            console.log({ senderObjects, idsToSend, data })
            getGodataToken(credentials).then(async token => {
                setTransmissionLoading(true)
                return Promise.all(
                    senderObjects.map(object => {
                        console.log(mapping.applyMappingExport(object))
                        return postToGodata(
                            formAnswer.pathReceiver,
                            credentials,
                            mapping.applyMappingExport(object),
                            token
                        )
                    })
                ).then(e => {
                    console.log(e)
                    if (e.length > 0) {
                        const errors = e.map(
                            ({
                                response: {
                                    data: {
                                        error: { message },
                                    },
                                },
                            }) => message
                        )
                        setIsErrorTransmission(errors)
                        setEndMessage(
                            `The ${formAnswer.action} task has been completed with the following errors:`
                        )
                    } else {
                        setIsErrorTransmission([])
                        setEndMessage(
                            `The ${formAnswer.action} task has been completed successfully!`
                        )
                    }
                })
            })
        } else if (formAnswer.action === 'import') {
            let senderObjects = data.filter(elem => idsToSend.includes(elem.id))
            postToDHIS2(formAnswer.pathReceiver, credentials, {
                [formAnswer.taskType]: senderObjects.map(o =>
                    mapping.applyMappingImport(o, formAnswer.programId)
                ),
            })
        }
    }

    const taskSubmit = ({
        name,
        pathReceiver,
        pathSender,
        program: programId,
        action,
        taskType,
    }) => {
        console.log({
            name,
            pathSender,
            credentials,
            programId,
            taskType,
        })

        setFormAnswer({
            name,
            pathReceiver,
            credentials,
            programId,
            action,
            taskType,
        })

        if (action === 'export') {
            const dhis2Endpoint = buildUrl(credentials.dhis2.url, pathSender, [
                { key: 'program', value: programId },
            ])
            setColumns(Task.getColumnsFromTaskType(taskType))
            getFromDHIS2(dhis2Endpoint, credentials)
                .then(({ data }) => {
                    if (!!data && !!data[taskType]) {
                        setData(data[taskType])
                        setTaskConfig(false)
                    } else {
                        setAlertBarMessage(
                            'No data was found with this configuration'
                        )
                        setAlertBar(true)
                    }
                })
                .catch(e => {
                    setAlertBarMessage('Error requesting data from DHIS2')
                    setAlertBar(true)
                })
        } else if (action === 'import') {
            if (taskType === 'programs') {
                setAlertBarMessage('Function not available: Import outbreak.')
                setAlertBar(true)
                return
            }
            const goDataEndpoint = buildUrl(credentials.godata.url, pathSender)
            setColumns(['id', 'firstName', 'classification'])
            getFromGoData(goDataEndpoint, credentials)
                .then(({ data }) => {
                    setData(data)
                    setTaskConfig(false)
                })
                .catch(e => {
                    setAlertBarMessage('Error requesting data from Go.Data')
                    setAlertBar(true)
                })
        }
    }

    const onCancel = () => {
        setTaskConfig(true)
        setFormAnswer({})
        setAlertBar(false)
        setEndScreen(false)
    }

    if (loading || loadingPrograms || transmissionLoading) {
        return (
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        )
    }

    if (endScreen)
        return (
            <EndScreen
                text={endMessage}
                errors={isErrorTransmission}
                onCancel={onCancel}
            />
        )

    if (!taskConfig)
        return (
            <DataTablePreview
                columns={columns}
                data={data}
                onSubmit={dataSubmit}
                onCancel={onCancel}
                program={progData.programs.programs.find(
                    ({ id }) => formAnswer.programId === id
                )}
                isExport={formAnswer.action === 'export'}
            />
        )

    return (
        <>
            <FormComponent onSubmit={taskSubmit} progData={progData} />
            {alertBar && (
                <div
                    style={{
                        height: '260px',
                    }}
                >
                    <div
                        className="alert-bars"
                        style={{
                            bottom: 0,
                            left: 0,
                            paddingLeft: 16,
                            position: 'fixed',
                            width: '100%',
                        }}
                    >
                        <React.Fragment key=".0">
                            <AlertBar
                                onHidden={() => setAlertBar(false)}
                                critical={alertBar}
                            >
                                {alertBarMessage}
                            </AlertBar>
                        </React.Fragment>
                    </div>
                </div>
            )}
        </>
    )
}
