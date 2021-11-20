import { Button, ButtonStrip, ReactFinalForm, CenteredContent, CircularLoader } from '@dhis2/ui'
import React, { useEffect, useState, useMemo } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import {useReadMappingConfigConstantsQueryForConfig, useReadProgramsQueryForMappings} from '.'

import {GODATA_OUTBREAK_MODEL, DHIS_PROGRAM_MODEL} from '../constants'

import axios from 'axios'

import 'jsoneditor-react/es/editor.min.css'
import ReactJson from 'react-json-view'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import dot from 'dot-object';

import {
    FieldConstantName,
} from '.'
import { FormRow } from '../forms'
import { PageSubHeadline } from '../headline'
import { dataTest } from '../dataTest'
import i18n from '../locales'


const { Form } = ReactFinalForm



export const OutbreaksForm = ({
    onCancelClick,
    onSubmit,
    initialValues,
}) => {

    const [open, setOpen] = useState(false);
    const [dhisValue, setDhisValue] = useState({});
    const [godataValue, setGodataValue] = useState([]);
    var instanceObject
    var mappings, dhismappings




       const { code } = 'godataserverconf'

       const { loading, data, error } = useReadMappingConfigConstantsQueryForConfig(
           code
       )
      
       const configs = 
       data && data.constants.constants.length >0
       ? JSON.parse(data.constants.constants[0].description)
               : {}

            const { lloading, lerror, progData } = useReadProgramsQueryForMappings()
           console.log('progData ' + progData)

            const programInstance = 
            progData && progData.programs.programs.length >0
            ? JSON.parse(progData.programs.programs[0])
                    : {}

        //            console.log('programInstance ' + JSON.stringify(programInstance))

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

    const submitText = initialValues
        ? i18n.t('Save mappings')
        : i18n.t('Add mappings')     


          const getData = async () => {
            const fetchedData = await axios.post(
                configs.urlTemplate+'/api/users/login', {
                    email: configs.username,
                    password: configs.password,
                }
            ).then(response => {
                const getInstanceData = async () => {
                    instanceObject = await axios.get(
                        configs.urlTemplate +'/api/outbreaks', {
                            headers : {
                                Authorization: response.data.id,
                              }
                            });
                  };
                  getInstanceData();
            })

          };
         // getData();

          //console.log('Object.keys: ' + Object.keys(GODATA_OUTBREAK_MODEL))

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
    iterate(GODATA_OUTBREAK_MODEL)



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
       // console.log('mappings length ' + dhismappings.length)
    }

iterate2(DHIS_PROGRAM_MODEL)




//to be used for storing mapping in a database
    function arrayToMap()  {
        let users = [
            {firstName : "Susan", lastName: "Steward"},
            {firstName : "Daniel", lastName: "Longbottom"},
            {firstName : "Jacob", lastName: "Black"}
          ];
          
          let userFullnames = users.map(function(element){
              return `${element.firstName} ${element.lastName}`;
          })
          
        //  console.log('key way: '+ userFullnames);

          let userFullnamesReverse = users.map(function(element){
            return `${element.lastName} ${element.firstName}`;
        })
        
      //  console.log('value way: '+ userFullnamesReverse);
    }

    arrayToMap()


    function getByValue(map, searchValue) {
        for (let [key, value] of map.entries()) {
          if (value === searchValue)
            return key;
        }
      }
      
      let mappings2 = new Map();
      mappings2.set('1', 'jhon');
      mappings2.set('2', 'jasmein');
      mappings2.set('3', 'abdo');

      //console.log(getByValue(mappings2, 'jhon'))
      //console.log(getByValue(mappings2, 'abdo'))


/*
Object.keys() returns an array of object's keys, Object.values() returns an array of object's values, and Object.entries() returns an array of object's keys and corresponding values in a format [key, value].
*/
          /*
          // var o = { success: true }
// Object.setByPath('data.person.name', o, 'Mike')
// => { success: true, data: { person: { name: 'Mike'} } }
Object.setByPath = function(path, obj, value) {
  var parts = path.split('.');
  return parts.reduce(function(prev, curr, ix) {
    return (ix + 1 == parts.length)
      ? prev[curr] = value
      : prev[curr] = prev[curr] || {};
  }, obj);
}
          */

        const editNode = ({bool})=>{
            console.log('editjsoneditor')
            return true
        }

        const copyFromPopup  = (instance)=>{
            console.log(instance.src)
//read and replace dhuis2 placeholder and update ui
              var ths = dot.str('dhis2', instance.src, godataValue[dhisValue[1]])
              console.log('str ths: ' + JSON.stringify(ths))
              setGodataValue(godataValue => {
                  const Outbreak = [...godataValue];
                  Outbreak[dhisValue[1]] = ths;
                  return Outbreak
                })
            setOpen(false)
            return true
        }

        const selectedNode = (instance)=>{
            //store initial values into useStore, we need this to replace placeholder next
            setDhisValue(instance.namespace),
            instance.name == 'dhis2'
            ? setOpen(true)
            : console.log('wrong element selected'), 

            console.log('select Node with popup:  ' + JSON.stringify(instance.namespace ))
            return true
        }

        const onCloseModal = () => {setOpen(false)}
        const addNode = () => {console.log('editjsoneditor')}

        const deleteNode = () => {console.log('deletejsoneditor')}

        const onSourceClick = () => {
            setGodataValue(mappings)
            setDhisValue([])
            console.log('onSourceClick')
        }
        const onSourceChangeClick = () => {
            var ths = dot.str('dhis2', 'instance.src', godataValue[1])
            console.log(JSON.stringify(ths))
            setGodataValue(godataValue => {
                const Outbreak = [...godataValue];
                Outbreak[1] = ths;
                return Outbreak;
            })
            console.log('onSourceChangeClick')
        }

 /*       useEffect(() => {
            // Update the document title using the browser API
            console.log( `You clicked 14 times`);
          })*/

    return (
        <Form
            keepDirtyOnReinitialize
            onSubmit={() =>onSubmit}
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
                    <div>
                    
        </div>
                    <ButtonStrip>
                        <Button
                            primary
                            type="submit"
                            dataTest={dataTest(
                                'forms-gatewaygenericform-submit'
                            )}
                            disabled={submitting}
                            icon={submitting ? <CircularLoader small /> : null}
                        >
                            {submitText}
                        </Button>
    <Modal open={open} onClose={onCloseModal} center>
        <h2>Select DHIS2 metadata</h2>
        <div><ReactJson
            src={dhismappings}
            enableClipboard={copyFromPopup}
            theme="apathy:inverted"
            name={'Program'}
            displayArrayKey={true}
            />
            </div>
    </Modal>
                        <Button onClick={() => onCancelClick(pristine)}>
                            {i18n.t('Cancel')}
                        </Button>
                        <Button onClick={() => onSourceClick()}>
                            {i18n.t('Change Source')}
                        </Button>
                        <Button onClick={() => onSourceChangeClick()}>
                            {i18n.t('Change Source Instance')}
                        </Button>
                    </ButtonStrip>
                </form>
            )}
        </Form>
    )
}

OutbreaksForm.defaultProps = {
    initialValues: {
        parameters: [],
    },
}

OutbreaksForm.propTypes = {
    onCancelClick: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
}

