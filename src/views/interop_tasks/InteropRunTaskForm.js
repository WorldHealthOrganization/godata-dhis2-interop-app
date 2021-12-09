import { ReactFinalForm, NoticeBox, CenteredContent, CircularLoader, Button, ButtonStrip, Checkbox, Table, TableHead, TableBody, TableRowHead, TableCellHead, TableRow, TableCell } from '@dhis2/ui';
import { useHistory, useParams } from 'react-router-dom';
import React, { useState, useQuery, useEffect } from 'react';
import axios from 'axios';
import { INTEROP_LIST_PATH } from './InteropList';
import traverse from 'traverse';
import centroid from 'turf-centroid';
import { FormRow } from '../../forms';
import { PageHeadline } from '../../headline';
import { dataTest } from '../../dataTest';
import i18n from '../../locales';
import styles from './InteropFormNew.module.css';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import StatusAlert, { StatusAlertService } from 'react-status-alert';
import 'react-status-alert/dist/status-alert.css';
import { Modal } from 'react-responsive-modal';
import dot from 'dot-object';
import { useReadMappingConfigConstantsQueryForConfig, useReadConstantsQueryForDhisConfig } from '../../constants';
import { classImplements } from '@babel/types';
const {
  Form,
  useForm
} = ReactFinalForm;
export const INTEROP_RUN_TASK_FORM_PATH_STATIC = '/interop/run';
export const INTEROP_RUN_TASK_FORM_PATH = `${INTEROP_RUN_TASK_FORM_PATH_STATIC}/:id`;
export const InteropRunTaskForm = () => {
  const history = useHistory();
  const { id } = useParams();

  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const onCancelClick = pristine => pristine ? history.goBack() : setShowCancelDialog(true);

  const [checkedConstants, setCheckedConstants] = useState([]);
  const [alertId, setAlertId] = useState('');
  const [task, setTask] = useState();
  const [mappings, setMappings] = useState();
  const [godataLogn, setGodataLogin] = useState();
  const [token, setToken] = useState();
  const [inst, setInst] = useState([]);
  const [open, setOpen] = useState(false);
  var instanceObject, instance, messg, parentChiled, thisId;
  const [sender, setSender] = useState();
  const [receiver, setReceiver] = useState();
  const [filter, setFilter] = useState();
  const [payloadModel, setPayloadModel] = useState();
  const [isDhis, setIsDhis] = useState();
  const [taskType, setTaskType] = useState();
  const [jsonCollectionName, setJsonCollectionName] = useState();
  const [senderData, setSenderData] = useState();
  const [mappingModel, setMappingModel] = useState();
  const [parentChildRelations, setParentChildRelations] = useState();
  const [existingId, setExistingId] = useState();

  const override = css`
  display: block;
  margin: 0 auto;
  border-color: #36D7B7;
`;
  let [sloading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");

  const createAuthenticationHeader = (username, password) => {
    return 'Basic ' + new Buffer(username + ':' + password).toString('base64');
  };

  const {
    lloading,
    data: progData,
    lerror
  } = useReadConstantsQueryForDhisConfig();
  const {
    loading,
    data,
    error
  } = useReadMappingConfigConstantsQueryForConfig();
  useEffect(() => {
    setLoading(true);
    messg = StatusAlertService.showInfo(i18n.t('Start reading task configurations.'));
    setAlertId({
      messg
    });
    const loginDetailsGodata = data && data.constants.constants.length > 0 ? JSON.parse(data.constants.constants[0].description) : {};
    const loginDetailsDhis = progData && progData.constants.constants.length > 0 ? JSON.parse(progData.constants.constants[0].description) : {};
    console.log('loginDetailsDhis ' + JSON.stringify(loginDetailsDhis));
    console.log('loginDetailsGodata ' + JSON.stringify(loginDetailsGodata));
    setGodataLogin(loginDetailsGodata);
    messg = StatusAlertService.showSuccess(i18n.t('Reading task configurations: Success.'));
    setAlertId({
      messg
    });

    if (data) {
      messg = StatusAlertService.showInfo(i18n.t('Loging in to Go.Data Instance.' + loginDetailsGodata.urlTemplate));
      setAlertId({
        messg
      }); //GET GO.DATA LOGIN TOKEN

      async function loginGodata() {
        try {
          let res = await axios({
            method: 'POST',
            data: {
              email: loginDetailsGodata.username,
              password: loginDetailsGodata.password
            },
            url: loginDetailsGodata.urlTemplate + "/api/users/login"
          });

          if (res.status == 200) {
            console.log('res.data.id ' + res.data.id); //setToken(res.data.id)//in promise??

            console.log('token ' + token);
            messg = StatusAlertService.showSuccess(i18n.t('Loging to Go.Data Instance Success.'));
            setAlertId({
              messg
            }); //GET TASK DEFINITION

            const getTask = async id => {
              var taskObject = await axios.get(loginDetailsDhis.urlTemplate + '/dhis/api/constants/' + id + '?paging=false&fields=id,displayName,code,description,shortName,name', {
                crossDomain: true,
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                  'Content-Type': 'application/json',
                  'Authorization': createAuthenticationHeader('admin', 'district')
                }
              });
              const taskObjectMeta = JSON.parse(taskObject.data.description);
              console.log('taskObjectId ' + JSON.stringify(taskObjectMeta));
              messg = StatusAlertService.showSuccess(i18n.t('Read Task config: Success.'));
              setAlertId({
                messg
              }); //GET TASK'S MAPPINGS DEFINITIONS

              messg = StatusAlertService.showInfo(i18n.t('Reading mappings config.'));
              setAlertId({
                messg
              });

              const getMappings = async id => {
                var mappingObject = await axios.get(loginDetailsDhis.urlTemplate + '/dhis/api/constants/' + id + '?paging=false&fields=id,displayName,code,description,shortName,name', {
                  crossDomain: true,
                  headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    'Content-Type': 'application/json',
                    'Authorization': createAuthenticationHeader('admin', 'district')
                  }
                });
                const mappingObjectMeta = JSON.parse(mappingObject.data.description);
                //console.log('mappingObjectMeta promise ' + JSON.stringify(mappingObjectMeta));

                if (mappingObjectMeta) {
                  setMappings(JSON.parse(JSON.stringify(mappingObjectMeta)));
                  console.log('usemapping ' + mappings);
                }

                messg = StatusAlertService.showSuccess(i18n.t('Read mappings config: Success.'));
                setAlertId({
                  messg
                }); //setTask(JSON.parse(taskObject.data))//in promise
                //setMappings(JSON.parse(mappingObject.data)) //in promise
                // taskConfig 0 - sender API, 1 - receiver API, 2 - sender API filters, 
                // 3 - payload model, 4 - is DHIS2 receiver, 5 - mappingsObjectId, 6 - task type  

                console.log('0 - sender API ' + taskObjectMeta[0]);
                setSender(taskObjectMeta[0]);
                console.log('1 - receiver API ' + taskObjectMeta[1]);
                setReceiver(taskObjectMeta[1]);
                console.log('2 - sender API filters ' + taskObjectMeta[2]);
                setFilter(taskObjectMeta[2]);
                console.log('3 - sender API payload model ' + taskObjectMeta[3]);
                setPayloadModel(taskObjectMeta[3]);
                console.log('4 - is DHIS2 receiver ' + taskObjectMeta[4]);
                setIsDhis(taskObjectMeta[4]);
                console.log('5 - mappings object Id ' + taskObjectMeta[5]);
                console.log('6 - task type ' + taskObjectMeta[6]);
                setTaskType(taskObjectMeta[6]);
                console.log('7 - jsoncollectionname ' + taskObjectMeta[7]);
                setJsonCollectionName(taskObjectMeta[7]);
                //console.log(' - mapping object ' + JSON.stringify(mappingObjectMeta));
                setMappingModel(JSON.parse(JSON.stringify(mappingObjectMeta)));
                setTask(taskObjectMeta[6]); //const mappingJson = 

                //console.log(JSON.stringify('mappingObjectMeta ' + mappingObjectMeta[0])); //if DHIS2 is receiving end

                if (isDhis) {
                  messg = StatusAlertService.showInfo(i18n.t('DHIS2 is receiving endpoint.'));
                  setAlertId({
                    messg
                  });
                  messg = StatusAlertService.showInfo(i18n.t('Login in to Go.Data Instance.' + loginDetailsGodata.urlTemplate));
                  setAlertId({
                    messg
                  }); //get Go.Data security token

                  const loginObject = await axios.post(loginDetailsGodata.urlTemplate + '/api/users/login', {
                    email: loginDetailsGodata.username,
                    password: loginDetailsGodata.password
                  });
                  messg = StatusAlertService.showSuccess(i18n.t('Login in to Go.Data Instance: Success.'));
                  setAlertId({
                    messg
                  });
                  messg = StatusAlertService.showInfo(i18n.t('Reading sender data.'));
                  setAlertId({
                    messg
                  }); //GET GO.DATA INSTANCES AS PER API ENDPOINT

                  instanceObject = await axios.get(taskObjectMeta[0] + taskObjectMeta[2], {
                    headers: {
                      'Access-Control-Allow-Origin': '*',
                      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                      'Content-Type': 'application/json',
                      crossDomain: true,
                      Authorization: loginObject.data.id
                    }
                  });
                  messg = StatusAlertService.showSuccess(i18n.t('Reading sender data: Success.'));
                  setAlertId({
                    messg
                  });
                  console.log(JSON.stringify(instanceObject.data));
                  var tmp = JSON.parse(JSON.stringify(instanceObject.data));
                  setSenderData(tmp);
                  instance = [];
                  instanceObject.data.map(function (object, i) {
                    instance.push({
                      'name': object.name,
                      'id': object.id
                    }); // console.log('name ' +object.name + ' id ' + object.id +' key ' + i)
                    // console.log(JSON.stringify('instance ' + instance))

                    instance = JSON.parse(JSON.stringify(instance)); //MAP AND SHOW MODAL FOR SELECTION

                    setInst(instance);
                    setLoading(false);
                    setOpen(true); // console.log('after modal opened')
                  }); //if DHIS2 is not receiving end
                } else {
                  messg = StatusAlertService.showInfo(i18n.t('Reading sender data.'));
                  setAlertId({
                    messg
                  }); //GET DHIS2 INSTANCES AS PER API ENDPOINT

                  instanceObject = await axios.get(taskObjectMeta[0] + taskObjectMeta[2], {
                    headers: {
                      'Access-Control-Allow-Origin': '*',
                      'Authorization': createAuthenticationHeader('admin', 'district'),
                      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                      'Content-Type': 'application/json',
                      crossDomain: true
                    }
                  });
                  messg = StatusAlertService.showSuccess(i18n.t('Reading sender data: Success.'));
                  setAlertId({
                    messg
                  });
                  //console.log('instanceObject.data' + JSON.stringify(instanceObject.data));
                  console.log('jsonCollectionName ' + taskObjectMeta[7]);
                  var tmp = JSON.parse(JSON.stringify(instanceObject.data[taskObjectMeta[7]]));
                  setSenderData(tmp);
                  instance = [];
                  parentChiled = []
                  instanceObject.data[taskObjectMeta[7]].map(function (object, i) {
                    instance.push({
                      'name': object.name,
                      'id': object.id
                    }); 

                    parentChiled.push(
                        {'id': object.id, 'parentId': object?.parent?.id, 'newId': '', 'newParentId': ''}
                    )

                    // console.log('name ' +object.name + ' id ' + object.id +' key ' + i)
                    //console.log('instance ' + JSON.stringify(instance))
                  }); //MAP AND SHOW MODAL FOR SELECTION

                  instance = JSON.parse(JSON.stringify(instance)); // console.log('after modal opened')
                    parentChiled = JSON.parse(JSON.stringify(parentChiled)); //get real copy from promise

                  setInst(instance)
                  setParentChildRelations(parentChiled)
                  setLoading(false)
                  setOpen(true)
                }
              };

              getMappings(taskObjectMeta[5]);
            };

            getTask(id);
          }
        } catch (error) {
          messg = StatusAlertService.showError(i18n.t('Loging to Go.Data Instance Failed.' + error), options);
          setAlertId({
            messg
          });
          console.log(error);
        }
      }

      loginGodata();
    }

    return () => {
      console.log("This will be logged on unmount");
    };
  }, [data, progData]);

  if (loading) {
    return <>
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        </>;
  }

  if (error) {
    const msg = i18n.t('Something went wrong whilst loading gateways');
    return <>
            <PageHeadline>{i18n.t('Edit')}</PageHeadline>
            <NoticeBox error title={msg}>
                {loadError.message}
            </NoticeBox>
        </>;
  }

  if (lloading) {
    return <>
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        </>;
  }

  if (lerror) {
    const msg = i18n.t('Something went wrong whilst loading gateways');
    return <>
            <PageHeadline>{i18n.t('Edit')}</PageHeadline>
            <NoticeBox error title={msg}>
                {loadError.message}
            </NoticeBox>
        </>;
  }

  const allConstantsChecked = checkedConstants.length === inst.length;

  const toggleConstant = id => {
    if (checkedConstants.includes(id)) {
      const index = checkedConstants.findIndex(curId => curId === id);
      const newCheckedConstants = index === 0 ? checkedConstants.slice(1) : [...checkedConstants.slice(0, index), ...checkedConstants.slice(index + 1)];
      setCheckedConstants(newCheckedConstants);
    } else {
      setCheckedConstants([...checkedConstants, id]);
    }
  };

  const toggleAll = () => {
    if (!allConstantsChecked) {
      const allConstantIds = inst.map(({
        id
      }) => id);
      setCheckedConstants(allConstantIds);
    } else {
      setCheckedConstants([]);
    }
  }; //NOW WE HAVE EVERYTHING TO PROCESS CONVERSION


  const getTaskDone = () => {
    setOpen(false);
    console.log('sender ' + sender);
    console.log('receiver ' + receiver);
    console.log('filter ' + filter);
    console.log('payloadModel ' + payloadModel);
    console.log('isDhis ' + isDhis);
    console.log('taskType ' + taskType);
    //console.log('mappingModel ' + JSON.stringify(mappingModel));
    //console.log('senderData ' + JSON.stringify(senderData));
    //console.log('inst ' + JSON.stringify(inst));
    //console.log('payloadModel ' + JSON.stringify(payloadModel));
    /*
        traverse(payloadModel).forEach(function (x) {
            this.update(x)
            console.log(x)
        });*/

    var mappings;

    function iterate(obj) {
      var walked = [];
      var stack = [{
        obj: obj,
        stack: ''
      }];
      mappings = [];
      var i = 0;

      while (stack.length > 0) {
        var item = stack.pop();
        var obj = item.obj;

        for (var property in obj) {
          if (obj.hasOwnProperty(property)) {
            if (typeof obj[property] == "object") {
              var alreadyFound = false;

              for (var i = 0; i < walked.length; i++) {
                if (walked[i] === obj[property]) {
                  alreadyFound = true;
                  break;
                }
              }

              if (!alreadyFound) {
                walked.push(obj[property]);
                stack.push({
                  obj: obj[property],
                  stack: item.stack + '.' + property
                });
              }
            } else {
              i++;
              console.log('payloadItem ' + item.stack + '.' + property); //console.log('mappingModel dot.pick ' + dot.pick('godata'+item.stack + '.' + property, mappingModel))

              console.log('getDotNotationByValue ' + getDotNotationByValue((item.stack + '.' + property).substr(1))); //dot.copy('stuff.phone', 'wanna.haves.phone', src, tgt);

              dot.str((item.stack + '.' + property).substr(1).toString(), getDotNotationByValue((item.stack + '.' + property).substr(1)), payloadModel);
              /*  mappings.push(
                    {
                        "godata": (item.stack + '.' + property).substr(1) , 
                        "dhis2": "","props":{
                        "conversion": "true",
                        "values":{}}
                    })*/
            }
          } //console.log('payloadModel ' + JSON.stringify(payloadModel))
          //  console.log('mappings length ' + mappings.length)

        }
      }
    }

    iterate(payloadModel);

    function getDotNotationByValue(dotnot) {
        //set dotnot to string if its number
        if (typeof dotnot === 'number') {
            dotnot = dotnot.toString();
          }

      //GET MAPPING MODEL
      var dataArray = mappingModel[0].godataValue[1]; // console.log('dataArray ' + JSON.stringify(dataArray))

      console.log('parentChildRelations ' + JSON.stringify(parentChildRelations))

      let stmp = '';

      if (isDhis) {
           //IF DHIS2 IS RCEIVING END
        let tmp = dataArray.find(x => x.godata === dotnot); //console.log(JSON.stringify(tmp))

        if (tmp) {
          //IF MAPPING FOUND HAS CONVERSION. THIS MEANS VALUE SHOULD BE FETCHED FROM OTHER
          // PARTY OBJECT AND IF THERE IS CONVERSION OF VALUES TO PROCESS CONVERSION
          if (tmp.props.conversion === 'true') {
            //console.log('senderData' + senderData)
            console.log('selected object ' + JSON.stringify(checkedConstants));
            stmp = senderData[0]; //TO BE DYNAMIC 

            let val = dot.pick(tmp.dhis2, stmp); //IN CASE OF GO.DATA, PROPERTY IS USED FOR SEARCHING CONVERSION VALUE

            var stringBoolean = '';

            if (typeof val == "boolean") {
              stringBoolean = val ? "true" : "false";
            } else {
              stringBoolean = val;
            }

            console.log('false ' + JSON.stringify(tmp) + ' props.values.false ' + JSON.stringify(tmp.props.values[stringBoolean]));

            if (tmp.props.values[stringBoolean]) {
              //RETURN CONVERTED VALUE
              return tmp.props.values[stringBoolean];
            } else {
              //RETURN RAW VALUE IF NOT FOUND IN CONVERSION TABLE
              return val;
            }
          } else if (tmp.props.conversion === 'geo') {
            console.log('call a method here for geography');
          } else {
            return tmp.dhis2;
          }
        } else {
          return 'NO VALUE SET';
        }
      } else {
        //DHIS2 IS SENDER
        
        let tmp = dataArray.find(x => x.godata === dotnot); //console.log(JSON.stringify(tmp))

        //console.log('selected object ' + JSON.stringify(checkedConstants[0]));
        const senderObject = senderData.find(x => x.id === checkedConstants[0]); //TO BE DYNAMIC AND ITERATIVE
        stmp = senderObject; //ITS DYNAMIC
        console.log('stmp ' + JSON.stringify(stmp))

        if (tmp) {
          //IF MAPPING FOUND HAS CONVERSION. THIS MEANS VALUE SHOULD BE FETCHED FROM OTHER
          // PARTY OBJECT AND IF THERE IS CONVERSION OF VALUES TO PROCESS CONVERSION
          console.log('conversion ' + tmp.props.conversion);

          if (tmp.props.conversion === 'true' || typeof tmp.props.conversion == 'boolean') {
            //console.log('senderData' + senderData)
            let val = dot.pick(tmp.dhis2, stmp);

        //set val to string if its number
        if (typeof val === 'number') {
            val = val.toString();
          }

            var stringBoolean = '';

            if (typeof val == "boolean") {
              stringBoolean = val ? "true" : "false";
            } else {
              stringBoolean = val;
            } //IN CASE OF DHIS2 PROPERTY VALUE IS USED FOR SEARCHING CONVERSION VALUE
                if(tmp.dhis2==='id'){
                    console.log('existying val ' + val )
                    thisId = val
                    setExistingId(val)
                }
            //console.log('false/true ' + JSON.stringify(tmp) + ' props.values.false ' + JSON.stringify(tmp.props.values))

             let keys = Object.keys(tmp.props.values);
                for (let i=0; i < keys.length; i++){
                console.log('keys[] ' + tmp.props.values[keys[i]] + ' stbool ' + stringBoolean);
                if(stringBoolean == tmp.props.values[keys[i]]){
                    return keys[i]
                }
                
            } 
              //RETURN RAW VALUE IF NOT FOUND IN CONVERSION TABLE
              return val;
            
          } else if (tmp.props.conversion === 'geo') {
            //console.log('dotnot geometry ' + JSON.stringify(dot.pick('geometry', stmp)))
            const geom = dot.pick('geometry', stmp);

            if (geom) {
              if (geom.type = 'Polygon') {
                //get centroid
                var centroidPoint = centroid(dot.pick('geometry', stmp));
                console.log('centroid latitude ' + centroidPoint.geometry.coordinates[0]);
                var lon = centroidPoint.geometry.coordinates[0];
                var lat = centroidPoint.geometry.coordinates[1]; //console.log('tmp.godata ' + tmp.godata)
                if(Number.isNaN(centroidPoint)){
                    //try to get Point instead
                    var point = dot.pick('geometry.coordinates', stmp);
                    if (tmp.godata === 'geoLocation.lat') {
                        return point[0];
                      } else if (tmp.godata === 'geoLocation.lng') {
                        return point[1];
                      } else {
                        return 0;
                      }
                }else{
                if (tmp.godata === 'geoLocation.lat') {
                  return lat;
                } else if (tmp.godata === 'geoLocation.lng') {
                  return lon;
                } else {
                  return 0;
                }
            }
              }else if (geom.type = 'Point'){
                var point = dot.pick('geometry.coordinates', stmp);
                if (tmp.godata === 'geoLocation.lat') {
                  console.log(point[0])
                  return point[0];
                } else if (tmp.godata === 'geoLocation.lng') {
                  console.log(point[1])
                  return point[1];
                } else {
                  return 0;
                }
              }else{
                return 0
              }
              console.log(JSON.stringify('geom ' + geom.type))
            } //console.log('call a method here for geometry')
            //none of tries are successful, simply return 0
                return 0
          }
          
          
          
          
          else if (tmp.props.conversion === 'pid'){

            return '0391a098-bbc2-4435-adae-6910afa47a72'
          }




          else {
            //console.log('tmp.dhis2 ' + tmp.dhis2)
            return tmp.dhis2;
          }
        } else {
          //return 'VALUE NOT SET';
        }
      }
    }

    console.log('payloadModel ' + JSON.stringify(payloadModel)); //SEND PAYLOAD TO RECIEVER

    messg = StatusAlertService.showInfo(i18n.t('Start sending data'));
    setAlertId({
      messg
    });

    async function login() {
      try {
        let res = await axios({
          method: 'POST',
          data: {
            email: godataLogn.username,
            password: godataLogn.password
          },
          url: godataLogn.urlTemplate + "/api/users/login"
        });

        if (res.status == 200) {
          console.log('res.data.id ' + res.data.id);
          setToken(JSON.parse(JSON.stringify(res.data.id)));
          /*
                  axios.post(receiver + '?access_token=' + res.data.id, payloadModel, { headers : {'Access-Control-Allow-Origin' : '*',
                  'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                  'Content-Type':'application/json', 
                      crossDomain:true,
                      //Authorization: res.data.id,
                    } })
              .then(response => console.log(response.data.id));*/

          console.log('payloadModel ' + JSON.stringify(payloadModel));
          let ans = await axios({
            method: 'POST',
            data: payloadModel,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              'Content-Type': 'application/json',
              crossDomain: true //Authorization: `bearer ${res.data.id}` ,

            },
            url: receiver + '?access_token=' + res.data.id
          });

          if (res.status == 200) {
            console.log('res.data ' + ans.data);

            //save location id into conversion table props of 'id' and 'parentLocationId'
/*            setParentChildRelations(parentChildRelations => {
                const location = [...parentChildRelations];
                location[1][valueHolder[2]] = ths;
                return location
              })
*/


setParentChildRelations(parentChildRelations => {
                    let items = [...parentChildRelations];
//set new id of this orgunit     
console.log('existingId ' + existingId + ' thisId ' + thisId + ' ans.data.id ' + ans.data.id)               
                    for (let i = 0, l = items.length; i < l; ++i) {
                        if (items[i].id === thisId) {
                          items[i].newId = ans.data.id;
                          break;
                        }
                      }
//set new parentids for children of this location
                      for (let i = 0, l = items.length; i < l; ++i) {
                        if (items[i].parentId === thisId) {
                          items[i].newParentId = ans.data.id;
                          //break;
                        }
                      }
//finally return modified array to back to state
console.log('items ' +JSON.stringify(items));
console.log('items parentChildRelations ' +JSON.stringify(parentChildRelations));
                      return items
                    })   
                



            messg = StatusAlertService.showSuccess(i18n.t('Data send successfully' + JSON.stringify(ans.data)), {
              autoHideTime: 10000000
            });
            setAlertId({
              messg
            });
          }
        }
      } catch (error) {
        console.log('error: ' + JSON.stringify(error));
        //console.log('error message ' + JSON.stringify(error.response.data));
        //console.log(error.response.status);
        messg = StatusAlertService.showError(i18n.t('Data sending failed: ' + JSON.stringify(error.response.data)), {
          autoHideTime: 10000000
        });
        setAlertId({
          messg
        });
      }
    }

    login();
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const onSubmit = values => {
    history.push(INTEROP_LIST_PATH);
  };

  return <div data-test={dataTest('views-gatewayconfigformnew')} className={styles.container}>
            <StatusAlert />
            <Form destroyOnUnregister onSubmit={onSubmit}>
            {({
        handleSubmit,
        pristine
      }) => <form>
            <FormRow>
            <Modal open={open} onClose={onCloseModal} center>
        <h2>Select item(s)</h2>
        <p>{task}</p>
                                    <ButtonStrip>
                                        <Button primary disabled={!checkedConstants.length > 0} onClick={() => getTaskDone()}>
                                        {i18n.t('Proceed')}
                                        </Button>
                                        <Button onClick={() => onCancelClick(pristine)}>
                                            {i18n.t('Cancel')}
                                        </Button>
                                    </ButtonStrip>
        <Table dataTest={dataTest('constants-constantstable')}>
            <TableHead>
                <TableRowHead>
                    <TableCellHead dataTest={dataTest('constants-constantstable-checkall')}>
                        <Checkbox onChange={toggleAll} checked={allConstantsChecked} />
                    </TableCellHead>
                    <TableCellHead>{i18n.t('Name')}</TableCellHead>
                </TableRowHead>
            </TableHead>

            <TableBody>
                {inst.map(constant => <TableRow key={constant.id} dataTest={dataTest('constants-constantstable-row')}>
                        <TableCell className={styles.checkboxCell} dataTest={dataTest('constants-constantstable-checkbox')}>
                            <Checkbox value={constant.id} onChange={() => toggleConstant(constant.id)} checked={checkedConstants.includes(constant.id)} dataTest={dataTest('constants-constantstable-id')} />
                        </TableCell>

                        <TableCell dataTest={dataTest('constants-constantstable-name')}>
                            {constant.name}
                        </TableCell>

                    </TableRow>)}
            </TableBody>
        </Table>






        

    </Modal>    
    </FormRow>
   
            </form>}
            </Form>
            <ClipLoader color={color} loading={sloading} css={override} size={150} />
        </div>;
};