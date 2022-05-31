import React, { useState, useEffect } from 'react'
import { Form } from './Form.js'
import { DataTablePreview } from './DataTablePreview.js'
import { AlertBar, CenteredContent, CircularLoader } from '@dhis2/ui'

import { useReadProgramsWithStagesQueryForMappings } from '../../../constants'
import {
    buildUrl,
    useCredentials,
    dhis2Headers,
} from '../../../constants/helpers'
import { getFromDHIS2, getFromGoData, postToDHIS2 } from '../../../utils/api.js'
import { getCredentialsFromUserDataStore } from '../../../utils/get.js'
import { Mapping } from '../../../models/mapping.js'

export const LiveTaskForm = () => {
    const [credentials, setCredentials] = useState({})
    const [data, setData] = useState()
    const [columns, setColumns] = useState([])
    const [formAnswer, setFormAnswer] = useState({})
    const [alertBar, setAlertBar] = useState(false)
    const [alertBarMessage, setAlertBarMessage] = useState(false)
    const [loadingCredentials, setLoadingCredentials] = useState(true)

    const {
        loadingPrograms,
        data: progData,
        error,
    } = useReadProgramsWithStagesQueryForMappings()

    useEffect(() => {
        getCredentialsFromUserDataStore().then(res => {
            setCredentials(res)
            setLoadingCredentials(false)
        })
    }, [])

    const dataSubmit = ({ mapping: mappingDump, idsToSend }) => {
        console.log("dataSubmit")
        const mapping = new Mapping()
        mapping.setMapping(mappingDump)

        if (idsToSend.length === 0) return

        if (formAnswer.action === 'export') {
            const senderObjects = data.filter(elem =>
                idsToSend.includes(elem['trackedEntityInstance'])
            )

            senderObjects.forEach(mapping.applyMappingExport)
        } else if (formAnswer.action === 'import') {
            let senderObjects = data.filter(elem => idsToSend.includes(elem.id))
            console.log(senderObjects)
            postToDHIS2(formAnswer.pathReceiver, credentials, {
                trackedEntityInstances: senderObjects.map(o =>
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
    }) => {
        console.log({
            name,
            pathSender,
            credentials,
            programId,
        })

        setFormAnswer({
            name,
            pathReceiver,
            credentials,
            programId,
            action,
        })

        if (action === 'export') {
            const dhis2Endpoint = buildUrl(credentials.dhis.url, pathSender, [
                { key: 'program', value: programId },
            ])
            getFromDHIS2(dhis2Endpoint, credentials)
                .then(({ data }) => setData(data.trackedEntityInstances))
                .catch(e => console.log(e))
            setColumns(['trackedEntityInstance', 'orgUnit', 'created'])
        } else if (action === 'import') {
            const goDataEndpoint = buildUrl(credentials.godata.url, pathSender)
            getFromGoData(goDataEndpoint, credentials)
                .then(({ data }) => setData(data))
                .catch(e => {
                    setAlertBarMessage('Error requesting data from Go.Data')
                    setAlertBar(true)
                })
            setColumns(['id', 'firstName', 'classification'])
        }
    }

    if (loadingCredentials || !progData) {
        return (
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        )
    }

    if (!!data && !!formAnswer)
        return (
            <DataTablePreview
                columns={columns}
                data={data}
                onSubmit={dataSubmit}
                program={progData.programs.programs.find(
                    ({ id }) => formAnswer.programId === id
                )}
                isExport={formAnswer.action === "export"}
            />
        )

    return (
        <>
            <Form onSubmit={taskSubmit} progData={progData} />
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
                                critical
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
