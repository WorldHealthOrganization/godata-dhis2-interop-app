import { CenteredContent, CircularLoader, NoticeBox } from '@dhis2/ui'
import { useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

import { useConfig } from '@dhis2/app-runtime'
import api from '../../utils/api'

import { HOME_PATH } from '..'

import { FormRow } from '../../forms'
import { PageHeadline } from '../../headline'
import { dataTest } from '../../dataTest'
import {
    GoDataServerConfigForm,
    useCreateDhisServerConfigConstantMutation,
    useReadConstantsQueryForDhisConfig,
    useUpdateDhisServerConfigConstantMutation,
} from '../../constants'
import i18n from '../../locales'
import styles from './DhisConfigForm.module.css'

export const DHIS_CONFIG_FORM_PATH = '/dhis-config'
export const DHIS_CONFIG_FORM_LABEL = 'DHIS2 Server Credentials'

export const DhisConfigForm = () => {
    const history = useHistory()
var id, exists, initialValues;

const [dhisUser, setDhisUser] = useState()
const [dhisUserPass, setDhisUserPass] = useState()

const config = useConfig()
console.log(JSON.stringify(config.baseUrl))


api.getValue('dhis2-godata-interop-configuration', 'dhisuser').then(response => {
    setDhisUser(response.value)
    console.log('dhisuser ' + JSON.stringify(response.value));
}).catch(e => {
    setDhisUser('')
    api.createValue('dhis2-godata-interop-configuration', 'dhisuser', '')
    console.log(e);
});


api.getValue('dhis2-godata-interop-configuration', 'dhisuserpass').then(response => {
    setDhisUserPass(response.value)
    console.log('dhisuser pass ' + JSON.stringify(response.value));
}).catch(e => {
    setDhisUserPass('')
    api.createValue('dhis2-godata-interop-configuration', 'dhisuserpass', '')
    console.log(e);
});


let dhisBaseUrl = config.baseUrl


initialValues = {urlTemplate: dhisBaseUrl,
    'username': dhisUser, 
    'password': dhisUserPass}
console.log('initialValues ' + JSON.stringify(initialValues))

    const onSubmit = async values => {
        try {

//            api.createValue('dhis2-godata-interop-configuration', 'dhisuserpass', values.urlTemplate)
console.log('values.username ' + values.username)

api.createValue('dhis2-godata-interop-configuration', 'dhisuser', values.username).then(response => {
                console.log('dhisuser ' + JSON.stringify(response.value));
            }).catch(e => {
api.updateValue('dhis2-godata-interop-configuration', 'dhisuser', values.username)
                //console.log(e);
            });

api.createValue('dhis2-godata-interop-configuration', 'dhisuserpass', values.password).then(response => {
                console.log('dhisuser pass ' + JSON.stringify(response.value));
            }).catch(e => {
api.updateValue('dhis2-godata-interop-configuration', 'dhisuserpass', values.password)
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
            <PageHeadline>{i18n.t('Configure DHIS2 server')}</PageHeadline>

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
