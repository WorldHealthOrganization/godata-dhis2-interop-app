import { Button, CenteredContent, CircularLoader, NoticeBox } from '@dhis2/ui'
import { useHistory } from 'react-router-dom'
import React, { useState } from 'react'

import axios from 'axios'

import Schedule from 'react-schedule-job'
import 'react-schedule-job/dist/index.css'

import { HOME_PATH } from '..'

import { PageHeadline } from '../../headline'
import { dataTest } from '../../dataTest'
import {
    useCreateGoDataServerConfigConstantMutation,
    useReadMappingConfigConstantsQueryForConfig,
    useUpdateGoDataServerConfigConstantMutation,
} from '../../constants'
import i18n from '../../locales'
import styles from './ScheduleTaskForm.module.css'
import { getValue } from '../../utils/dataStore'

export const SCHEDULED_TASK_FORM_PATH = '/scheduled_task'
export const SCHEDULED_TASK_FORM_LABEL = 'Scheduled Task'

const { code } = 'godataserverconf'


export const ScheduleTaskForm = () => {
    const history = useHistory()

    const { loading, error: loadError, data: jsonData } = useReadMappingConfigConstantsQueryForConfig(
        code
    )

    const data = 

    jsonData && jsonData.constants.constants.length >0
    ? JSON.parse(jsonData.constants.constants[0].description)
            : {}
    const  queryGoData = async () => {
                const email = await getValue("godatauser")
                const pass  = await getValue("godatauserpass")
                axios.post("http://localhost:8000/api/users/login", {
                  email: email,
                  password: pass,
                }
                )
                .then(response => {
                  //const data = response.data.results;
                  //this.setState({ data });
                  axios
                  .get("http://localhost:8000/api/locations", {
                    headers : {
                        Authorization: response.data.id,
                      }
                  }, 
                  
                  ).then(response => {
                   // Editor.set(response.data)  
                      //console.log(response.data)
                  })
                })
                .catch(error => {
                  console.log(error);
                });
                }

                //Scheduler START
                const [open, setOpen] = React.useState(false)
                  
                  const HelloMsg = () => {
                    return <h1 style={styles.text}>Hello! {Date.now()} </h1>
                  }

                  const sayHello = () => {
                    console.log(Date.now())
                    setOpen(true)
                  }

                   // this is the function which will run according to your settings

  const jobs = [
    {
      fn: sayHello,
      id: '1',
      schedule: '* * * * *',
      name: 'Print Hello'
      // this runs every minutes
    },
    {
      fn: queryGoData,
      id: '1',
      schedule: '* * * * *',
      // this runs every minutes
      name: 'Call Go.Data'
    }
  ]
//Scheduler END

    const [
        saveGoDataServerConfigConstant,
        { saveError: saveGoDataServerConfigConstantError },
    ] = useCreateGoDataServerConfigConstantMutation()

    const saveError = saveGoDataServerConfigConstantError 

    const [
        updateGoDataServerConfigConstant,
        { updateError: updateGoDataServerConfigConstantError },
    ] = useUpdateGoDataServerConfigConstantMutation()

    const updateError = updateGoDataServerConfigConstantError

    if (saveError) {
        const msg = i18n.t('Something went wrong whilst saving configs')

        return (
            <div data-test={dataTest('views-gatewayconfigformnew')}>
                <PageHeadline>{i18n.t('Metadata Mapping')}</PageHeadline>
                <NoticeBox error title={msg}>
                    {error.message}
                </NoticeBox>
            </div>
        )
    }
        
    if (updateError) {
        const msg = i18n.t('Something went wrong whilst saving server configs')

        return (
            <div data-test={dataTest('views-gatewayconfigformnew')}>
                <PageHeadline>{i18n.t('Edit Server Config')}</PageHeadline>
                <NoticeBox error title={msg}>
                    {error.message}
                </NoticeBox>
            </div>
        )
    }

    const onSubmit = async values => {
        try {

            if(exists){
                values.id=jsonData.constant.constants[0].id
                await updateGoDataServerConfigConstant(values)
            }else{
                await saveGoDataServerConfigConstant(values)
            }
            
            history.push(HOME_PATH)
        } catch (e) {
            return Promise.reject(e)
        }
    }

    const onCancelClick = () => history.push(HOME_PATH)

    const handleChange = () => console.log('dfsfgsdfgsdf')

    

    return (
        <div
            data-test={dataTest('views-gatewayconfigformnew')}
            className={styles.container}
        >
            <PageHeadline>{i18n.t('Configure Go.Data server')}</PageHeadline>

            <Schedule
        jobs={jobs}
        timeZone='UTC'
        // "UTC", "local" or "YOUR PREFERRED TIMEZONE",
        dashboard={{
          hidden: false
          // if true, dashboard is hidden
        }}
      />
      {open && <HelloMsg />}

            <Button onClick={() => onCancelClick()}>
                            {i18n.t('Cancel')}
            </Button>

            <Button onClick={() => queryGoData()}>
                            {i18n.t('GET')}
            </Button>
            
        </div>
    )
}
