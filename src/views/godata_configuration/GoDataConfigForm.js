import { CenteredContent, CircularLoader, NoticeBox } from '@dhis2/ui'
import { useHistory } from 'react-router-dom'
import React, { useState, useEffect, useCallback } from 'react'

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
import * as userDataStore from '../../utils/userDataStore.js'

export const GODATA_CONFIG_FORM_PATH = '/godata-config'
export const GODATA_CONFIG_FORM_LABEL = 'Go.Data Server Credentials'

export const GoDataConfigForm = () => {
    const history = useHistory()

    const [initialValues, setInitialValues] = useState({})
    const [loading, setLoading] = useState(true)

    const processAll = useCallback(async () => {
        const username = await userDataStore
            .getValueUserDataStore('godatauser')
            .catch(console.error)
        const password = await userDataStore
            .getValueUserDataStore('godatauserpass')
            .catch(console.error)
        const url = await userDataStore
            .getValueUserDataStore('godatabaseurl')
            .catch(console.error)
        setInitialValues({
            urlTemplate: Object.keys(url).length !== 0 ? url : '',
            username: Object.keys(username).length !== 0 ? username : '',
            password: Object.keys(password).length !== 0 ? password : '',
        })
        setLoading(false)
    })

    useEffect(() => {
        processAll()
    }, [])

    const onSubmit = async values => {
        console.log({ values })
        await userDataStore
            .setKeyValueUserDataStore('godatauser', values.username)
            .catch(console.error)
        await userDataStore
            .setKeyValueUserDataStore('godatauserpass', values.password)
            .catch(console.error)
        await userDataStore
            .setKeyValueUserDataStore('godatabaseurl', values.urlTemplate)
            .catch(console.error)

        history.push(HOME_PATH)
    }

    if (loading)
        return (
            <>
                <CenteredContent>
                    <CircularLoader />
                </CenteredContent>
            </>
        )
    const onCancelClick = () => history.push(HOME_PATH)
    if (!!initialValues)
        return (
            <div
                data-test={dataTest('views-gatewayconfigformnew')}
                className={styles.container}
            >
                <PageHeadline>
                    {i18n.t('Configure Go.Data server')}
                </PageHeadline>
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
    return (
        <>
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        </>
    )
}
