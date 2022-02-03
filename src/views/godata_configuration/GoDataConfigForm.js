import { CenteredContent, CircularLoader, NoticeBox } from '@dhis2/ui'
import { useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

import api from '../../utils/api'

import { HOME_PATH } from '..'

import { FormRow } from '../../forms'
import { PageHeadline } from '../../headline'
import { dataTest } from '../../dataTest'
import {
    GoDataServerConfigForm,
    useCreateGoDataServerConfigConstantMutation,
    useReadMappingConfigConstantsQueryForConfig,
    useUpdateGoDataServerConfigConstantMutation,
} from '../../constants'
import i18n from '../../locales'
import styles from './GoDataConfigForm.module.css'

export const GODATA_CONFIG_FORM_PATH = '/godata-config'
export const GODATA_CONFIG_FORM_LABEL = 'Go.Data Server Credentials'

export const GoDataConfigForm = () => {
    const history = useHistory()

    var id, exists, initialValues;
    const [godataUser, setGodataUser] = useState()
    const [godataUserPass, setGodataUserPass] = useState()
    const [godataUrl, setGodataUrl] = useState()
    
    
    api.getValue('dhis2-godata-interop-configuration', 'godatauser').then(response => {
        setGodataUser(response.value)
        console.log('godatauser ' + JSON.stringify(response.value));
    }).catch(e => {
        setGodataUser('')
        api.createValue('dhis2-godata-interop-configuration', 'godatauser', '')
        //console.log(e);
    });
    
    api.getValue('dhis2-godata-interop-configuration', 'godatauserpass').then(response => {
        setGodataUserPass(response.value)
        console.log('godatauser pass ' + JSON.stringify(response.value));
    }).catch(e => {
        setGodataUserPass('')
        api.createValue('dhis2-godata-interop-configuration', 'godatauserpass', '')
        //console.log(e);
    });
    
    api.getValue('dhis2-godata-interop-configuration', 'godatabaseurl').then(response => {
        setGodataUrl(response.value)
        console.log('godatabaseurl ' + JSON.stringify(response.value));
    }).catch(e => {
        setGodataUrl('')
        api.createValue('dhis2-godata-interop-configuration', 'godatabaseurl', '')
        //console.log(e);
    });    
    

    initialValues = {urlTemplate: godataUrl,
        'username': godataUser, 
        'password': godataUserPass}
    console.log('initialValues ' + JSON.stringify(initialValues))


    const onSubmit = async values => {
        try {

            console.log('values.username ' + values.username)

            api.createValue('dhis2-godata-interop-configuration', 'godatauser', values.username).then(response => {
                            console.log('godatauser ' + JSON.stringify(response.value));
                        }).catch(e => {
            api.updateValue('dhis2-godata-interop-configuration', 'godatauser', values.username)
                            //console.log(e);
                        });
            
            api.createValue('dhis2-godata-interop-configuration', 'godatauserpass', values.password).then(response => {
                            console.log('godatauser pass ' + JSON.stringify(response.value));
                        }).catch(e => {
            api.updateValue('dhis2-godata-interop-configuration', 'godatauserpass', values.password)
                            //console.log(e);
                        });
            
            api.createValue('dhis2-godata-interop-configuration', 'godatabaseurl', values.urlTemplate).then(response => {
                            console.log('godatabaseurl ' + JSON.stringify(response.value));
                        }).catch(e => {
            api.updateValue('dhis2-godata-interop-configuration', 'godatabaseurl', values.urlTemplate)
                            //console.log(e);
                        });                        
            
            history.push(HOME_PATH)
        } catch (e) {
            return Promise.reject(e)
        }
    }

    const onCancelClick = () => history.push(HOME_PATH)

    return (
        <div
            data-test={dataTest('views-gatewayconfigformnew')}
            className={styles.container}
        >
            <PageHeadline>{i18n.t('Configure Go.Data server')}</PageHeadline>

            <FormRow>

                    <GoDataServerConfigForm
                    initialValues={initialValues}
                        onSubmit={onSubmit}
                        passwordRequired={true}
                        onCancelClick={onCancelClick}
                    />

            </FormRow>

        </div>
    )
}
