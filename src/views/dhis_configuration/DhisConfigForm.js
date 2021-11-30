import { CenteredContent, CircularLoader, NoticeBox } from '@dhis2/ui'
import { useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

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
    const { code } = 'dhis2serverconf'
    //const [id, setId] = useState('')
var id, exists
const { loading, data, error  } = useReadConstantsQueryForDhisConfig()


        const loginDetails = 
        data && data.constants.constants.length >0
        ? JSON.parse(data.constants.constants[0].description)
                : {}



     id = data?.constants?.constants[0]?.id
     console.log('id id ' + id)

     exists = 
id===undefined
? false : true
console.log('exists assign ' + exists)

     var vals = loginDetails
     id!=='undefined'
     ?vals.id = id
     :''
     
     const initialValues = vals


    const [saveDhisServerConfigConstant] = useCreateDhisServerConfigConstantMutation()
    const [updateDhisServerConfigConstant] = useUpdateDhisServerConfigConstantMutation()


    const onSubmit = async values => {
        try {

            if(exists){
                console.log('exists onsubmit ' + exists)
                //setId(jsonData.constants.constants[0].id)
                console.log('id : ' + id)
                await updateDhisServerConfigConstant(values, id)
            }else{
                console.log('hre ')
                await saveDhisServerConfigConstant(values)
            }
            
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
