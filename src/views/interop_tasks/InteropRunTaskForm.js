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
import React, { useState, useQuery, useEffect } from 'react'

import axios from 'axios'

import api from '../../utils/api'
import { useConfig } from '@dhis2/app-runtime'

import { INTEROP_LIST_PATH } from './InteropList'
import traverse from 'traverse'
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
import { classImplements } from '@babel/types'
const { Form, useForm } = ReactFinalForm
export const INTEROP_RUN_TASK_FORM_PATH_STATIC = '/interop/run'
export const INTEROP_RUN_TASK_FORM_PATH = `${INTEROP_RUN_TASK_FORM_PATH_STATIC}/:id`
export const InteropRunTaskForm = () => {
    const history = useHistory()
    const { id } = useParams()

    const [showCancelDialog, setShowCancelDialog] = useState(false)

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
        messg,
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
    let [sloading, setLoading] = useState(false)
    let [color, setColor] = useState('#ffffff')

    const config = useConfig()
    console.log(JSON.stringify(config.baseUrl))

    const createAuthenticationHeader = (username, password) => {
        return (
            'Basic ' + new Buffer(username + ':' + password).toString('base64')
        )
    }

    const [godataUser, setGodataUser] = useState()
    const [godataUserPass, setGodataUserPass] = useState()
    const [godataUrl, setGodataUrl] = useState()
    const [loginDetailsGodata, setCredentialsValuesGodata] = useState()

    api.getValue('dhis2-godata-interop-configuration', 'godatauser')
        .then(response => {
            setGodataUser(response.value)
            console.log('godatauser ' + JSON.stringify(response.value))
        })
        .catch(e => {
            setGodataUser('')
            api.createValue(
                'dhis2-godata-interop-configuration',
                'godatauser',
                ''
            )
            //console.log(e);
        })

    api.getValue('dhis2-godata-interop-configuration', 'godatauserpass')
        .then(response => {
            setGodataUserPass(response.value)
            console.log('godatauser pass ' + JSON.stringify(response.value))
        })
        .catch(e => {
            setGodataUserPass('')
            api.createValue(
                'dhis2-godata-interop-configuration',
                'godatauserpass',
                ''
            )
            //console.log(e);
        })

    api.getValue('dhis2-godata-interop-configuration', 'godatabaseurl')
        .then(response => {
            setGodataUrl(response.value)
            console.log('godatabaseurl ' + JSON.stringify(response.value))
        })
        .catch(e => {
            setGodataUrl('')
            api.createValue(
                'dhis2-godata-interop-configuration',
                'godatabaseurl',
                ''
            )
            //console.log(e);
        })

    const [dhisUser, setDhisUser] = useState()
    const [dhisUserPass, setDhisUserPass] = useState()
    const [loginDetailsDhis, setCredentialsValuesDhis] = useState()

    api.getValue('dhis2-godata-interop-configuration', 'dhisuser')
        .then(response => {
            setDhisUser(response.value)
            console.log('dhisuser ' + JSON.stringify(response.value))
        })
        .catch(e => {
            setDhisUser('')
            api.createValue(
                'dhis2-godata-interop-configuration',
                'dhisuser',
                ''
            )
            console.log(e)
        })

    api.getValue('dhis2-godata-interop-configuration', 'dhisuserpass')
        .then(response => {
            setDhisUserPass(response.value)
            console.log('dhisuser pass ' + JSON.stringify(response.value))
        })
        .catch(e => {
            setDhisUserPass('')
            api.createValue(
                'dhis2-godata-interop-configuration',
                'dhisuserpass',
                ''
            )
            console.log(e)
        })

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
    useEffect(() => {
        setLoading(true)
        messg = StatusAlertService.showInfo(
            i18n.t('Start reading task configurations.')
        )
        setAlertId({
            messg,
        })

        setCredentialsValuesGodata({
            urlTemplate: godataUrl,
            username: godataUser,
            password: godataUserPass,
        })

        console.log('gcreds ' + JSON.stringify(loginDetailsGodata))
        //    const loginDetailsGodata = data && data.constants.constants.length > 0 ? JSON.parse(data.constants.constants[0].description) : {};

        let dhisBaseUrl = config.baseUrl

        setCredentialsValuesDhis({
            urlTemplate: dhisBaseUrl,
            username: dhisUser,
            password: dhisUserPass,
        })

        console.log('dcreds ' + JSON.stringify(loginDetailsDhis))
        //const loginDetailsDhis = progData && progData.constants.constants.length > 0 ? JSON.parse(progData.constants.constants[0].description) : {};

        //    console.log('loginDetailsDhis ' + JSON.stringify(loginDetailsDhis));
        //    console.log('loginDetailsGodata ' + JSON.stringify(loginDetailsGodata));
        setGodataLogin(loginDetailsGodata)
        messg = StatusAlertService.showSuccess(
            i18n.t('Reading task configurations - Success.')
        )
        setAlertId({
            messg,
        })

        if (data) {
            messg = StatusAlertService.showInfo(
                i18n.t(
                    'Loging in to Go.Data Instance.' +
                        loginDetailsGodata.urlTemplate
                )
            )
            setAlertId({
                messg,
            }) //GET GO.DATA LOGIN TOKEN

            async function loginGodata() {
                try {
                    let res = await axios({
                        method: 'POST',
                        data: {
                            email: loginDetailsGodata.username,
                            password: loginDetailsGodata.password,
                        },
                        url:
                            loginDetailsGodata.urlTemplate + '/api/users/login',
                    })

                    if (res.status == 200) {
                        console.log('res.data.id ' + res.data.id) //setToken(res.data.id)//in promise??

                        console.log('token ' + token)
                        messg = StatusAlertService.showSuccess(
                            i18n.t('Loging to Go.Data Instance Success.')
                        )
                        setAlertId({
                            messg,
                        }) //GET TASK DEFINITION

                        const getTask = async id => {
                            var taskObject = await axios.get(
                                loginDetailsDhis.urlTemplate +
                                    '/api/constants/' +
                                    id +
                                    '?paging=false&fields=id,displayName,code,description,shortName,name',
                                {
                                    crossDomain: true,
                                    headers: {
                                        'Access-Control-Allow-Origin': '*',
                                        'Access-Control-Allow-Methods':
                                            'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                                        'Content-Type': 'application/json',
                                        Authorization: createAuthenticationHeader(
                                            loginDetailsDhis.username,
                                            loginDetailsDhis.password
                                        ),
                                    },
                                }
                            )
                            const taskObjectMeta = JSON.parse(
                                taskObject.data.description
                            )
                            console.log(
                                'taskObjectId ' + JSON.stringify(taskObjectMeta)
                            )
                            messg = StatusAlertService.showSuccess(
                                i18n.t('Read Task config - Success.')
                            )
                            setAlertId({
                                messg,
                            }) //GET TASK'S MAPPINGS DEFINITIONS

                            messg = StatusAlertService.showInfo(
                                i18n.t('Reading mappings config.')
                            )
                            setAlertId({
                                messg,
                            })

                            const getMappings = async id => {
                                var mappingObject = await axios.get(
                                    loginDetailsDhis.urlTemplate +
                                        '/api/constants/' +
                                        id +
                                        '?paging=false&fields=id,displayName,code,description,shortName,name',
                                    {
                                        crossDomain: true,
                                        headers: {
                                            'Access-Control-Allow-Origin': '*',
                                            'Access-Control-Allow-Methods':
                                                'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                                            'Content-Type': 'application/json',
                                            Authorization: createAuthenticationHeader(
                                                loginDetailsDhis.username,
                                                loginDetailsDhis.password
                                            ),
                                        },
                                    }
                                )
                                const mappingObjectMeta = JSON.parse(
                                    mappingObject.data.description
                                )
                                //console.log('mappingObjectMeta promise ' + JSON.stringify(mappingObjectMeta));

                                if (mappingObjectMeta) {
                                    setMappings(
                                        JSON.parse(
                                            JSON.stringify(mappingObjectMeta)
                                        )
                                    )
                                    console.log('usemapping ' + mappings)
                                }

                                messg = StatusAlertService.showSuccess(
                                    i18n.t('Read mappings config - Success.')
                                )
                                setAlertId({
                                    messg,
                                }) //setTask(JSON.parse(taskObject.data))//in promise
                                //setMappings(JSON.parse(mappingObject.data)) //in promise
                                // taskConfig 0 - sender API, 1 - receiver API, 2 - sender API filters,
                                // 3 - payload model, 4 - is DHIS2 receiver, 5 - mappingsObjectId, 6 - task type

                                const iterate = obj => {
                                    Object.keys(obj).forEach(key => {
                                        if (key === 'dataValues') {
                                            console.log(
                                                `key: ${key}, value: ${obj[key]}`
                                            )
                                            instanceObject.data.trackedEntityInstances.dataValues.push(
                                                obj[key]
                                            )
                                        }
                                        if (typeof obj[key] === 'object') {
                                            iterate(obj[key])
                                        }
                                    })
                                }

                                console.log(
                                    '0 - sender API ' + taskObjectMeta[0]
                                )
                                setSender(taskObjectMeta[0])
                                console.log(
                                    '1 - receiver API ' + taskObjectMeta[1]
                                )
                                setReceiver(taskObjectMeta[1])
                                console.log(
                                    '2 - sender API filters ' +
                                        taskObjectMeta[2]
                                )
                                setFilter(taskObjectMeta[2])
                                console.log(
                                    '3 - sender API payload model ' +
                                        taskObjectMeta[3]
                                )
                                setPayloadModel(taskObjectMeta[3])
                                console.log(
                                    '4 - is DHIS2 receiver ' + taskObjectMeta[4]
                                )
                                setIsDhis(taskObjectMeta[4])
                                console.log(
                                    '5 - mappings object Id ' +
                                        taskObjectMeta[5]
                                )
                                console.log(
                                    '6 - task type ' + taskObjectMeta[6]
                                )
                                setTaskType(taskObjectMeta[6])
                                console.log(
                                    '7 - jsoncollectionname ' +
                                        taskObjectMeta[7]
                                )
                                setJsonCollectionName(taskObjectMeta[7])
                                //console.log(' - mapping object ' + JSON.stringify(mappingObjectMeta));
                                setMappingModel(
                                    JSON.parse(
                                        JSON.stringify(mappingObjectMeta)
                                    )
                                )
                                setTask(taskObjectMeta[6]) //const mappingJson =

                                //console.log(JSON.stringify('mappingObjectMeta ' + mappingObjectMeta[0])); //if DHIS2 is receiving end

                                if (isDhis) {
                                    messg = StatusAlertService.showInfo(
                                        i18n.t('DHIS2 is receiving endpoint.')
                                    )
                                    setAlertId({
                                        messg,
                                    })
                                    messg = StatusAlertService.showInfo(
                                        i18n.t(
                                            'Login in to Go.Data Instance.'
                                        ) + loginDetailsGodata.urlTemplate
                                    )
                                    setAlertId({
                                        messg,
                                    }) //get Go.Data security token

                                    const loginObject = await axios.post(
                                        loginDetailsGodata.urlTemplate +
                                            '/api/users/login',
                                        {
                                            headers: {
                                                'Access-Control-Allow-Origin':
                                                    '*',
                                                'Access-Control-Allow-Methods':
                                                    'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                                                'Content-Type':
                                                    'application/json',
                                                crossDomain: true,
                                            },
                                            data: {
                                                email:
                                                    loginDetailsGodata.username,
                                                password:
                                                    loginDetailsGodata.password,
                                            },
                                        }
                                    )
                                    messg = StatusAlertService.showSuccess(
                                        i18n.t(
                                            'Login in to Go.Data Instance - Success.'
                                        )
                                    )
                                    setAlertId({
                                        messg,
                                    })
                                    messg = StatusAlertService.showInfo(
                                        i18n.t('Reading sender data.')
                                    )
                                    setAlertId({
                                        messg,
                                    }) //GET GO.DATA INSTANCES AS PER API ENDPOINT

                                    instanceObject = await axios.get(
                                        taskObjectMeta[0] + taskObjectMeta[2],
                                        {
                                            headers: {
                                                'Access-Control-Allow-Origin':
                                                    '*',
                                                'Access-Control-Allow-Methods':
                                                    'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                                                'Content-Type':
                                                    'application/json',
                                                crossDomain: true,
                                                Authorization:
                                                    loginObject.data.id,
                                            },
                                        }
                                    )
                                    messg = StatusAlertService.showSuccess(
                                        i18n.t('Reading sender data - Success.')
                                    )
                                    setAlertId({
                                        messg,
                                    })
                                    console.log(
                                        JSON.stringify(instanceObject.data)
                                    )
                                    var tmp = JSON.parse(
                                        JSON.stringify(instanceObject.data)
                                    )
                                    setSenderData(tmp)
                                    instance = []
                                    instanceObject.data.map(function(
                                        object,
                                        i
                                    ) {
                                        instance.push({
                                            name: object.name,
                                            id: object.id,
                                        }) // console.log('name ' +object.name + ' id ' + object.id +' key ' + i)
                                        // console.log(JSON.stringify('instance ' + instance))

                                        instance = JSON.parse(
                                            JSON.stringify(instance)
                                        ) //MAP AND SHOW MODAL FOR SELECTION

                                        setInst(instance)
                                        setLoading(false)
                                        setOpen(true) // console.log('after modal opened')
                                    }) //if DHIS2 is not receiving end
                                } else {
                                    messg = StatusAlertService.showInfo(
                                        i18n.t('Reading sender data.')
                                    )
                                    setAlertId({
                                        messg,
                                    })

                                    //GET DHIS2 INSTANCES AS PER API ENDPOINT
                                    var currentTaskType = 'Go.Data Contact'
                                    if (
                                        taskObjectMeta[6] ===
                                            'Go.Data Contact' ||
                                        taskObjectMeta[6] === 'Go.Data Case' ||
                                        taskObjectMeta[6] ===
                                            'Go.Data Contact of Contact'
                                    ) {
                                        console.log(
                                            'sender instance ' +
                                                taskObjectMeta[6]
                                        )

                                        var endpoints = taskObjectMeta[0].split(
                                            ' '
                                        )
                                        var filters = taskObjectMeta[2].split(
                                            ' '
                                        )

                                        instanceIds = await axios.get(
                                            endpoints[0] + filters[0],
                                            {
                                                headers: {
                                                    'Access-Control-Allow-Origin':
                                                        '*',
                                                    Authorization: createAuthenticationHeader(
                                                        loginDetailsDhis.username,
                                                        loginDetailsDhis.password
                                                    ),
                                                    'Access-Control-Allow-Methods':
                                                        'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                                                    'Content-Type':
                                                        'application/json',
                                                    crossDomain: true,
                                                },
                                            }
                                        )
                                        console.log(
                                            'ids of contacts ' +
                                                JSON.stringify(instanceIds) +
                                                ' ' +
                                                JSON.stringify(
                                                    instanceIds.data.rows[0][0]
                                                )
                                        )
                                        var fromPromise = []
                                        for (
                                            let x = 0;
                                            x < instanceIds.data.rows.length;
                                            x++
                                        ) {
                                            fromPromise.push(
                                                instanceIds.data.rows[x][0]
                                            )
                                        }
                                        console.log('jinout ' + fromPromise)
                                        instanceObject = {}
                                        instanceObject['data'] = {}
                                        instanceObject.data[
                                            'trackedEntityInstances'
                                        ] = []
                                        instanceObject.data.trackedEntityInstances[
                                            'dataValues'
                                        ] = []
                                        for (
                                            let x = 0;
                                            x < fromPromise.length;
                                            x++
                                        ) {
                                            var inst = await axios.get(
                                                endpoints[1] +
                                                    fromPromise[x] +
                                                    filters[1],
                                                {
                                                    headers: {
                                                        'Access-Control-Allow-Origin':
                                                            '*',
                                                        Authorization: createAuthenticationHeader(
                                                            loginDetailsDhis.username,
                                                            loginDetailsDhis.password
                                                        ),
                                                        'Access-Control-Allow-Methods':
                                                            'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                                                        'Content-Type':
                                                            'application/json',
                                                        crossDomain: true,
                                                    },
                                                }
                                            )

                                            inst.data['id'] =
                                                inst.data.trackedEntityInstance
                                            inst.data['name'] =
                                                'Case ID: ' +
                                                inst.data.trackedEntityInstance
                                            inst.data['dataValues'] = []

                                            instanceObject.data.trackedEntityInstances.push(
                                                inst.data
                                            )
                                            //iterate(instanceObject.data.trackedEntityInstances)
                                        }

                                        console.log(
                                            'contacts ' +
                                                JSON.stringify(instanceObject)
                                        )
                                    } else {
                                        instanceObject = await axios.get(
                                            taskObjectMeta[0] +
                                                taskObjectMeta[2],
                                            {
                                                headers: {
                                                    'Access-Control-Allow-Origin':
                                                        '*',
                                                    Authorization: createAuthenticationHeader(
                                                        loginDetailsDhis.username,
                                                        loginDetailsDhis.password
                                                    ),
                                                    'Access-Control-Allow-Methods':
                                                        'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                                                    'Content-Type':
                                                        'application/json',
                                                    crossDomain: true,
                                                },
                                            }
                                        )
                                    }

                                    messg = StatusAlertService.showSuccess(
                                        i18n.t('Reading sender data - Success.')
                                    )
                                    setAlertId({
                                        messg,
                                    })
                                    console.log(
                                        'instanceObject.data' +
                                            JSON.stringify(instanceObject.data)
                                    )
                                    console.log(
                                        'jsonCollectionName ' +
                                            taskObjectMeta[7]
                                    )
                                    var tmp = JSON.parse(
                                        JSON.stringify(
                                            instanceObject.data[
                                                taskObjectMeta[7]
                                            ]
                                        )
                                    )
                                    setSenderData(tmp)

                                    instanceObject.data[
                                        taskObjectMeta[7]
                                    ].sort((a, b) =>
                                        a.level > b.level
                                            ? 1
                                            : a.level === b.level
                                            ? a.size > b.size
                                                ? 1
                                                : -1
                                            : -1
                                    )

                                    console.log(
                                        'sortedObjs ' +
                                            JSON.stringify(
                                                instanceObject.data[
                                                    taskObjectMeta[7]
                                                ]
                                            )
                                    )

                                    instance = []
                                    parentChild = []
                                    instanceObject.data[taskObjectMeta[7]].map(
                                        function(object, i) {
                                            instance.push({
                                                name: object.name,
                                                id: object.id,
                                            })
                                            //compute lon/lat coordinates
                                            var lon = 0,
                                                lat = 0

                                            if (object.geometry) {
                                                if (
                                                    object.geometry.type ===
                                                        'Polygon' ||
                                                    object.geometry.type ===
                                                        'MultiPolygon'
                                                ) {
                                                    //get centroid
                                                    var centroidPoint = centroid(
                                                        dot.pick(
                                                            'geometry',
                                                            object
                                                        )
                                                    )
                                                    console.log(
                                                        'centroid latitude ' +
                                                            centroidPoint
                                                                .geometry
                                                                .coordinates[0]
                                                    )
                                                    lon =
                                                        centroidPoint.geometry
                                                            .coordinates[0]
                                                    lat =
                                                        centroidPoint.geometry
                                                            .coordinates[1]
                                                } else if (
                                                    (object.geometry.type =
                                                        'Point')
                                                ) {
                                                    var point = dot.pick(
                                                        'geometry.coordinates',
                                                        object
                                                    )
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
                                                        synonyms: [
                                                            object.displayName,
                                                        ],
                                                        identifiers: [
                                                            object.code,
                                                        ],
                                                        active: true,
                                                        populationDensity: 0,
                                                        parentLocationId:
                                                            object?.parent?.id,
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
                                        }
                                    ) //MAP AND SHOW MODAL FOR SELECTION

                                    instance = JSON.parse(
                                        JSON.stringify(instance)
                                    )
                                    if (
                                        taskObjectMeta[6] == 'Go.Data Location'
                                    ) {
                                        parentChild = JSON.parse(
                                            JSON.stringify(parentChild)
                                        ) //get real copy from promise
                                        console.log(
                                            parentChild.length +
                                                ' pc ' +
                                                JSON.stringify(parentChild)
                                        )
                                        //reduce relationships of org units
                                        const idMapping = parentChild.reduce(
                                            (acc, el, i) => {
                                                acc[el.location.id] = i
                                                return acc
                                            },
                                            {}
                                        )
                                        console.log(JSON.stringify(idMapping))
                                        //now link them together so we have one hierarchy
                                        let root
                                        parentChild.forEach(el => {
                                            // Handle the root element
                                            if (
                                                el.location.parentLocationId ===
                                                undefined
                                            ) {
                                                root = el
                                                console.log(
                                                    'root id ' +
                                                        root.location.id
                                                )
                                                return
                                            }
                                            // Use our mapping to locate the parent element in our data array
                                            const parentEl =
                                                parentChild[
                                                    idMapping[
                                                        el.location
                                                            .parentLocationId
                                                    ]
                                                ]
                                            // Add our current el to its parent's `children` array
                                            parentEl.children = [
                                                ...(parentEl.children || []),
                                                el,
                                            ]
                                        })

                                        console.log(
                                            'root ' + JSON.stringify(root)
                                        )
                                        //send org units to the server

                                        const json = JSON.stringify([root])
                                        const file = new File(
                                            [json],
                                            'orgunits.json',
                                            {
                                                type: 'application/json',
                                                lastModified: new Date(),
                                            }
                                        )
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
                            getMappings(taskObjectMeta[5])
                        }
                        getTask(id)
                    }
                } catch (error) {
                    messg = StatusAlertService.showError(
                        i18n.t(
                            'Loging into the Go.Data Instance Failed.' + error
                        )
                    )
                    setAlertId({
                        messg,
                    })
                    console.log(error)
                }
            }
            loginGodata()
        }

        return () => {
            console.log('This will be logged on unmount')
        }
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
            console.log('yofchecked ' + y)
            if (taskType === 'Go.Data Location' && y === 1) {
                return
            }
            getTaskDone(y)
        }
    }

    const getTaskDone = y => {
        setOpen(false)
        console.log('sender ' + sender)
        console.log('receiver ' + receiver)
        console.log('filter ' + filter)
        console.log('payloadModel ' + payloadModel)
        console.log('isDhis ' + isDhis)
        console.log('taskType ' + taskType)

        var model = JSON.parse(JSON.stringify(payloadModel))

        var mappings
        console.log('senderData: ' + JSON.stringify(senderData))
        const senderObject = senderData.find(x => x.id === checkedConstants[y])
        console.log(
            'senderData.find ' +
                JSON.stringify(
                    senderData.find(x => x.id === checkedConstants[y])
                )
        )
        stmp = senderObject
        console.log('stmp here: ' + JSON.stringify(stmp))
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
                            console.log(
                                'payloadItem ' + item.stack + '.' + property
                            )
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
            iterate(payloadModel)
        }

        //SEND PAYLOAD TO RECIEVER
        messg = StatusAlertService.showInfo(i18n.t('Start sending data'))
        setAlertId({
            messg,
        })
        login()
    }

    const getDotNotationByValue = dotnot => {
        //set dotnot to string if its number
        if (typeof dotnot === 'number') {
            dotnot = dotnot.toString()
        }

        //GET MAPPING MODEL
        var dataArray = mappingModel[0].godataValue[1] // console.log('dataArray ' + JSON.stringify(dataArray))

        //console.log('parentChildRelations ' + JSON.stringify(parentChildRelations))

        if (isDhis) {
            //IF DHIS2 IS RCEIVING END
            let tmp = dataArray.find(x => x.godata === dotnot) //console.log(JSON.stringify(tmp))

            if (tmp) {
                //IF MAPPING FOUND AND HAS CONVERSION. THIS MEANS VALUE SHOULD BE FETCHED FROM OTHER
                // PARTY OBJECT AND IF THERE IS CONVERSION OF VALUES TO PROCESS CONVERSION
                if (tmp.props.conversion === 'true') {
                    //console.log('senderData' + senderData)
                    console.log(
                        'selected object ' + JSON.stringify(checkedConstants)
                    )
                    stmp = senderData[0] //TO BE DYNAMIC

                    let val = dot.pick(tmp.dhis2, stmp) //IN CASE OF GO.DATA, PROPERTY IS USED FOR SEARCHING CONVERSION VALUE

                    var stringBoolean = ''

                    if (typeof val == 'boolean') {
                        stringBoolean = val ? 'true' : 'false'
                    } else {
                        stringBoolean = val
                    }

                    console.log(
                        'false ' +
                            JSON.stringify(tmp) +
                            ' props.values.false ' +
                            JSON.stringify(tmp.props.values[stringBoolean])
                    )

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

            let tmp = dataArray.find(x => x.godata === dotnot) //console.log(JSON.stringify(tmp))

            //console.log('selected object ' + JSON.stringify(checkedConstants[0]));

            if (tmp) {
                //IF MAPPING FOUND HAS CONVERSION. THIS MEANS VALUE SHOULD BE FETCHED FROM OTHER
                // PARTY OBJECT AND IF THERE IS CONVERSION OF VALUES TO PROCESS CONVERSION
                console.log('conversion ' + tmp.props.conversion)

                if (
                    tmp.props.conversion === 'true' ||
                    typeof tmp.props.conversion == 'boolean'
                ) {
                    //console.log('senderData' + senderData)
                    let val = dot.pick(tmp.dhis2, stmp)
                    console.log('val ' + val)
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
                        console.log('existying val ' + val)
                        thisId = val
                        setExistingId(val)
                    }
                    //console.log('false/true ' + JSON.stringify(tmp) + ' props.values.false ' + JSON.stringify(tmp.props.values))

                    let keys = Object.keys(tmp.props.values)
                    for (let i = 0; i < keys.length; i++) {
                        console.log(
                            'keys[] ' +
                                tmp.props.values[keys[i]] +
                                ' stbool ' +
                                stringBoolean
                        )
                        if (stringBoolean == tmp.props.values[keys[i]]) {
                            return keys[i]
                        }
                    }
                    //RETURN RAW VALUE IF NOT FOUND IN CONVERSION TABLE
                    return val
                } else if (tmp.props.conversion === 'geo') {
                    //console.log('dotnot geometry ' + JSON.stringify(dot.pick('geometry', stmp)))
                    const geom = dot.pick('geometry', stmp)

                    if (geom) {
                        if ((geom.type = 'Polygon')) {
                            //get centroid
                            var centroidPoint = centroid(
                                dot.pick('geometry', stmp)
                            )
                            console.log(
                                'centroid latitude ' +
                                    centroidPoint.geometry.coordinates[0]
                            )
                            var lon = centroidPoint.geometry.coordinates[0]
                            var lat = centroidPoint.geometry.coordinates[1] //console.log('tmp.godata ' + tmp.godata)
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
                                console.log(point[0])
                                return point[0]
                            } else if (tmp.godata === 'geoLocation.lng') {
                                console.log(point[1])
                                return point[1]
                            }
                        } else {
                            return 0
                        }
                        console.log(JSON.stringify('geom ' + geom.type))
                    }
                    //none of tries are successful, simply return 0
                    return 0
                } else if (tmp.props.conversion === 'delm') {
                    console.log(
                        'processing delm ' + stmp.enrollments[0].events.length
                    )
                    for (
                        var i = 0;
                        i < stmp.enrollments[0].events.length;
                        i++
                    ) {
                        //console.log('processing delm2 ' + stmp.enrollments[0].events[i].dataValues.length)
                        for (
                            var y = 0;
                            y < stmp.enrollments[0].events[i].dataValues.length;
                            y++
                        ) {
                            //console.log('deiy ' + stmp.enrollments[0].events[i].dataValues[y].dataElement)
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
                    console.log('processing attr ' + stmp.attributes.length)
                    for (var i = 0; i < stmp.attributes.length; i++) {
                        if (stmp.attributes[i].attribute == tmp.dhis2) {
                            console.log(
                                'process atrr val ' +
                                    stmp.attributes[i].value +
                                    ' dhis ' +
                                    tmp.dhis2
                            )
                            return stmp.attributes[i].value
                        }
                    }
                } else {
                    //console.log('tmp.dhis2 ' + tmp.dhis2)
                    //nothing could help, simply return what was given
                    return tmp.dhis2
                }
            }
        }
    } //end of getTaskDone()

    async function login() {
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
                    email: godataLogn.username,
                    password: godataLogn.password,
                },
                url: godataLogn.urlTemplate + '/api/users/login',
            })

            if (res.status == 200) {
                console.log('res.data.id ' + res.data.id)
                setToken(JSON.parse(JSON.stringify(res.data.id)))

                if (taskType === 'Go.Data Location') {
                    console.log('Go.Data Location sending' + file)
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
                            console.log('ou resp success ' + response)
                            messg = StatusAlertService.showSuccess(
                                i18n.t(
                                    'Locations send and processed successfully' +
                                        JSON.stringify(response?.data.length)
                                ) + ' Organisation Units processed.',
                                {
                                    autoHideTime: 10000000,
                                }
                            )
                            setAlertId({
                                messg,
                            })
                        })
                        .catch(function(response) {
                            //handle error
                            console.log('ou resp failed ' + response)
                            messg = StatusAlertService.showError(
                                i18n.t(
                                    'Locations sending failed: ' +
                                        JSON.stringify(error?.response?.data)
                                ),
                                {
                                    autoHideTime: 10000000,
                                }
                            )
                            setAlertId({
                                messg,
                            })
                        })
                } else {
                    console.log('payloadModel ' + JSON.stringify(payloadModel))
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
                        console.log('res.data ' + JSON.stringify(ans.data))

                        messg = StatusAlertService.showSuccess(
                            i18n.t(
                                'Data send successfully. ' +
                                    JSON.stringify(ans.data)
                            ),
                            {
                                autoHideTime: 10000000,
                            }
                        )
                        setAlertId({
                            messg,
                        })
                    }
                }
            }
        } catch (error) {
            console.log('outer error: ' + JSON.stringify(error))
            //console.log('error message ' + JSON.stringify(error.response.data));
            //console.log(error.response.status);
            messg = StatusAlertService.showError(
                i18n.t(
                    'Data sending failed: ' +
                        JSON.stringify(error?.response?.data)
                ),
                {
                    autoHideTime: 10000000,
                }
            )
            setAlertId({
                messg,
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
