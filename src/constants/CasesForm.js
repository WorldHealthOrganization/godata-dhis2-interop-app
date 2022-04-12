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
import React, { useEffect, useState, useCallback } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { METADATA_CONFIG_LIST_PATH } from '../views'
import * as dataStore from '../utils/dataStore.js'
import * as userDataStore from '../utils/userDataStore.js'


const { Field } = ReactFinalForm

import { getCredentialsFromUserDataStore } from '../utils/get'

import axios from 'axios'

import 'jsoneditor-react/es/editor.min.css'
import ReactJson from 'react-json-view'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import dot from 'dot-object'

import { FormRow } from '../forms'
import { PageSubHeadline } from '../headline'
import { dataTest } from '../dataTest'
import i18n from '../locales'
import { useReadProgramsQueryForMappings } from '.'
const { Form } = ReactFinalForm

export const CasesForm = ({
    onCancelClick,
    onSubmit,
    initialValues,
    converterType,
}) => {
    const iterate = obj => {
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

    const iterate2 = obj => {
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
    const history = useHistory()
    const [open, setOpen] = useState(false)
    const [valueHolder, setValueHolder] = useState({})
    const [dhisValue, setDhisValue] = useState({})
    const [godataValue, setGodataValue] = useState([])

    const [nameInput, setNameInput] = useState(initialValues.displayName)

    var mappings, dhismappings
    const [loading, setLoading] = useState(true)

    const {
        lloading,
        data: progData,
        lerror,
    } = useReadProgramsQueryForMappings()

    const processAll = useCallback(async () => {
        const credentials = await getCredentialsFromUserDataStore().catch(
            console.error
        )
        const loginDetails = {
            urlTemplate: credentials.godata.url,
            username: credentials.godata.username,
            password: credentials.godata.password,
        }

        const programInstance =
            progData && progData.programs.programs.length > 0
                ? progData.programs.programs[0]
                : {}
        const outbreakObject = await axios({
            method: 'POST',
            data: {
                email: loginDetails.username,
                password: loginDetails.password,
            },
            url: `${loginDetails.urlTemplate}/api/users/login`,
        })
            .then(res => {
                console.log(res.data.id)
                return axios.get(`${loginDetails.urlTemplate}/api/outbreaks`, {
                    headers: {
                        Authorization: res.data.id,
                    },
                })
            })
            .catch(console.error)

        if (!!outbreakObject) {
            const outBreakId = outbreakObject.data[0].id
            const instanceObject = await axios
                .post(loginDetails.urlTemplate + '/api/users/login', {
                    email: loginDetails.username,
                    password: loginDetails.password,
                })
                .then(res =>
                    axios.get(
                        loginDetails.urlTemplate +
                            '/api/outbreaks/' +
                            outBreakId +
                            '/cases',
                        {
                            headers: {
                                Authorization: res.data.id,
                            },
                        }
                    )
                ).catch(console.error)
            if (!!instanceObject) {
                iterate(instanceObject.data[0])
                const caseMeta = []
                caseMeta.push([{ conversionType: 'Go.Data Case' }])
                caseMeta.push(mappings)
                setGodataValue(caseMeta)

                iterate2(programInstance)
                setDhisValue(dhismappings)

                if (!!initialValues.displayName) {
                    console.log({ initialValues })
                    setGodataValue(initialValues.mapping[0].godataValue)
                    setNameInput(initialValues.displayName)
                    setGodataModelInput(initialValues[1])
                    setDhisModelInput(initialValues[2])
                }
                setLoading(false)
            }
        }
    })

    useEffect(() => {
        processAll()
    }, [progData])

    if (loading)
        return (
            <>
                <CenteredContent>
                    <CircularLoader />
                </CenteredContent>
            </>
        )

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
            //read and replace dhuis2 placeholder and update ui
            var ths = dot.str(
                'dhis2',
                instance.src,
                godataValue[1][valueHolder[2]]
            )
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
        setNameInput(ev)
    }

    //console.log(nameInput)
    const saveConstant = async godataValue => {
        const allValues = []
        allValues.push(godataValue)
        if (initialValues.displayName) {
            var id = initialValues.id
            await dataStore.editById('mappings', id, {
                displayName: nameInput,
                mapping: allValues,
            })
        } else {
            await dataStore.appendValue('mappings', {
                displayName: nameInput,
                mapping: allValues,
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
                        {i18n.t('Outbreaks mappings setup')}
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
                                    onChange={ev => onNameInput(ev.value)}
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
