import { Button, CenteredContent, CircularLoader, NoticeBox } from '@dhis2/ui'
import { useHistory } from 'react-router-dom'
import React, { useState } from 'react'

import axios from 'axios'

import { JsonEditor as Editor } from 'jsoneditor-react'
import 'jsoneditor-react/es/editor.min.css'

import { HOME_PATH } from '..'

import { PageHeadline } from '../../headline'
import { dataTest } from '../../dataTest'
import {
    useCreateGoDataServerConfigConstantMutation,
    useReadGoDataServerConfigConstantQueryByCode,
    useUpdateGoDataServerConfigConstantMutation,
} from '../../constants'
import i18n from '../../locales'
import styles from './GoDataCallForm.module.css'

export const GODATA_CALL_FORM_PATH = '/godata-call'
export const GODATA_CALL_FORM_LABEL = 'Go.Data call'

const { code } = 'godataserverconf'

export const GoDataCallForm = () => {
    const history = useHistory()

    const { loading, error: loadError, data: jsonData } = useReadGoDataServerConfigConstantQueryByCode(
        code
    )

    const data = 

    jsonData && jsonData.constant.constants.length >0
    ? JSON.parse(jsonData.constant.constants[0].description)
            : {}
    const  queryGoData = () => {
                axios
                .post("http://localhost:8000/api/users/login", {
                  email: 'admin@who.int',
                  password: 'Rabota@2021murod',
                }
                )
                .then(response => {
                    //https://godata-r5.who.int
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
                      console.log(response.data)
                  })
                })
                .catch(error => {
                  console.log(error);
                });
                }



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

            <Editor
            value={{}}
            onChange={handleChange}
            />

            <Button onClick={() => onCancelClick()}>
                            {i18n.t('Cancel')}
            </Button>

            <Button onClick={() => queryGoData()}>
                            {i18n.t('GET')}
            </Button>
            
        </div>
    )
}
