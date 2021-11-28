import { CheckboxField, SingleSelectField, SingleSelect, SingleSelectOption, Button, ButtonStrip, 
    ReactFinalForm,  SingleSelectFieldFF, CenteredContent, CircularLoader, composeValidators, hasValue,
    string, InputField } from '@dhis2/ui'
import { useHistory } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import {useReadMappingConfigConstantsQueryForConfig, useReadProgramsQueryForMappings} from '.'
import { INTEROP_LIST_PATH } from '../views'
import { GODATA_OUTBREAK, GODATA_CASE, GODATA_CONTACT, GODATA_CONTACT_OF_CONTACT, 
    GODATA_ORG_UNIT } from '../constants'

const { Field } = ReactFinalForm

import axios from 'axios'

import { JsonEditor as Editor } from 'jsoneditor-react'
import 'jsoneditor-react/es/editor.min.css'
import 'react-responsive-modal/styles.css';

import {
    useReadMappingConfigConstantsQueryForMappings,
    useCreateTaskConstantMutation,
    useUpdateTaskConstantMutation,
} from '.'
import { FormRow } from '../forms'
import { PageSubHeadline } from '../headline'
import { dataTest } from '../dataTest'
import i18n from '../locales'
import { eachItem } from 'ajv/dist/compile/util'

const { Form } = ReactFinalForm

export const InteropForm = ({
    onCancelClick,
    onSubmit,
    initialValues,
}) => {
    const history = useHistory()

    const [nameInput, setNameInput] = useState('')
    const [senderEndpointInput, setSenderEndpointInput] = useState('')
    const [receiverEndpointInput, setReceiverEndpointInput] = useState('')
    const [senderParamsInput, setSenderParamsInput] = useState('')
    const [payloadInput, setPayloadInput] = useState({})
    const [dhisReceiver, setDhisReceiver] = useState(false)

    const [converters, setConverters] = useState([])
    const [converter, setConverter] = useState('')

    const [taskType, setTaskType] = useState('')

    var instanceObject

    const { loading: loadingReadConstants, data: convt,  error: errorReadConstants } = useReadMappingConfigConstantsQueryForMappings()

    const { loading : loadingData, data: progData, error: loadError } = useReadProgramsQueryForMappings()
 
    const { loading : laodingConf, data: data, error: confError  } = useReadMappingConfigConstantsQueryForConfig()

    const loading  = loadingReadConstants || loadingData || laodingConf
    const error  = errorReadConstants || loadError || confError

    const [ addTaskConstant ] = useCreateTaskConstantMutation()
    const [ saveTaskConstant ] = useUpdateTaskConstantMutation()




    useEffect(() => {
 
            
        const loginDetails = 
        data && data.constants.constants.length >0
        ? JSON.parse(data.constants.constants[0].description)
                : {}

                const programInstance = 
                progData && progData.programs.programs.length >0
                ? progData.programs.programs[0]
                        : {}
                       // console.log('programInstance ' + JSON.stringify(programInstance))
                        
                        const convts = 
                        convt && convt.constants.constants.length >0
                        ? convt.constants.constants
                                : []
                                //console.log('constants.constants ' + JSON.stringify(convts))   

                                
                                setConverters( 
                                    convts.map(({ id, displayName }) => ({
                                    label: displayName,
                                    value: id,
                                }))           
                                )
                                //console.log('converters '+JSON.stringify(converters))
                                if(initialValues && initialValues.name != 'undefined'){
                                    console.log('initialValues called ' + initialValues.name)
                                    setNameInput(initialValues.name)
                            
                                    const paramsJson = JSON.parse(initialValues.description)
                            
                                    setSenderEndpointInput(paramsJson[0])
                                    setReceiverEndpointInput(paramsJson[1])
                                    setSenderParamsInput(paramsJson[2])
                                    setPayloadInput(paramsJson[3])
                                    setDhisReceiver(paramsJson[4])
                                    setConverter(paramsJson[5])
                                    setTaskType(paramsJson[6])
                                    
                                }

        if(data) {
            async function login() {
                try {
                  let res = await axios({
                    method: 'POST',
                    data: {
                        email: loginDetails.username,
                        password: loginDetails.password,
                    },
                    url: loginDetails.urlTemplate+"/api/users/login",
              
                  });
                  if (res.status == 200) {
                    console.log('res.data.id ' + res.data.id);

                    const getInstanceData = async () => {
                        instanceObject = await axios.get(
                            loginDetails.urlTemplate +'/api/outbreaks', {
                                headers : {
                                    Authorization: res.data.id,
                                  }
                                });
                                console.log('initval name ' + initialValues.name)
                      };
                      getInstanceData()
                  };
                }
                catch (error) {
                    console.log(error);
                };
              }
              login()
              console.log('outbreaks: ' + JSON.stringify(instanceObject))
            }

        return () => {
            
            console.log("This will be logged on unmount");
          }
      }, [ data, progData, convt ])

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


    const submitText = initialValues.name
    ? i18n.t('Save task')
    : i18n.t('Add task')

    const onNameInput = (ev) => { setNameInput(ev)}
    const onSenderEndpointInput = (ev) => { setSenderEndpointInput(ev)}
    const onReceiverEndpointInput = (ev) => { setReceiverEndpointInput(ev)}
    const onPayloadInput = (ev) => { setPayloadInput(ev)}
    const onSenderParamsInput = (ev) => { setSenderParamsInput(ev)}
    const onReceiverInput = (ev) => { setDhisReceiver( ev.value==true ? false : true)}
    const onConvertorInput = (ev) => { setConverter(ev)}
    const onTaskTypeInput = (ev) => { setTaskType(ev)}

    const saveConstant = async () => {

        const allValues = []
        allValues.push(senderEndpointInput)
        allValues.push(receiverEndpointInput)
        allValues.push(senderParamsInput)
        allValues.push(payloadInput)
        allValues.push(dhisReceiver) 
        allValues.push(converter)
        allValues.push(taskType)
        console.log('allValues dhisModelJson ' + JSON.stringify(allValues))

        if(initialValues.name){
            var id = initialValues.id
            await saveTaskConstant({ allValues, nameInput, id })
        }else{
            await addTaskConstant({ allValues, nameInput })
        }
        
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
                    onChange={({ selected }) => onTaskTypeInput(selected)}
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
                        name='name'
                        render={() =>
                        <InputField
                        id="name" 
                        label={i18n.t('Name')}
                        className="" 
                        type="text"
                        helpText='Meaningful name of Task'
                        value={nameInput}
                        onChange={ev => onNameInput(ev.value)}
                        required
                        validate={composeValidators(string, hasValue)}
                        />}
                        />
                    </FormRow>

                    <FormRow>
                        <Field
                        name='senderendpoint'
                        render={() =>
                        <InputField
                        id="senderendpoint" 
                        label={i18n.t('Sender API endpoint')}
                        className="" 
                        type="text" 
                        helpText='Fully qualified URL of sender API endpoint (e.g. https://somesite.org/api/somevalues)'
                        value={senderEndpointInput}
                        onChange={ev => onSenderEndpointInput(ev.value)}
                        required
                        validate={composeValidators(string, hasValue)}
                        />}
                        />
                    </FormRow>


                    <FormRow>
                        <Field
                        name='receiverendpoint'
                        render={() =>
                        <InputField
                        id="receiverendpoint" 
                        label={i18n.t('Receiver API endpoint')}
                        className="" 
                        type="text"
                        helpText='Fully qualified URL of receiver API endpoint (e.g. https://somesite.org/api/somevalues)'
                        value={receiverEndpointInput}
                        onChange={ev => onReceiverEndpointInput(ev.value)}
                        validate={composeValidators(string, hasValue)}
                        required/>}

                        />
                    </FormRow>

                    <FormRow>
<SingleSelectField
                    label={i18n.t('Converter')}
                    onChange={({ selected }) => onConvertorInput(selected)}
                    selected={converter}
                    value={converters.filter(function(option) {
                        return option.value === converter;
                      })}
                >

                    {converters.map(function(object, i){
        return <SingleSelectOption value={object.value} label={object.label} key={i}/>;
    })}

                    </SingleSelectField>
                    
                    
                    </FormRow>

                    <FormRow>
                    <Editor
                        mode='text'
                        value={payloadInput}
                        onChange={ev => onPayloadInput(ev)}
                        />
                    </FormRow>

                    <FormRow>
                        <Field 
                        name='senderparams'
                        render={() =>
                        <InputField
                        id="senderparams" 
                        label={i18n.t('Sender API parameters')}
                        className="" 
                        type="text" 
                        helpText='E.g ?fields=id,name,description,[organisationunits]&paging=false&filters=name.eq.blabla. DHIS2 API example'
                        value={senderParamsInput}
                        onChange={ev => onSenderParamsInput(ev.value)}
                        />}
                        />
                    </FormRow>

                    <FormRow>
                        <Field
                        name="dhisReceiver"
                        label={i18n.t('DHIS2 Receiving End')}
                        helpText={i18n.t('If selected DHIS2 will receive data from Go.Data')}
                        render={() =>
                            <CheckboxField
                            id="senderparams" 
                            label={i18n.t('DHIS2 is Receiving End')}
                            className="" 
                            type="checkbox" 
                            helpText={i18n.t('If selected, DHIS2 will receive data from Go.Data')}
                            value={dhisReceiver}
                            checked={dhisReceiver}
                            onChange={ev => onReceiverInput(ev)}
                            />}
                    />
                    </FormRow>
                    
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
