import {
    Button,
    ButtonStrip,
    ReactFinalForm,
    TextArea,
    CenteredContent,
    CircularLoader,
    composeValidators,
    hasValue,
    string,
    InputField,
    TextAreaField,
} from '@dhis2/ui'
import { useHistory } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import {
    useReadMappingConfigConstantsQueryForConfig,
    useReadProgramsQueryForMappings,
} from '.'
import { METADATA_CONFIG_LIST_PATH } from '../views'

const { Field } = ReactFinalForm

import api from '../utils/api'

import axios from 'axios'

import 'jsoneditor-react/es/editor.min.css'
import ReactJson from 'react-json-view'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import dot from 'dot-object'

import {
    useCreateCasesConstantMutation,
    useUpdateCasesConstantMutation,
} from '../constants'
import { FormRow } from '../forms'
import { PageSubHeadline } from '../headline'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Form } = ReactFinalForm

var mappings, dhismappings

function iterate(obj) {
    var walked = []
    var stack = [{ obj: obj, stack: '' }]
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
                    mappings.push({
                        godata: (item.stack + '.' + property).substr(1),
                        dhis2: '',
                        props: {
                            conversion: 'true',
                            values: {},
                        },
                    })
                }
            }
            //  console.log('mappings length ' + mappings.length)
        }
    }
}

function iterate2(obj) {
    var walked = []
    var stack = [{ obj: obj, stack: '' }]
    dhismappings = []
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
                    dhismappings.push({
                        dhis2: (item.stack + '.' + property).substr(1),
                    })
                    //mappings.set(item.stack + '.' + property , 'to be other stuff');
                    //console.log(item.stack + '.' + property /*+ "=" + obj[property]*/);
                }
            }
        }
    }
    console.log('dhis2 mappings length ' + dhismappings.length)
}

export const CasesForm = ({
    onCancelClick,
    onSubmit,
    initialValues,
    converterType,
}) => {
    const history = useHistory()
    const [open, setOpen] = useState(false)
    const [valueHolder, setValueHolder] = useState({})
    const [dhisValue, setDhisValue] = useState({})
    const [godataValue, setGodataValue] = useState([])

    const [nameInput, setNameInput] = useState('')
    const [dhisModelInput, setDhisModelInput] = useState('')
    const [godataModelInput, setGodataModelInput] = useState('')

    var instanceObject

    const [godataUser, setGodataUser] = useState()
    const [godataUserPass, setGodataUserPass] = useState()
    const [godataUrl, setGodataUrl] = useState()
    const [loginDetails, setCredentialsValues] = useState()

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

    const {
        lloading,
        data: progData,
        lerror,
    } = useReadProgramsQueryForMappings()

    const {
        loading,
        data,
        error,
    } = useReadMappingConfigConstantsQueryForConfig()

    const [addCasesConstant] = useCreateCasesConstantMutation()
    const [saveCasesConstant] = useUpdateCasesConstantMutation()

    useEffect(() => {
        setCredentialsValues({
            urlTemplate: godataUrl,
            username: godataUser,
            password: godataUserPass,
        })

        const programInstance =
            progData && progData.programs.programs.length > 0
                ? progData.programs.programs[0]
                : {}

        if (data) {
            async function login() {
                if (!!loginDetails.urlTemplate) {
                    try {
                        let res = await axios({
                            method: 'POST',
                            data: {
                                email: loginDetails.username,
                                password: loginDetails.password,
                            },
                            url: loginDetails.urlTemplate + '/api/users/login',
                        })
                        if (res.status == 200) {
                            console.log('res.data.id ' + res.data.id)

                            const getInstanceData = async () => {
                                var outbreakObject = await axios.get(
                                    loginDetails.urlTemplate + '/api/outbreaks',
                                    {
                                        headers: {
                                            Authorization: res.data.id,
                                        },
                                    }
                                )

                                const outBreakId = outbreakObject.data[0].id

                                const loginObject = await axios.post(
                                    loginDetails.urlTemplate +
                                        '/api/users/login',
                                    {
                                        email: loginDetails.username,
                                        password: loginDetails.password,
                                    }
                                )

                                instanceObject = await axios.get(
                                    loginDetails.urlTemplate +
                                        '/api/outbreaks/' +
                                        outBreakId +
                                        '/cases',
                                    {
                                        headers: {
                                            Authorization: loginObject.data.id,
                                        },
                                    }
                                )

                                console.log(initialValues)

                                iterate(instanceObject.data[0])
                                const caseMeta = []
                                caseMeta.push([
                                    { conversionType: 'Go.Data Case' },
                                ])
                                caseMeta.push(mappings)
                                setGodataValue(caseMeta)

                                iterate2(programInstance)
                                setDhisValue(dhismappings)

                                if (!!initialValues.displayName) {
                                    setGodataValue(
                                        JSON.parse(initialValues.description)[0]
                                            .godataValue
                                    )
                                    setNameInput(initialValues.displayName)
                                    setGodataModelInput(
                                        JSON.stringify(
                                            JSON.parse(
                                                initialValues.description
                                            )[1]
                                        )
                                    )
                                    setDhisModelInput(
                                        JSON.stringify(
                                            JSON.parse(
                                                initialValues.description
                                            )[2]
                                        )
                                    )
                                }
                            }
                            getInstanceData()

                            console.log('converterType ' + converterType)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
            login()
            console.log('cases: ' + JSON.stringify(instanceObject))
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

    const submitText = initialValues.displayName
        ? i18n.t('Save mappings')
        : i18n.t('Add mappings')

    const editNode = instance => {
        console.log(
            JSON.stringify(
                'inst ns ' + instance.namespace + ' name ' + instance.name
            )
        )
        setGodataValue(godataValue => {
            const Outbreak = [...godataValue]
            var tmp = Outbreak[1][instance.namespace[1]]
            console.log('tmp' + JSON.stringify(tmp))
            var path = ''
            instance.namespace.shift()
            instance.namespace.shift()
            instance.namespace.forEach(element => (path = path + element + '.'))
            path = path + instance.name
            //for(var p in instance.namespace){path+p+'.'}
            console.log('path' + path)
            dot.str(path, instance.new_value, tmp)

            //tmp.dhis2 = instance.new_value
            return Outbreak
        })

        return true
    }

    const copyFromPopup = instance => {
        if (instance.name == 'dhis2') {
            console.log(instance.src)
            //read and replace dhis2 placeholder and update ui
            var ths = dot.str(
                'dhis2',
                instance.src,
                godataValue[1][valueHolder[2]]
            )
            console.log('str ths: ' + JSON.stringify(ths))
            setGodataValue(godataValue => {
                const Outbreak = [...godataValue]
                Outbreak[1][valueHolder[2]] = ths
                return Outbreak
            })
            setOpen(false)
        } else {
            console.log('Wrong element selected')
        }

        return true
    }

    const selectedNode = instance => {
        //store initial values into useStore, we need this to replace placeholder next
        setValueHolder(instance.namespace),
            instance.name == 'dhis2'
                ? setOpen(true)
                : console.log('wrong element selected'),
            console.log(
                'select Node with popup:  ' + JSON.stringify(instance.namespace)
            )
        return true
    }

    const onCloseModal = () => {
        setOpen(false)
    }
    const addNode = () => {
        console.log('addjsoneditor')
    }

    const deleteNode = instance => {
        console.log('deletejsoneditor ' + JSON.stringify(instance.namespace))
        const wanted = godataValue[1][instance.namespace[1]]
        console.log('wanted ' + JSON.stringify(wanted))
        const newgodata = godataValue[1].filter(item => item !== wanted)
        let Outbreak = [...godataValue]
        Outbreak[1] = newgodata
        setGodataValue(Outbreak)

        return true
    }

    const onNameInput = ev => {
        console.log({ev})
        setNameInput(ev)
    }
    const onDhisModelInput = ev => {
        setDhisModelInput(ev)
    }
    const onGodataModelInput = ev => {
        setGodataModelInput(ev)
    }

    //console.log(nameInput)
    const saveConstant = async godataValue => {
        const godataModelJson =
            Object.keys(godataModelInput).length != 0
                ? JSON.parse(godataModelInput)
                : {}

        const dhisModelJson =
            Object.keys(dhisModelInput).length != 0
                ? JSON.parse(dhisModelInput)
                : {}
        const allValues = []
        allValues.push(godataValue)
        console.log('allValues godataValue ' + JSON.stringify(allValues))
        allValues.push(godataModelJson)
        console.log('allValues godataModelJson ' + JSON.stringify(allValues))
        allValues.push(dhisModelJson)
        console.log('allValues dhisModelJson ' + JSON.stringify(allValues))

        if (initialValues.displayName) {
            var id = initialValues.id
            await saveCasesConstant({ allValues, nameInput, id })
            await api
                .createValue(
                    'dhis2-godata-interop-configuration',
                    id,
                    JSON.stringify(allValues)
                )
                .then(response => {
                    console.log('dhisuser ' + JSON.stringify(response.value))
                })
                .catch(e => {
                    api.updateValue(
                        'dhis2-godata-interop-configuration',
                        id,
                        JSON.stringify(allValues)
                    )
                })
        } else {
            await addCasesConstant({ allValues, nameInput })
            await api
                .createValue(
                    'dhis2-godata-interop-configuration',
                    id,
                    JSON.stringify(allValues)
                )
                .then(response => {
                    console.log('dhisuser ' + JSON.stringify(response.value))
                })
                .catch(e => {
                    api.updateValue(
                        'dhis2-godata-interop-configuration',
                        id,
                        JSON.stringify(allValues)
                    )
                })
        }

        history.push(METADATA_CONFIG_LIST_PATH)
    }

    return (
        <Form
            keepDirtyOnReinitialize
            onSubmit={onSubmit}
            initialValues={initialValues}
        >
            {({ handleSubmit, values, submitting, pristine }) => (
                <form
                    onSubmit={handleSubmit}
                    data-test={dataTest('gateways-gatewaygenericform')}
                >
                    <PageSubHeadline>
                        {i18n.t('Case mappings setup')}
                    </PageSubHeadline>

                    <FormRow>
                        <Field
                            required
                            name="name"
                            //value=''
                            //component={InputFieldFF}
                            render={() => (
                                <InputField
                                    id="name"
                                    label={i18n.t('Name')}
                                    className=""
                                    type="text"
                                    value={nameInput}
                                    //component={InputField}
                                    onChange={ev => onNameInput(ev)}
                                    validate={composeValidators(
                                        string,
                                        hasValue
                                    )}
                                    required
                                />
                            )}
                            validate={composeValidators(string, hasValue)}
                        />
                    </FormRow>

                    <FormRow>
                        <div>
                            <ReactJson
                                src={godataValue}
                                onAdd={addNode}
                                onEdit={editNode}
                                onDelete={deleteNode}
                                enableClipboard={selectedNode}
                                theme="apathy:inverted"
                                name={'Case'}
                                displayArrayKey={true}
                            />
                        </div>
                    </FormRow>

                    <Modal open={open} onClose={onCloseModal} center>
                        <h2>Select DHIS2 metadata</h2>
                        <div>
                            <ReactJson
                                src={dhisValue}
                                enableClipboard={copyFromPopup}
                                theme="apathy:inverted"
                                name={'Program'}
                                displayArrayKey={true}
                            />
                        </div>
                    </Modal>
                    <ButtonStrip>
                        <Button
                            primary
                            onClick={() => saveConstant({ godataValue })}
                        >
                            {submitText}
                        </Button>
                        <Button onClick={() => onCancelClick(pristine)}>
                            {i18n.t('Cancel')}
                        </Button>
                    </ButtonStrip>
                </form>
            )}
        </Form>
    )
}

CasesForm.defaultProps = {
    initialValues: {
        parameters: [],
    },
    converterType: '',
}

CasesForm.propTypes = {
    onCancelClick: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    converterType: PropTypes.string,
}
