import { ReactFinalForm, NoticeBox, CenteredContent, CircularLoader } from '@dhis2/ui'
import { useHistory, useParams } from 'react-router-dom'
import React, { useState } from 'react'

import { INTEROP_LIST_PATH } from './InteropList'

import { FormRow } from '../../forms'
import { PageHeadline } from '../../headline'
import { dataTest } from '../../dataTest'
import {
    InteropForm,
    useReadTaskConstantsQueryById,
} from '../../constants'
import i18n from '../../locales'
import styles from './InteropFormNew.module.css'

const { Form, useForm } = ReactFinalForm

export const INTEROP_RUN_TASK_FORM_PATH_STATIC = '/interop/run'
export const INTEROP_RUN_TASK_FORM_PATH = `${INTEROP_RUN_TASK_FORM_PATH_STATIC}/:id`

export const InteropRunTaskForm = () => {
    const history = useHistory()
    const { id } = useParams()
    const [showCancelDialog, setShowCancelDialog] = useState(false)
    const onCancel = pristine =>
        pristine ? history.goBack() : setShowCancelDialog(true)

    const { loading, error: loadError, data: jsonData } = useReadTaskConstantsQueryById(
        id
    )
    
    const taskConfig =
    jsonData
        ? JSON.parse(jsonData.constant.description)
        : {}
    console.log('taskConfig ' + JSON.stringify(taskConfig))

    if (loading) {
        return (
            <>
                <PageHeadline>{i18n.t('Edit')}</PageHeadline>
                <CenteredContent>
                    <CircularLoader />
                </CenteredContent>
            </>
        )
    }

    if (loadError) {
        const msg = i18n.t('Something went wrong whilst loading constants')

        return (
            <>
                <PageHeadline>{i18n.t('Edit')}</PageHeadline>
                <NoticeBox error title={msg}>
                    {loadError.message}
                </NoticeBox>
            </>
        )
    }

    const onSubmit = values => {history.push(INTEROP_LIST_PATH)}

    return (
        <div
            data-test={dataTest('views-gatewayconfigformnew')}
            className={styles.container}
        >
            <Form destroyOnUnregister onSubmit={onSubmit}>
            {({ handleSubmit }) => (
                    <InteropForm
                    initialValues={''}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                        onCancelClick={onCancel}
                    />
                    )}
            </Form>
        </div>
    )
}
