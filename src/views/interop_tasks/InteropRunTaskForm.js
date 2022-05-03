import {
    ReactFinalForm,
    NoticeBox,
    CenteredContent,
    CircularLoader,
    Button,
    ButtonStrip,
    Checkbox,
    Table,
    TableHead,
    TableBody,
    TableRowHead,
    TableCellHead,
    TableRow,
    TableCell,
} from '@dhis2/ui'
import { useHistory, useParams } from 'react-router-dom'
import React, { useState, useEffect, useCallback } from 'react'
import { useConfig } from '@dhis2/app-runtime'

import axios from 'axios'

import { INTEROP_LIST_PATH } from './InteropList'
import centroid from 'turf-centroid'
import { FormRow } from '../../forms'
import { PageHeadline } from '../../headline'
import { dataTest } from '../../dataTest'
import i18n from '../../locales'
import styles from './InteropFormNew.module.css'
import { css } from '@emotion/react'
import ClipLoader from 'react-spinners/ClipLoader'
import StatusAlert, { StatusAlertService } from 'react-status-alert'
import 'react-status-alert/dist/status-alert.css'
import { Modal } from 'react-responsive-modal'
import dot from 'dot-object'
import {
    useReadMappingConfigConstantsQueryForConfig,
    useReadConstantsQueryForDhisConfig,
} from '../../constants'
const { Form, useForm } = ReactFinalForm
export const INTEROP_RUN_TASK_FORM_PATH_STATIC = '/interop/run'
export const INTEROP_RUN_TASK_FORM_PATH = `${INTEROP_RUN_TASK_FORM_PATH_STATIC}/:id`
import { getCredentialsFromUserDataStore } from '../../utils/get'
import * as dataStore from '../../utils/dataStore.js'

export const InteropRunTaskForm = () => {
    const history = useHistory()
    const { id } = useParams()

    const [showCancelDialog, setShowCancelDialog] = useState(false)
    const [dhisBaseUrl, setDhisBaseUrl] = useState("")
    const [godataBaseUrl, setGodataBaseUrl] = useState("")
    const onCancelClick = pristine =>
        pristine ? history.goBack() : setShowCancelDialog(true)

    const [checkedConstants, setCheckedConstants] = useState([])
    const [alertId, setAlertId] = useState('')
    const [task, setTask] = useState()
    const [mappings, setMappings] = useState()
    const [godataLogn, setGodataLogin] = useState()
    const [token, setToken] = useState()
    const [inst, setInst] = useState([])
    const [open, setOpen] = useState(false)
    var instanceObject,
        instance,
        message,
        parentChild,
        thisId,
        stmp,
        orgUnitHolder,
        instanceIds,
        instanceObjects
    const [sender, setSender] = useState()
    const [receiver, setReceiver] = useState()
    const [filter, setFilter] = useState()
    const [file, setFile] = useState()
    const [payloadModel, setPayloadModel] = useState()
    const [isDhis, setIsDhis] = useState()
    const [taskType, setTaskType] = useState()
    const [jsonCollectionName, setJsonCollectionName] = useState()
    const [senderData, setSenderData] = useState()
    const [mappingModel, setMappingModel] = useState()
    const [parentChildRelations, setParentChildRelations] = useState([])
    const [existingId, setExistingId] = useState()

    const override = css`
        display: block;
        margin: 0 auto;
        border-color: #36d7b7;
    `
    let [sloading, setLoading] = useState(true)
    let [color, setColor] = useState('#ffffff')

    const createAuthenticationHeader = (username, password) => {
        return (
            'Basic ' +
            new Buffer.from(username + ':' + password).toString('base64')
        )
    }

    const {
        lloading,
        data: progData,
        lerror,
    } = useReadConstantsQueryForDhisConfig()
    const {
        loading,
        data,
        error,
    } = useReadMappingConfigConstantsQueryForConfig()

    const getMappings = async (map_id, taskObject) => {
        const credentials = await getCredentialsFromUserDataStore()
        const mappingObject = (await dataStore.getValue('mappings'))[map_id]
            .mapping
        setMappings(mappingObject)

        message = StatusAlertService.showSuccess(
            i18n.t('Read mappings config - Success.')
        )
        setAlertId({
            message,
        })
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

        setSender(taskObject[0])
        const urlString = new URL(taskObject[1], credentials.godata.url).href
        setReceiver(urlString)
        setFilter(taskObject[2])
        setPayloadModel(taskObject[3])
        setIsDhis(taskObject[4])
        setTaskType(taskObject[6])
        setJsonCollectionName(taskObject[7])
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
        })
        setMappingModel(mappingObject)
        setTask(taskObject[6])
        if (isDhis) {
            message = StatusAlertService.showInfo(
                i18n.t('DHIS2 is receiving endpoint.')
            )
            setAlertId({
                message,
            })
            message = StatusAlertService.showInfo(
                i18n.t('Login in to Go.Data Instance.') + credentials.godata.url
            )
            setAlertId({
                message,
            }) //get Go.Data security token

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
            message = StatusAlertService.showSuccess(
                i18n.t('Login in to Go.Data Instance - Success.')
            )
            setAlertId({
                message,
            })
            message = StatusAlertService.showInfo(
                i18n.t('Reading sender data.')
            )
            setAlertId({
                message,
            }) //GET GO.DATA INSTANCES AS PER API ENDPOINT

            instanceObject = await axios.get(
                new URL(taskObject[0], credentials.dhis.url).href + taskObject[2],
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
            message = StatusAlertService.showSuccess(
                i18n.t('Reading sender data - Success.')
            )
            setAlertId({
                message,
            })
            var tmp = JSON.parse(JSON.stringify(instanceObject.data))
            setSenderData(tmp)
            instance = []
            instanceObject.data.map(function(object, i) {
                instance.push({
                    name: object.name,
                    id: object.id,
                })

                instance = JSON.parse(JSON.stringify(instance)) //MAP AND SHOW MODAL FOR SELECTION

                setInst(instance)
                setLoading(false)
                setOpen(true)
            }) //if DHIS2 is not receiving end
        } else {
            message = StatusAlertService.showInfo(
                i18n.t('Reading sender data.')
            )
            setAlertId({
                message,
            })

            //GET DHIS2 INSTANCES AS PER API ENDPOINT
            if (
                taskObject[6] === 'Go.Data Contact' ||
                taskObject[6] === 'Go.Data Case' ||
                taskObject[6] === 'Go.Data Contact of Contact'
            ) {
                var endpoints = taskObject[0].split(' ')
                var filters = taskObject[2].split(' ')

                instanceIds = await axios.get(
                    new URL(endpoints[0], credentials.dhis.url).href + filters[0],
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
                instanceObject = {}
                instanceObject['data'] = {}
                instanceObject.data['trackedEntityInstances'] = []
                instanceObject.data.trackedEntityInstances['dataValues'] = []
                for (let x = 0; x < fromPromise.length; x++) {
                    var inst = await axios.get(
                        endpoints[1] + fromPromise[x] + filters[1],
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
                    new URL(taskObject[0], credentials.dhis.url).href + taskObject[2],
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

            message = StatusAlertService.showSuccess(
                i18n.t('Reading sender data - Success.')
            )
            setAlertId({
                message,
            })

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
            instanceObject.data[taskObject[7]].map(function(object, i) {
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
                //sendOrgUnits(data)

                //download json hierarchy of org units

                const link = document.createElement('a')
                link.href = URL.createObjectURL(file)
                link.download = 'orgunits.json'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            }

            setInst(instance)
            setParentChildRelations([root])
            setLoading(false)
            setOpen(true)
        }
    }

    const processAll = useCallback(async () => {
        message = StatusAlertService.showInfo(
            i18n.t('Start reading task configurations.')
        )
        setAlertId({
            message,
        })

        const credentials = await getCredentialsFromUserDataStore()

        setDhisBaseUrl(credentials.dhis.url)
        setGodataBaseUrl(credentials.godata.url)
        message = StatusAlertService.showSuccess(
            i18n.t('Reading task configurations - Success.')
        )
        setAlertId({
            message,
        })

        if (!!data) {
            message = StatusAlertService.showInfo(
                i18n.t(
                    'Loging in to Go.Data Instance.' + credentials.godata.url
                )
            )
            setAlertId({
                message,
            })
            //GET GO.DATA LOGIN TOKEN

            message = StatusAlertService.showSuccess(
                i18n.t('Loging to Go.Data Instance Success.')
            )
            setAlertId({
                message,
            })

            //GET TASK DEFINITION
            const taskObject = (await dataStore.getValue('tasks'))[id].task
            message = StatusAlertService.showSuccess(
                i18n.t('Read Task config - Success.')
            )
            setAlertId({
                message,
            }) //GET TASK'S MAPPINGS DEFINITIONS

            message = StatusAlertService.showInfo(
                i18n.t('Reading mappings config.')
            )
            setAlertId({
                message,
            })
            await getMappings(taskObject[5], taskObject)
        }
        setLoading(false)
    })

    useEffect(() => {
        processAll()
    }, [data, progData])

    if (loading) {
        return (
            <>
                <CenteredContent>
                    <CircularLoader />
                </CenteredContent>
            </>
        )
    }

    if (error) {
        const msg = i18n.t('Something went wrong whilst loading data')
        return (
            <>
                <PageHeadline>{i18n.t('Edit')}</PageHeadline>
                <NoticeBox error title={msg}>
                    {loadError.message}
                </NoticeBox>
            </>
        )
    }

    if (lloading) {
        return (
            <>
                <CenteredContent>
                    <CircularLoader />
                </CenteredContent>
            </>
        )
    }

    if (lerror) {
        const msg = i18n.t('Something went wrong whilst loading gateways')
        return (
            <>
                <PageHeadline>{i18n.t('Edit')}</PageHeadline>
                <NoticeBox error title={msg}>
                    {loadError.message}
                </NoticeBox>
            </>
        )
    }

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
        if (!allConstantsChecked) {
            const allConstantIds = inst.map(({ id }) => id)
            setCheckedConstants(allConstantIds)
        } else {
            setCheckedConstants([])
        }
    } //NOW WE HAVE EVERYTHING TO PROCESS CONVERSION

    orgUnitHolder = [] //holds json objects of all org units

    const runAllTasks = () => {
        for (var y = 0; y < checkedConstants.length; y++) {
            if (taskType === 'Go.Data Location' && y === 1) {
                return
            }
            getTaskDone(y)
        }
    }

    const getTaskDone = y => {
        setOpen(false)

        var model = JSON.parse(JSON.stringify(payloadModel))

        var mappings
        const senderObject = senderData.find(x => x.id === checkedConstants[y])
        stmp = senderObject
        var currentTaskType = 'Go.Data Contact' || 'Go.Data Case'
        if (taskType === currentTaskType) {
            stmp['dataElements'] = []
            //here we have some fixed linkage, need to formulate to make it generic too
            for (
                var i = 0, length = stmp.enrollments[0].events.length;
                i < length;
                i++
            ) {
                stmp.dataElements.push(stmp.enrollments[0].events[i].dataValues)
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
                                    (item.stack + '.' + property).substr(1)
                                ),
                                payloadModel
                            )
                        }
                    }
                }
            }
        }

        if (!taskType != 'Go.Data Location') {
            console.log({ pre: payloadModel })
            iterate(payloadModel)
            console.log({ post: payloadModel })
        }

        //SEND PAYLOAD TO RECIEVER
        message = StatusAlertService.showInfo(i18n.t('Start sending data'))
        setAlertId({
            message,
        })
        login()
    }

    const getDotNotationByValue = dotnot => {
        //set dotnot to string if its number
        if (typeof dotnot === 'number') {
            dotnot = dotnot.toString()
        }

        //GET MAPPING MODEL
        var dataArray = mappingModel[0].godataValue[1]

        if (isDhis) {
            //IF DHIS2 IS RCEIVING END
            let tmp = dataArray.find(x => x.godata === dotnot)
            if (tmp) {
                //IF MAPPING FOUND AND HAS CONVERSION. THIS MEANS VALUE SHOULD BE FETCHED FROM OTHER
                // PARTY OBJECT AND IF THERE IS CONVERSION OF VALUES TO PROCESS CONVERSION
                if (tmp.props.conversion === 'true') {
                    stmp = senderData[0] //TO BE DYNAMIC

                    let val = dot.pick(tmp.dhis2, stmp) //IN CASE OF GO.DATA, PROPERTY IS USED FOR SEARCHING CONVERSION VALUE

                    var stringBoolean = ''

                    if (typeof val == 'boolean') {
                        stringBoolean = val ? 'true' : 'false'
                    } else {
                        stringBoolean = val
                    }

                    if (tmp.props.values[stringBoolean]) {
                        //RETURN CONVERTED VALUE
                        return tmp.props.values[stringBoolean]
                    } else {
                        //RETURN RAW VALUE IF NOT FOUND IN CONVERSION TABLE
                        return val
                    }
                } else if (tmp.props.conversion === 'geo') {
                    console.log('call a method here for geometry')
                } else {
                    return tmp.dhis2
                }
            } else {
                return 'NO VALUE SET'
            }
        } else {
            //DHIS2 IS SENDER

            let tmp = dataArray.find(x => x.godata === dotnot)

            if (tmp) {
                //IF MAPPING FOUND HAS CONVERSION. THIS MEANS VALUE SHOULD BE FETCHED FROM OTHER
                // PARTY OBJECT AND IF THERE IS CONVERSION OF VALUES TO PROCESS CONVERSION
                if (
                    tmp.props.conversion === 'true' ||
                    typeof tmp.props.conversion == 'boolean'
                ) {
                    let val = dot.pick(tmp.dhis2, stmp)
                    //set val to string if its number
                    if (typeof val === 'number') {
                        val = val.toString()
                    }

                    var stringBoolean = ''

                    if (typeof val == 'boolean') {
                        stringBoolean = val ? 'true' : 'false'
                    } else {
                        stringBoolean = val
                    } //IN CASE OF DHIS2 PROPERTY VALUE IS USED FOR SEARCHING CONVERSION VALUE
                    if (tmp.dhis2 === 'id') {
                        thisId = val
                        setExistingId(val)
                    }

                    let keys = Object.keys(tmp.props.values)
                    for (let i = 0; i < keys.length; i++) {
                        if (stringBoolean == tmp.props.values[keys[i]]) {
                            return keys[i]
                        }
                    }
                    //RETURN RAW VALUE IF NOT FOUND IN CONVERSION TABLE
                    return val
                } else if (tmp.props.conversion === 'geo') {
                    const geom = dot.pick('geometry', stmp)

                    if (geom) {
                        if ((geom.type = 'Polygon')) {
                            //get centroid
                            var centroidPoint = centroid(
                                dot.pick('geometry', stmp)
                            )
                            var lon = centroidPoint.geometry.coordinates[0]
                            var lat = centroidPoint.geometry.coordinates[1]
                            if (Number.isNaN(centroidPoint)) {
                                //try to get Point instead
                                var point = dot.pick(
                                    'geometry.coordinates',
                                    stmp
                                )
                                if (tmp.godata === 'geoLocation.lat') {
                                    return point[0]
                                } else if (tmp.godata === 'geoLocation.lng') {
                                    return point[1]
                                } else {
                                    return 0
                                }
                            } else {
                                if (tmp.godata === 'geoLocation.lat') {
                                    return lat
                                } else if (tmp.godata === 'geoLocation.lng') {
                                    return lon
                                } else {
                                    return 0
                                }
                            }
                        } else if ((geom.type = 'Point')) {
                            var point = dot.pick('geometry.coordinates', stmp)
                            if (tmp.godata === 'geoLocation.lat') {
                                return point[0]
                            } else if (tmp.godata === 'geoLocation.lng') {
                                return point[1]
                            }
                        } else {
                            return 0
                        }
                    }
                    //none of tries are successful, simply return 0
                    return 0
                } else if (tmp.props.conversion === 'delm') {
                    for (
                        var i = 0;
                        i < stmp.enrollments[0].events.length;
                        i++
                    ) {
                        for (
                            var y = 0;
                            y < stmp.enrollments[0].events[i].dataValues.length;
                            y++
                        ) {
                            if (
                                stmp.enrollments[0].events[i].dataValues[y]
                                    .dataElement == tmp.dhis2
                            ) {
                                return stmp.enrollments[0].events[i].dataValues[
                                    y
                                ].value
                            }
                        }
                    }
                } else if (tmp.props.conversion === 'attr') {
                    for (var i = 0; i < stmp.attributes.length; i++) {
                        if (stmp.attributes[i].attribute == tmp.dhis2) {
                            return stmp.attributes[i].value
                        }
                    }
                } else {
                    //nothing could help, simply return what was given
                    return tmp.dhis2
                }
            }
        }
    } //end of getTaskDone()

    async function login() {
        const credentials = await getCredentialsFromUserDataStore()
        try {
            let res = await axios({
                method: 'POST',
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
                url: credentials.godata.url + '/api/users/login',
            })

            if (res.status == 200) {
                setToken(JSON.parse(JSON.stringify(res.data.id)))

                if (taskType === 'Go.Data Location') {
                    axios({
                        method: 'post',
                        url: receiver + '?access_token=' + res.data.id,
                        data: file,
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods':
                                'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                        .then(function(response) {
                            //handle success
                            message = StatusAlertService.showSuccess(
                                i18n.t(
                                    'Locations send and processed successfully' +
                                        JSON.stringify(response?.data.length)
                                ) + ' Organisation Units processed.',
                                {
                                    autoHideTime: 10000000,
                                }
                            )
                            setAlertId({
                                message,
                            })
                        })
                        .catch(function(response) {
                            //handle error
                            message = StatusAlertService.showError(
                                i18n.t(
                                    'Locations sending failed: ' +
                                        JSON.stringify(error?.response?.data)
                                ),
                                {
                                    autoHideTime: 10000000,
                                }
                            )
                            setAlertId({
                                message,
                            })
                        })
                } else {
                    console.log({ payloadModel })
                    let ans = await axios({
                        method: 'POST',
                        data: payloadModel,
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods':
                                'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                            'Content-Type': 'application/json',
                            crossDomain: true, //Authorization: `bearer ${res.data.id}` ,
                        },
                        url: receiver + '?access_token=' + res.data.id,
                    })

                    if (res.status == 200) {
                        message = StatusAlertService.showSuccess(
                            i18n.t(
                                'Data send successfully. ' +
                                    JSON.stringify(ans.data)
                            ),
                            {
                                autoHideTime: 10000000,
                            }
                        )
                        setAlertId({
                            message,
                        })
                    }
                }
            }
        } catch (error) {
            message = StatusAlertService.showError(
                i18n.t(
                    'Data sending failed: ' +
                        JSON.stringify(error?.response?.data)
                ),
                {
                    autoHideTime: 10000000,
                }
            )
            setAlertId({
                message,
            })
        }
    }

    const onCloseModal = () => {
        setOpen(false)
    }

    const onSubmit = values => {
        history.push(INTEROP_LIST_PATH)
    }

    return (
        <div
            data-test={dataTest('views-gatewayconfigformnew')}
            className={styles.container}
        >
            <StatusAlert />
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
            <ClipLoader
                color={color}
                loading={sloading}
                css={override}
                size={150}
            />
        </div>
    )
}
