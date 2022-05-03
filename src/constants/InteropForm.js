import {
    CheckboxField,
    SingleSelectField,
    SingleSelect,
    SingleSelectOption,
    Button,
    ButtonStrip,
    ReactFinalForm,
    SingleSelectFieldFF,
    CenteredContent,
    CircularLoader,
    composeValidators,
    hasValue,
    string,
    InputField,
    TextArea,
    Label,
} from '@dhis2/ui'
import { useHistory } from 'react-router-dom'
import React, { useEffect, useState, useCallback, useParams } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { INTEROP_LIST_PATH } from '../views'
import {
    GODATA_OUTBREAK,
    GODATA_CASE,
    GODATA_CONTACT,
    GODATA_CONTACT_OF_CONTACT,
    GODATA_ORG_UNIT,
} from '../constants'

const { Field } = ReactFinalForm

import { JsonEditor as Editor } from 'jsoneditor-react'
import 'jsoneditor-react/es/editor.min.css'
import 'react-responsive-modal/styles.css'

import { FormRow } from '../forms'
import { PageSubHeadline } from '../headline'
import { dataTest } from '../dataTest'
import i18n from '../locales'
import * as dataStore from '../utils/dataStore.js'

const { Form } = ReactFinalForm

export const InteropForm = ({
    onCancelClick,
    onSubmit,
    initialValues,
    taskId,
}) => {
    const history = useHistory()

    const [nameInput, setNameInput] = useState('')
    const [senderEndpointInput, setSenderEndpointInput] = useState('')
    const [receiverEndpointInput, setReceiverEndpointInput] = useState('')
    const [senderParamsInput, setSenderParamsInput] = useState('')
    const [payloadInput, setPayloadInput] = useState(undefined)
    const [dhisReceiver, setDhisReceiver] = useState(false)
    const [description, setDescription] = useState('')

    const [converters, setConverters] = useState([])
    const [converter, setConverter] = useState(0)

    const [taskType, setTaskType] = useState('')

    const [jsonCollectionName, setJsonCollectionName] = useState('')

    const processAll = useCallback(async () => {
        // console.log('programInstance ' + JSON.stringify(programInstance))

        const mappings = await dataStore.getValue('mappings')

        setConverters(
            mappings.map((m, i) => ({
                label: m.displayName,
                value: i,
            }))
        )

        if (initialValues && initialValues.name != 'undefined') {
            setNameInput(initialValues.displayName)
            setSenderEndpointInput(initialValues.task[0])
            setReceiverEndpointInput(initialValues.task[1])
            setSenderParamsInput(initialValues.task[2])
            setPayloadInput(initialValues.task[3])
            setDhisReceiver(initialValues.task[4])
            setConverter(initialValues.task[5])
            setTaskType(initialValues.task[6])
            setJsonCollectionName(initialValues.task[7])
            setDescription(initialValues.task[8])
        }
    })

    useEffect(() => {
        processAll()
    }, [])

    if (!!initialValues && !payloadInput) {
        return (
            <>
                <CenteredContent>
                    <CircularLoader />
                </CenteredContent>
            </>
        )
    }

    const submitText = initialValues.name
        ? i18n.t('Save task')
        : i18n.t('Add task')

    const onNameInput = ev => {
        setNameInput(ev)
    }

    const onSenderEndpointInput = ev => {
        setSenderEndpointInput(ev)
    }
    const onReceiverEndpointInput = ev => {
        setReceiverEndpointInput(ev)
    }
    const onPayloadInput = ev => {
        setPayloadInput(ev)
    }
    const onSenderParamsInput = ev => {
        setSenderParamsInput(ev)
    }
    const onReceiverInput = ev => {
        setDhisReceiver(ev.value == true ? false : true)
    }
    const onConvertorInput = ev => {
        setConverter(converters.map(c => c.label).indexOf(ev))
    }
    const onTaskTypeInput = ev => {
        setTaskType(ev)
    }
    const onJsonCollectionNameInput = ev => {
        setJsonCollectionName(ev)
    }

    const saveConstant = async () => {
        const allValues = []
        allValues.push(senderEndpointInput)
        allValues.push(receiverEndpointInput)
        allValues.push(senderParamsInput)
        allValues.push(payloadInput)
        allValues.push(dhisReceiver)
        allValues.push(converter)
        allValues.push(taskType)
        allValues.push(jsonCollectionName)
        allValues.push(description)
        console.log('===============================')
        console.log({
            displayName: nameInput,
            task: allValues,
        })
        if (!!initialValues.displayName)
            await dataStore.editById('tasks', taskId, {
                displayName: nameInput,
                task: allValues,
            })
        else
            await dataStore.appendValue('tasks', {
                displayName: nameInput,
                task: allValues,
            })
        history.push(INTEROP_LIST_PATH)
    }

    return (
        <Form
            keepDirtyOnReinitialize
            onSubmit={onSubmit}
            initialValues={initialValues}
        >
            {({ handleSubmit, pristine }) => (
                <form
                    onSubmit={handleSubmit}
                    data-test={dataTest('gateways-gatewaygenericform')}
                >
                    <PageSubHeadline>{i18n.t('Task setup')}</PageSubHeadline>

                    <FormRow>
                        <SingleSelectField
                            label={i18n.t('Type')}
                            onChange={({ selected }) =>
                                onTaskTypeInput(selected)
                            }
                            selected={taskType}
                            dataTest={dataTest(
                                'views-gatewayconfigformnew-gatewaytype'
                            )}
                        >
                            <SingleSelectOption
                                value={GODATA_OUTBREAK}
                                label={i18n.t(GODATA_OUTBREAK)}
                            />

                            <SingleSelectOption
                                value={GODATA_CASE}
                                label={i18n.t(GODATA_CASE)}
                            />

                            <SingleSelectOption
                                value={GODATA_CONTACT}
                                label={i18n.t(GODATA_CONTACT)}
                            />

                            <SingleSelectOption
                                value={GODATA_CONTACT_OF_CONTACT}
                                label={i18n.t(GODATA_CONTACT_OF_CONTACT)}
                            />

                            <SingleSelectOption
                                value={GODATA_ORG_UNIT}
                                label={i18n.t(GODATA_ORG_UNIT)}
                            />
                        </SingleSelectField>
                    </FormRow>

                    <FormRow>
                        <Field
                            name="name"
                            render={() => (
                                <InputField
                                    id="name"
                                    label={i18n.t('Name')}
                                    className=""
                                    type="text"
                                    helpText="Meaningful name of Task"
                                    value={nameInput}
                                    onChange={ev => onNameInput(ev.value)}
                                    required
                                    validate={composeValidators(
                                        string,
                                        hasValue
                                    )}
                                />
                            )}
                        />
                    </FormRow>
                    <FormRow>
                        <Label>Description</Label>

                        <Field
                            name="description"
                            render={() => (
                                <TextArea
                                    id="description"
                                    label="Description"
                                    type="text"
                                    value={description}
                                    onChange={ev => setDescription(ev.value)}
                                    required
                                    validate={composeValidators(
                                        string,
                                        hasValue
                                    )}
                                />
                            )}
                        />
                    </FormRow>

                    <FormRow>
                        <Field
                            name="senderendpoint"
                            render={() => (
                                <InputField
                                    id="senderendpoint"
                                    label={"DHIS2 endpoint pathname"}
                                    className=""
                                    type="text"
                                    helpText="Pathname of the URL of sender API endpoint (e.g. if https://somesite.org/api/somevalues -> /api/somevalues)"
                                    value={senderEndpointInput}
                                    onChange={ev =>
                                        onSenderEndpointInput(ev.value)
                                    }
                                    required
                                    validate={composeValidators(
                                        string,
                                        hasValue
                                    )}
                                />
                            )}
                        />
                    </FormRow>

                    <FormRow>
                        <Field
                            name="jsonobject"
                            render={() => (
                                <InputField
                                    id="senderendpointcolname"
                                    label={i18n.t(
                                        'Sender json object"s collection name'
                                    )}
                                    className=""
                                    type="text"
                                    helpText="Name json objects collection, e.g. organisationUnits, programs, etc."
                                    value={jsonCollectionName}
                                    onChange={ev =>
                                        onJsonCollectionNameInput(ev.value)
                                    }
                                    required
                                    validate={composeValidators(
                                        string,
                                        hasValue
                                    )}
                                />
                            )}
                        />
                    </FormRow>

                    <FormRow>
                        <Field
                            name="receiverendpoint"
                            render={() => (
                                <InputField
                                    id="receiverendpoint"
                                    label={i18n.t('Receiver API endpoint')}
                                    className=""
                                    type="text"
                                    helpText="Fully qualified URL of receiver API endpoint (e.g. https://somesite.org/api/somevalues)"
                                    value={receiverEndpointInput}
                                    onChange={ev =>
                                        onReceiverEndpointInput(ev.value)
                                    }
                                    validate={composeValidators(
                                        string,
                                        hasValue
                                    )}
                                    required
                                />
                            )}
                        />
                    </FormRow>

                    {converter !== '' &&
                    converter !== null &&
                    converter !== undefined &&
                    !!converters &&
                    converters.length !== 0 ? (
                        <FormRow>
                            <SingleSelectField
                                label={i18n.t('Converter')}
                                onChange={({ selected }) =>
                                    onConvertorInput(selected)
                                }
                                selected={converters[converter].label}
                            >
                                {converters.map(function(object, i) {
                                    return (
                                        <SingleSelectOption
                                            label={object.label}
                                            value={object.label}
                                            key={i}
                                        />
                                    )
                                })}
                            </SingleSelectField>
                        </FormRow>
                    ) : (
                        <></>
                    )}
                    <FormRow>
                        <Editor
                            mode="text"
                            value={!!payloadInput ? payloadInput : {}}
                            onChange={ev => onPayloadInput(ev)}
                        />
                    </FormRow>

                    <FormRow>
                        <Field
                            name="senderparams"
                            render={() => (
                                <InputField
                                    id="senderparams"
                                    label={i18n.t('Sender API parameters')}
                                    className=""
                                    type="text"
                                    helpText="E.g ?fields=id,name,description,[organisationunits]&paging=false&filters=name.eq.blabla. DHIS2 API example"
                                    value={senderParamsInput}
                                    onChange={ev =>
                                        onSenderParamsInput(ev.value)
                                    }
                                />
                            )}
                        />
                    </FormRow>

                    {/* <FormRow>
                        <Field
                            name="dhisReceiver"
                            label={i18n.t('DHIS2 Receiving End')}
                            helpText={i18n.t(
                                'If selected DHIS2 will receive data from Go.Data'
                            )}
                            render={() => (
                                <CheckboxField
                                    id="senderparams"
                                    label={i18n.t('DHIS2 is Receiving End')}
                                    className=""
                                    type="checkbox"
                                    helpText={i18n.t(
                                        'If selected, DHIS2 will receive data from Go.Data'
                                    )}
                                    value={dhisReceiver.toString()}
                                    checked={dhisReceiver}
                                    onChange={ev => onReceiverInput(ev)}
                                />
                            )}
                        />
                    </FormRow> */}

                    <ButtonStrip>
                        <Button primary onClick={() => saveConstant()}>
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

InteropForm.defaultProps = {
    initialValues: {
        parameters: [],
    },
}

InteropForm.propTypes = {
    onCancelClick: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
}
