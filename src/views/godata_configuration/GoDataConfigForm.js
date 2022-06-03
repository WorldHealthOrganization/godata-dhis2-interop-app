import { CenteredContent, CircularLoader, NoticeBox } from '@dhis2/ui'
import { useHistory } from 'react-router-dom'
import React, { useState, useEffect, useCallback } from 'react'

import { HOME_PATH } from '..'

import { FormRow } from '../../forms'
import { PageHeadline } from '../../headline'
import { dataTest } from '../../dataTest'
import { GoDataServerConfigForm } from '../../constants'
import i18n from '../../locales'
import styles from './GoDataConfigForm.module.css'
import * as userDataStore from '../../utils/userDataStore.js'
import { useCredentials } from '../../constants/helpers/index.js'

export const GODATA_CONFIG_FORM_PATH = '/godata-config'
export const GODATA_CONFIG_FORM_LABEL = 'Go.Data Server Credentials'

export const GoDataConfigForm = () => {
    const history = useHistory()

    const { loading, credentials } = useCredentials()

    const [submitting, setSubmitting] = useState(false)
    const [initialValues, setInitialValues] = useState({})

    const onSubmit = values => {
        console.log({ values })
        setSubmitting(true)
        userDataStore
            .setKeyValueUserDataStore('godata', values)
            .then(() => {
                setInitialValues(values)
                setSubmitting(false)
            })
            .catch(console.error)
    }

    useEffect(() => {
        if (!!credentials?.godata)
            setInitialValues({
                url: credentials.godata.url ?? '',
                username: credentials.godata.username ?? '',
                password: credentials.godata.password ?? '',
            })
    }, [credentials])

    if (loading || submitting)
        return (
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        )

    console.log({ credentials })

    return (
        <div
            data-test={dataTest('views-gatewayconfigformnew')}
            className={styles.container}
        >
            <PageHeadline>{i18n.t('Configure Go.Data server')}</PageHeadline>
            <FormRow>
                {console.log({
                    url: credentials.godata.url ?? '',
                    username: credentials.godata.username ?? '',
                    password: credentials.godata.password ?? '',
                })}
                <GoDataServerConfigForm
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    passwordRequired={true}
                    onCancelClick={() => history.push(HOME_PATH)}
                />
            </FormRow>
        </div>
    )
}
