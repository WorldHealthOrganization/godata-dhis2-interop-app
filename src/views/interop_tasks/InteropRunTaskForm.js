import {
    ReactFinalForm,
    Button,
    ButtonStrip,
    Checkbox,
    Table,
    TableHead,
    TableBody,
    TableRowHead,
    CenteredContent,
    CircularLoader,
    TableCellHead,
    TableRow,
    TableCell,
} from '@dhis2/ui'
import { useHistory, useParams } from 'react-router-dom'
import React, { useState, useEffect, useCallback } from 'react'

import axios from 'axios'

import { INTEROP_LIST_PATH } from './InteropList'
import centroid from 'turf-centroid'
import { FormRow } from '../../forms'
import { dataTest } from '../../dataTest'
import i18n from '../../locales'
import styles from './InteropFormNew.module.css'
import { css } from '@emotion/react'
import StatusAlert, { StatusAlertService } from 'react-status-alert'
import 'react-status-alert/dist/status-alert.css'
import { Modal } from 'react-responsive-modal'
import dot from 'dot-object'
const { Form, useForm } = ReactFinalForm
export const INTEROP_RUN_TASK_FORM_PATH_STATIC = '/interop/run'
export const INTEROP_RUN_TASK_FORM_PATH = `${INTEROP_RUN_TASK_FORM_PATH_STATIC}/:id`
import * as dataStore from '../../utils/dataStore.js'
import {
    getDotNotationByValue,
    createAuthenticationHeader,
    sendPayloadTo,
    useCredentials,
} from '../../constants/helpers/index.js'

export const InteropRunTaskForm = () => {
    const history = useHistory()
    const { id } = useParams()
    const { loading, credentials } = useCredentials()
    const onCancelClick = pristine =>
        pristine ? history.goBack() : setShowCancelDialog(true)

    const [checkedConstants, setCheckedConstants] = useState([])
    const [task, setTask] = useState()
    const [inst, setInst] = useState([])
    const [open, setOpen] = useState(false)
    var instanceObject, instance, parentChild, stmp, instanceIds
    const [receiver, setReceiver] = useState()
    const [file, setFile] = useState()
    const [payloadModel, setPayloadModel] = useState()
    const [isDhis, setIsDhis] = useState(false)
    const [taskType, setTaskType] = useState()
    const [senderData, setSenderData] = useState()
    const [mappingModel, setMappingModel] = useState()
    const [finalMessage, setFinalMessage] = useState('')
    const override = css`
        display: block;
        margin: 0 auto;
        border-color: #36d7b7;
    `
    let [sloading, setLoading] = useState(true)

    const getMappings = async (map_id, taskObject) => {
        const mappingObject = (await dataStore.getValue('mappings'))[map_id]
            .mapping
        setMappingModel(mappingObject)
        StatusAlertService.showSuccess(
            i18n.t('Read mappings config - Success.')
        )
        //setTask(JSON.parse(taskObject.data))//in promise
        //setMappings(JSON.parse(mappingObject.data)) //in promise
        // taskConfig 0 - sender API, 1 - receiver API, 2 - sender API filters,
        // 3 - payload model, 4 - is DHIS2 receiver, 5 - mappingsObjectId, 6 - task type

        const iterate = obj => {
            Object.keys(obj).forEach(key => {
                if (key === 'dataValues') {
                    instanceObject.data.trackedEntityInstances.dataValues.push(
                        obj[key]
                    )
                }
                if (typeof obj[key] === 'object') {
                    iterate(obj[key])
                }
            })
        }

        setReceiver(new URL(taskObject[1], credentials.godata.url).href)
        setPayloadModel(taskObject[3])
        setIsDhis(taskObject[4])
        setTaskType(taskObject[6])
        console.log('TASK OBJECT SET:')
        console.log({
            'Sender API': new URL(taskObject[0], credentials.dhis.url).href,
            'Receiver API': taskObject[1],
            'Sender API filters': taskObject[2],
            'Sender API payload model': taskObject[3],
            'Is DHIS2 receiver': taskObject[4],
            'mappings object Id': taskObject[5],
            'task type': taskObject[6],
            'json Collection Name': taskObject[7],
            description: taskObject[8],
        })
        setTask(taskObject[6])
        if (isDhis) {
            StatusAlertService.showInfo(i18n.t('DHIS2 is receiving endpoint.'))
            StatusAlertService.showInfo(
                i18n.t('Login in to Go.Data Instance.') + credentials.godata.url
            )
            const loginObject = await axios.post(
                credentials.godata.url + '/api/users/login',
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods':
                            'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                        'Content-Type': 'application/json',
                        crossDomain: true,
                    },
                    data: {
                        email: credentials.godata.username,
                        password: credentials.godata.password,
                    },
                }
            )
            StatusAlertService.showSuccess(
                i18n.t('Login in to Go.Data Instance - Success.')
            )
            StatusAlertService.showInfo(i18n.t('Reading sender data.'))
            //GET GO.DATA INSTANCES AS PER API ENDPOINT

            instanceObject = await axios.get(
                new URL(taskObject[0], credentials.dhis.url).href +
                    taskObject[2],
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods':
                            'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                        'Content-Type': 'application/json',
                        crossDomain: true,
                        Authorization: loginObject.data.id,
                    },
                }
            )
            StatusAlertService.showSuccess(
                i18n.t('Reading sender data - Success.')
            )
            var tmp = JSON.parse(JSON.stringify(instanceObject.data))
            setSenderData(tmp)
            instance = []
            instanceObject.data.map(function (object, i) {
                instance.push({
                    name: object.name,
                    id: object.id,
                })

                instance = JSON.parse(JSON.stringify(instance)) //MAP AND SHOW MODAL FOR SELECTION

                setInst(instance)
                setOpen(true)
                setLoading(false)
            }) //if DHIS2 is not receiving end
        } else {
            StatusAlertService.showInfo(i18n.t('Reading sender data.'))

            //GET DHIS2 INSTANCES AS PER API ENDPOINT
            if (
                taskObject[6] === 'Go.Data Contact' ||
                taskObject[6] === 'Go.Data Case' ||
                taskObject[6] === 'Go.Data Contact of Contact'
            ) {
                var endpoints = taskObject[0].split(' ')
                var filters = taskObject[2].split(' ')
                console.log(
                    new URL(endpoints[0], credentials.dhis.url).href +
                        filters[0]
                )
                instanceIds = await axios.get(
                    new URL(endpoints[0], credentials.dhis.url).href +
                        filters[0],
                    {
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            Authorization: createAuthenticationHeader(
                                credentials.dhis.username,
                                credentials.dhis.password
                            ),
                            'Access-Control-Allow-Methods':
                                'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                            'Content-Type': 'application/json',
                            crossDomain: true,
                        },
                    }
                )
                var fromPromise = []
                for (let x = 0; x < instanceIds.data.rows.length; x++) {
                    fromPromise.push(instanceIds.data.rows[x][0])
                }
                console.log({ fromPromise })
                instanceObject = {}
                instanceObject['data'] = {}
                instanceObject.data['trackedEntityInstances'] = []
                instanceObject.data.trackedEntityInstances['dataValues'] = []

                for (let x = 0; x < fromPromise.length; x++) {
                    var inst = await axios.get(
                        new URL(endpoints[1], credentials.dhis.url).href +
                            fromPromise[x] +
                            filters[1],
                        {
                            headers: {
                                'Access-Control-Allow-Origin': '*',
                                Authorization: createAuthenticationHeader(
                                    credentials.dhis.username,
                                    credentials.dhis.password
                                ),
                                'Access-Control-Allow-Methods':
                                    'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                                'Content-Type': 'application/json',
                                crossDomain: true,
                            },
                        }
                    )

                    inst.data['id'] = inst.data.trackedEntityInstance
                    inst.data['name'] =
                        'Case ID: ' + inst.data.trackedEntityInstance
                    inst.data['dataValues'] = []

                    instanceObject.data.trackedEntityInstances.push(inst.data)
                }
            } else {
                instanceObject = await axios.get(
                    new URL(taskObject[0], credentials.dhis.url).href +
                        taskObject[2],
                    {
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            Authorization: createAuthenticationHeader(
                                credentials.dhis.username,
                                credentials.dhis.password
                            ),
                            'Access-Control-Allow-Methods':
                                'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                            'Content-Type': 'application/json',
                            crossDomain: true,
                        },
                    }
                )
            }
            console.log({ instanceObject })

            StatusAlertService.showSuccess(
                i18n.t('Reading sender data - Success.')
            )

            var tmp = JSON.parse(
                JSON.stringify(instanceObject.data[taskObject[7]])
            )
            setSenderData(tmp)

            instanceObject.data[taskObject[7]].sort((a, b) =>
                a.level > b.level
                    ? 1
                    : a.level === b.level
                    ? a.size > b.size
                        ? 1
                        : -1
                    : -1
            )

            instance = []
            parentChild = []
            instanceObject.data[taskObject[7]].map(object => {
                instance.push({
                    name: object.name,
                    id: object.id,
                })
                //compute lon/lat coordinates
                var lon = 0,
                    lat = 0

                if (object.geometry) {
                    if (
                        object.geometry.type === 'Polygon' ||
                        object.geometry.type === 'MultiPolygon'
                    ) {
                        //get centroid
                        var centroidPoint = centroid(
                            dot.pick('geometry', object)
                        )
                        lon = centroidPoint.geometry.coordinates[0]
                        lat = centroidPoint.geometry.coordinates[1]
                    } else if ((object.geometry.type = 'Point')) {
                        var point = dot.pick('geometry.coordinates', object)
                        lat = point[0]
                        lon = point[1]
                    } else if (Number.isNaN(lon)) {
                        lon = 0
                    }
                }

                //create Go.Data format of each org unit

                parentChild.push(
                    //{'id': object.id, 'parentId': object?.parent?.id }
                    {
                        location: {
                            name: object.name,
                            synonyms: [object.displayName],
                            identifiers: [object.code],
                            active: true,
                            populationDensity: 0,
                            parentLocationId: object?.parent?.id,
                            geoLocation: {
                                lat: lat,
                                lng: lon,
                            },
                            geographicalLevelId:
                                'LNG_REFERENCE_DATA_CATEGORY_LOCATION_GEOGRAPHICAL_LEVEL_ADMIN_LEVEL_' +
                                (object.level - 1),
                            id: object.id,
                            createdOn: 'System API',
                        },
                    }
                )
            }) //MAP AND SHOW MODAL FOR SELECTION

            instance = JSON.parse(JSON.stringify(instance))
            console.log({ instance })
            if (taskObject[6] == 'Go.Data Location') {
                parentChild = JSON.parse(JSON.stringify(parentChild)) //get real copy from promise

                //reduce relationships of org units
                const idMapping = parentChild.reduce((acc, el, i) => {
                    acc[el.location.id] = i
                    return acc
                }, {})
                //now link them together so we have one hierarchy
                let root
                parentChild.forEach(el => {
                    // Handle the root element
                    if (el.location.parentLocationId === undefined) {
                        root = el
                        return
                    }
                    // Use our mapping to locate the parent element in our data array
                    const parentEl =
                        parentChild[idMapping[el.location.parentLocationId]]
                    // Add our current el to its parent's `children` array
                    parentEl.children = [...(parentEl.children || []), el]
                })

                //send org units to the server

                const json = JSON.stringify([root])
                const file = new File([json], 'orgunits.json', {
                    type: 'application/json',
                    lastModified: new Date(),
                })
                const formData = new FormData()
                formData.append('file', file)
                setFile(formData)
            }

            setInst(instance)
            setOpen(true)
            setLoading(false)
        }
    }

    const processAll = useCallback(async () => {
        StatusAlertService.showInfo(
            i18n.t('Start reading task configurations.')
        )

        //GET TASK DEFINITION
        const taskObject = (await dataStore.getValue('tasks'))[id].task
        StatusAlertService.showSuccess(i18n.t('Read Task config - Success.'))
        //GET TASK'S MAPPINGS DEFINITIONS

        StatusAlertService.showInfo(i18n.t('Reading mappings config.'))

        await getMappings(taskObject[5], taskObject)
    })

    useEffect(() => {
        if (!!credentials) {
            processAll()
        }
    }, [loading])

    const allConstantsChecked = checkedConstants.length === inst.length

    const toggleConstant = id => {
        if (checkedConstants.includes(id)) {
            const index = checkedConstants.findIndex(curId => curId === id)
            const newCheckedConstants =
                index === 0
                    ? checkedConstants.slice(1)
                    : [
                          ...checkedConstants.slice(0, index),
                          ...checkedConstants.slice(index + 1),
                      ]
            setCheckedConstants(newCheckedConstants)
        } else {
            setCheckedConstants([...checkedConstants, id])
        }
    }

    const toggleAll = () => {
        if (!allConstantsChecked) setCheckedConstants(inst.map(({ id }) => id))
        else setCheckedConstants([])
    }

    const runAllTasks = async () => {
        const taskPromises = []
        if (taskType === 'Go.Data Location') {
            getTaskDone(1)
                .then(res => {
                    setFinalMessage(`Locations send and processed successfully. Organisation units: ${JSON.stringify(res?.data.length)}`)
                    setLoading(false)
                })
                .catch(error =>{
                    setFinalMessage(JSON.stringify(error?.response?.data))
                    setLoading(false)
                })
            return
        }

        for (let y = 0; y < checkedConstants.length; ++y)
            taskPromises.push(getTaskDone(y))

        Promise.all(taskPromises).then(() => {
            setLoading(false)
        })
    }

    const getTaskDone = async y => {
        let mappings = []
        setOpen(false)
        setLoading(true)

        const senderObject = senderData.find(x => x.id === checkedConstants[y])
        stmp = senderObject
        var currentTaskType = 'Go.Data Contact' || 'Go.Data Case'
        if (taskType === currentTaskType) {
            stmp['dataElements'] = []
            //here we have some fixed linkage, need to formulate to make it generic too
            if (stmp.enrollments.length > 0) {
                for (
                    var i = 0, length = stmp.enrollments[0].events.length;
                    i < length;
                    i++
                ) {
                    stmp.dataElements.push(
                        stmp.enrollments[0].events[i].dataValues
                    )
                }
            }
        }
        const iterate = obj => {
            var walked = []
            var stack = [
                {
                    obj: obj,
                    stack: '',
                },
            ]
            mappings = []
            var i = 0

            while (stack.length > 0) {
                var item = stack.pop()
                var obj = item.obj

                for (var property in obj) {
                    if (obj.hasOwnProperty(property)) {
                        if (typeof obj[property] == 'object') {
                            var alreadyFound = false

                            for (var i = 0; i < walked.length; i++) {
                                if (walked[i] === obj[property]) {
                                    alreadyFound = true
                                    break
                                }
                            }

                            if (!alreadyFound) {
                                walked.push(obj[property])
                                stack.push({
                                    obj: obj[property],
                                    stack: item.stack + '.' + property,
                                })
                            }
                        } else {
                            i++
                            dot.str(
                                (item.stack + '.' + property)
                                    .substr(1)
                                    .toString(),
                                getDotNotationByValue(
                                    (item.stack + '.' + property).substr(1),
                                    mappingModel,
                                    stmp
                                ),
                                payloadModel
                            )
                        }
                    }
                }
            }
        }
        console.log({ taskType })
        if (!taskType != 'Go.Data Location') {
            iterate(payloadModel)
        }

        //SEND PAYLOAD TO RECIEVER
        StatusAlertService.showInfo(i18n.t('Start sending data'))

        if (taskType === 'Go.Data Location')
            return sendPayloadTo(receiver, file, credentials)
        return sendPayloadTo(receiver, payloadModel, credentials)
    }

    const onCloseModal = () => {
        setOpen(false)
        setLoading(true)
    }

    const onSubmit = values => {
        history.push(INTEROP_LIST_PATH)
    }

    if (!sloading && !open)
        return (
            <>
                <h4>{finalMessage}</h4>
                <Button onClick={() => history.push(INTEROP_LIST_PATH)}>
                    {i18n.t('Go back to tasks')}
                </Button>
            </>
        )

    if (sloading)
        return (
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        )

    return (
        <div
            data-test={dataTest('views-gatewayconfigformnew')}
            className={styles.container}
        >
            <Form destroyOnUnregister onSubmit={onSubmit}>
                {({ handleSubmit, pristine }) => (
                    <form>
                        <FormRow>
                            <Modal open={open} onClose={onCloseModal} center>
                                <h2>Select item(s)</h2>
                                <p>{task}</p>
                                <ButtonStrip>
                                    <Button
                                        primary
                                        disabled={!checkedConstants.length > 0}
                                        onClick={() => runAllTasks()}
                                    >
                                        {i18n.t('Proceed')}
                                    </Button>
                                    <Button
                                        onClick={() => onCancelClick(pristine)}
                                    >
                                        {i18n.t('Cancel')}
                                    </Button>
                                </ButtonStrip>
                                <Table
                                    dataTest={dataTest(
                                        'constants-constantstable'
                                    )}
                                >
                                    <TableHead>
                                        <TableRowHead>
                                            <TableCellHead
                                                dataTest={dataTest(
                                                    'constants-constantstable-checkall'
                                                )}
                                            >
                                                <Checkbox
                                                    onChange={toggleAll}
                                                    checked={
                                                        allConstantsChecked
                                                    }
                                                />
                                            </TableCellHead>
                                            <TableCellHead>
                                                {i18n.t('Name')}
                                            </TableCellHead>
                                        </TableRowHead>
                                    </TableHead>

                                    <TableBody>
                                        {inst.map(constant => (
                                            <TableRow
                                                key={constant.id}
                                                dataTest={dataTest(
                                                    'constants-constantstable-row'
                                                )}
                                            >
                                                <TableCell
                                                    className={
                                                        styles.checkboxCell
                                                    }
                                                    dataTest={dataTest(
                                                        'constants-constantstable-checkbox'
                                                    )}
                                                >
                                                    <Checkbox
                                                        value={constant.id}
                                                        onChange={() =>
                                                            toggleConstant(
                                                                constant.id
                                                            )
                                                        }
                                                        checked={checkedConstants.includes(
                                                            constant.id
                                                        )}
                                                        dataTest={dataTest(
                                                            'constants-constantstable-id'
                                                        )}
                                                    />
                                                </TableCell>

                                                <TableCell
                                                    dataTest={dataTest(
                                                        'constants-constantstable-name'
                                                    )}
                                                >
                                                    {constant.name}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Modal>
                        </FormRow>
                    </form>
                )}
            </Form>
        </div>
    )
}
