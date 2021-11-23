import { SingleSelectField, SingleSelectOption, Button, ButtonStrip, ReactFinalForm, TextArea, CenteredContent, CircularLoader, composeValidators, hasValue,
    string, InputField, TextAreaField } from '@dhis2/ui'
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
import ReactJson from 'react-json-view'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import dot from 'dot-object';

import {
    useCreateTaskConstantMutation,
    useUpdateTaskConstantMutation,
} from '.'
import { FormRow } from '../forms'
import { PageSubHeadline } from '../headline'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Form } = ReactFinalForm

export const InteropForm = ({
    onCancelClick,
    onSubmit,
    initialValues,
}) => {
    const history = useHistory()
    const [open, setOpen] = useState(false);
    const [valueHolder, setValueHolder] = useState({});
    const [dhisValue, setDhisValue] = useState({});
    const [godataValue, setGodataValue] = useState([]);
    

    const [nameInput, setNameInput] = useState('')
    const [senderEndpointInput, setSenderEndpointInput] = useState('')
    const [receiverEndpointInput, setReceiverEndpointInput] = useState('')
    const [senderParamsInput, setSenderParamsInput] = useState('')
    
    const [dhisModelInput, setDhisModelInput] = useState('')
    const [godataModelInput, setGodataModelInput] = useState('')

    const [visibleForm, setVisibleForm] = useState(GODATA_CASE)

    var mappings, dhismappings
    var instanceObject

    const { lloading, data: progData, lerror } = useReadProgramsQueryForMappings()
    //console.log('progData stringified ' + JSON.stringify(progData?.programs?.programs[0]))

    const { loading, data, error  } = useReadMappingConfigConstantsQueryForConfig()


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
                        console.log('programInstance ' + programInstance)                

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

                if(initialValues.name != 'undefined'){
                    setGodataValue(JSON.parse(initialValues.description)[0].godataValue)
                    setNameInput(initialValues.name)
                    setGodataModelInput(JSON.stringify(JSON.parse(initialValues.description)[1]))
                    setDhisModelInput(JSON.stringify(JSON.parse(initialValues.description)[2]))
                }
                      };
                      getInstanceData();
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

    const submitText = initialValues.name
    ? i18n.t('Save task')
    : i18n.t('Add task')

    const onNameInput = (ev) => { setNameInput(ev)}
    const onDhisModelInput = (ev) => { setDhisModelInput(ev)}
    const onGodataModelInput = (ev) => { setGodataModelInput(ev)}
    
    const saveConstant = async godataValue => {
        
        const godataModelJson = Object.keys(godataModelInput).length != 0
        ? JSON.parse(godataModelInput)
        : {}

        const dhisModelJson = Object.keys(dhisModelInput).length != 0
        ? JSON.parse(dhisModelInput)
        : {}
        const allValues = []
        allValues.push(godataValue)
        console.log('allValues godataValue ' + JSON.stringify(allValues))
        allValues.push(godataModelJson)
        console.log('allValues godataModelJson ' + JSON.stringify(allValues))
        allValues.push(dhisModelJson)
        console.log('allValues dhisModelJson ' + JSON.stringify(allValues))

        if(initialValues.name){
            var id = initialValues.id
            await saveTaskConstant({allValues,nameInput, id})
        }else{
            await addTaskConstant({allValues,nameInput})
        }
        
        history.push(INTEROP_LIST_PATH)
    }

    const handleChange = () => console.log('jsontreechanges')        

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
                    <PageSubHeadline>{i18n.t('Task setup')}</PageSubHeadline>

                    <FormRow>
                <SingleSelectField
                    label={i18n.t('Type')}
                    onChange={({ selected }) => setVisibleForm(selected)}
                    selected={visibleForm}
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
                        onChange={ev => onNameInput(ev.value)}
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
                        onChange={ev => onNameInput(ev.value)}
                        validate={composeValidators(string, hasValue)}
                        required/>}

                        />
                    </FormRow>


                    <FormRow>
                    <Editor
                        mode='text'
                        value={{}}
                        onChange={handleChange}
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
                        helpText='E.g ?fields=id,name,description,[organisationunits]&pging=false'
                        value={senderParamsInput}
                        onChange={ev => onNameInput(ev.value)}
                        />}
                        />
                    </FormRow>

                    <ButtonStrip>

                        <Button primary onClick={() => saveConstant({godataValue})}>
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
