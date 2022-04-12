import { CenteredContent, CircularLoader, NoticeBox } from '@dhis2/ui'
import { useHistory } from 'react-router-dom'
import React, { useState, useEffect, useCallback } from 'react'
import { useConfig } from '@dhis2/app-runtime'

import { HOME_PATH } from '..'

import { FormRow } from '../../forms'
import { PageHeadline } from '../../headline'
import { dataTest } from '../../dataTest'
import { GoDataServerConfigForm } from '../../constants'
import i18n from '../../locales'
import styles from './DhisConfigForm.module.css'
import * as userDataStore from '../../utils/userDataStore.js'

export const DHIS_CONFIG_FORM_PATH = '/dhis-config'
export const DHIS_CONFIG_FORM_LABEL = 'DHIS2 Server Credentials'

export const DhisConfigForm = () => {
    const history = useHistory()
    const config = useConfig()
    const [initialValues, setInitialValues] = useState({})
    const [loading, setLoading] = useState(true)

    const processAll = useCallback(async () => {
        const username = await userDataStore
            .getValueUserDataStore('dhisuser')
            .catch(console.error)
        const password = await userDataStore
            .getValueUserDataStore('dhisuserpass')
            .catch(console.error)
        setInitialValues({
            urlTemplate: config.baseUrl,
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
            .setKeyValueUserDataStore('dhisuser', values.username)
            .catch(console.error)
        await userDataStore
            .setKeyValueUserDataStore('dhisuserpass', values.password)
            .catch(console.error)
        await userDataStore
            .setKeyValueUserDataStore('dhisbaseurl', values.urlTemplate)
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
    return (
        <>
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        </>
    )
}
