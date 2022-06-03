import { CenteredContent, CircularLoader, NoticeBox } from '@dhis2/ui'
import { useHistory } from 'react-router-dom'
import React, { useState, useEffect, useCallback } from 'react'

import { HOME_PATH } from '..'

import { FormRow } from '../../forms'
import { PageHeadline } from '../../headline'
import { dataTest } from '../../dataTest'
import { GoDataServerConfigForm } from '../../constants'
import i18n from '../../locales'
import styles from './DhisConfigForm.module.css'
import * as userDataStore from '../../utils/userDataStore.js'
import { useCredentials } from '../../constants/helpers/index.js'

export const DHIS_CONFIG_FORM_PATH = '/dhis-config'
export const DHIS_CONFIG_FORM_LABEL = 'DHIS2 Server Credentials'

export const DhisConfigForm = () => {
    const history = useHistory()

    const { loading, credentials } = useCredentials()

    const [submitting, setSubmitting] = useState(false)
    const [initialValues, setInitialValues] = useState({})

    const onSubmit = values => {
        console.log({ values })
        setSubmitting(true)
        userDataStore
            .setKeyValueUserDataStore('dhis2', values)
            .then(() => {
                setInitialValues(values)
                setSubmitting(false)
            })
            .catch(console.error)
    }

    useEffect(() => {
        if (!!credentials?.dhis2)
            setInitialValues({
                url: credentials.dhis2.url ?? '',
                username: credentials.dhis2.username ?? '',
                password: credentials.dhis2.password ?? '',
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
            <PageHeadline>{i18n.t('Configure DHIS2 server')}</PageHeadline>
            <FormRow>
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
