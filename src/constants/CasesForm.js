import { Button, ButtonStrip, ReactFinalForm, CenteredContent, CircularLoader } from '@dhis2/ui'
import { useHistory } from 'react-router-dom'
import React, { useEffect, useState, useMemo } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import {useReadMappingConfigConstantsQueryForConfig, useReadProgramsQueryForMappings} from '.'
import { METADATA_CONFIG_LIST_PATH } from '../views'

import axios from 'axios'

import 'jsoneditor-react/es/editor.min.css'
import ReactJson from 'react-json-view'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import dot from 'dot-object';

import {
    useCreateCasesConstantMutation,
    FieldConstantName,
} from '../constants'
import { FormRow } from '../forms'
import { PageSubHeadline } from '../headline'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Form } = ReactFinalForm

export const CasesForm = ({
    onCancelClick,
    onSubmit,
    initialValues,
}) => {
    const history = useHistory()
    const [open, setOpen] = useState(false);
    const [valueHolder, setValueHolder] = useState({});
    const [dhisValue, setDhisValue] = useState({});
    const [godataValue, setGodataValue] = useState([]);
    const [loginData, setLoginDetails] = useState([])

    var mappings, dhismappings
    var instanceObject

    const { lloading, data: progData, lerror } = useReadProgramsQueryForMappings()
    //console.log('progData stringified ' + JSON.stringify(progData?.programs?.programs[0]))

    const { loading, data, error  } = useReadMappingConfigConstantsQueryForConfig()


    const [ saveCasesConstant ] = useCreateCasesConstantMutation()


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


                                function iterate(obj) {
                                    var walked = [];
                                    var stack = [{obj: obj, stack: ''}];
                                    mappings = [];
                                    var i = 0
                                    while(stack.length > 0)
                                    {
                                        var item = stack.pop();
                                        var obj = item.obj;
                                        for (var property in obj) {
                                            if (obj.hasOwnProperty(property)) {
                                                if (typeof obj[property] == "object") {
                                                  var alreadyFound = false;
                                                  for(var i = 0; i < walked.length; i++)
                                                  {
                                                    if (walked[i] === obj[property])
                                                    {
                                                      alreadyFound = true;
                                                      break;
                                                    }
                                                  }
                                                  if (!alreadyFound)
                                                  {
                                                    walked.push(obj[property]);
                                                    stack.push({obj: obj[property], stack: item.stack + '.' + property});
                                                  }
                                                }
                                                else
                                                {
                                                    i++
                                                    mappings.push(
                                                        {
                                                            "godata": (item.stack + '.' + property).substr(1) , 
                                                            "dhis2": '',
                                                        })
                        
                                }
                            }
                          //  console.log('mappings length ' + mappings.length)
                        }
                                            }      
                                        }          
                            iterate(instanceObject.data[0])
                            setGodataValue(mappings)

                            function iterate2(obj) {
                                var walked = [];
                                var stack = [{obj: obj, stack: ''}];
                                dhismappings = [];
                                while(stack.length > 0)
                                {
                                    var item = stack.pop();
                                    var obj = item.obj;
                                    for (var property in obj) {
                                        if (obj.hasOwnProperty(property)) {
                                            if (typeof obj[property] == "object") {
                                              var alreadyFound = false;
                                              for(var i = 0; i < walked.length; i++)
                                              {
                                                if (walked[i] === obj[property])
                                                {
                                                  alreadyFound = true;
                                                  break;
                                                }
                                              }
                                              if (!alreadyFound)
                                              {
                                                walked.push(obj[property]);
                                                stack.push({obj: obj[property], stack: item.stack + '.' + property});
                                              }
                                            }
                                            else
                                            {
                                                dhismappings.push(
                                                    {
                                                        "dhis2": (item.stack + '.' + property).substr(1) 
                                                    })
                                                //mappings.set(item.stack + '.' + property , 'to be other stuff');
                                                //console.log(item.stack + '.' + property /*+ "=" + obj[property]*/);
                                            }
                                        }
                                    }
                                }
                                console.log('dhis2 mappings length ' + dhismappings.length)
                            }
                        
                        iterate2(programInstance)
                setDhisValue(dhismappings)


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

    const editNode = ({})=>{
        console.log('editjsoneditor')
        return true
    }

    const copyFromPopup  = (instance)=>{
        if(instance.name == 'dhis2')
        {
        console.log(instance.src)
//read and replace dhuis2 placeholder and update ui
          var ths = dot.str('dhis2', instance.src, godataValue[valueHolder[1]])
          console.log('str ths: ' + JSON.stringify(ths))
          setGodataValue(godataValue => {
              const Outbreak = [...godataValue];
              Outbreak[valueHolder[1]] = ths;
              return Outbreak
            })
        setOpen(false)
        }else{
            console.log('Wrong element selected')
        }
    
        return true
    }

    const submitText = initialValues
        ? i18n.t('Save mappings')
        : i18n.t('Add mappings')     

    const selectedNode = (instance)=>{
        //store initial values into useStore, we need this to replace placeholder next
        setValueHolder(instance.namespace),
        instance.name == 'dhis2'
        ? setOpen(true)
        : console.log('wrong element selected'), 

        console.log('select Node with popup:  ' + JSON.stringify(instance.namespace ))
        return true
    }

    const onCloseModal = () => {setOpen(false)}
    const addNode = () => {console.log('editjsoneditor')}

    const deleteNode = () => {console.log('deletejsoneditor')}     

    
    const saveConstant = async godataValue => {
        await saveCasesConstant(godataValue)
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
                    <PageSubHeadline>{i18n.t('Mappings setup')}</PageSubHeadline>

                    <FormRow>
                        <FieldConstantName />
                    </FormRow>

                    <div><ReactJson 
            src={godataValue}
            onAdd={addNode}
            onEdit={editNode}
            onDelete={deleteNode}
            enableClipboard={selectedNode}
            theme="apathy:inverted"
            name={'Outbreak'}
            displayArrayKey={true}
            />
            </div>

            <Modal open={open} onClose={onCloseModal} center>
        <h2>Select DHIS2 metadata</h2>
        <div><ReactJson
            src={dhisValue}
            enableClipboard={copyFromPopup}
            theme="apathy:inverted"
            name={'Program'}
            displayArrayKey={true}
            />
            </div>
    </Modal>
                    <ButtonStrip>

                        <Button primary onClick={() => saveConstant({godataValue})}>
                            {i18n.t('Add constant')}
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
}

CasesForm.propTypes = {
    onCancelClick: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
}
