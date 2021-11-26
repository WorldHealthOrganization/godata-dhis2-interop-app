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
import styles from './InteropFormEdit.module.css'

const { Form, useForm } = ReactFinalForm

export const INTEROP_FORM_EDIT_PATH_STATIC = '/interop/edit'
export const INTEROP_FORM_EDIT_PATH = `${INTEROP_FORM_EDIT_PATH_STATIC}/:id`


const getInitialValues = jsonData => {
    return jsonData.constant
}


export const InteropFormEdit = () => {
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

    const onSubmit = async values => {
        try {
            history.push(INTEROP_LIST_PATH)
        } catch (e) {
            return Promise.reject(e)
        }
    }

    const onCancelClick = () => history.push(INTEROP_LIST_PATH)

    //const FormComponent = getFormComponent(taskConfig)
    const initialValues = taskConfig && getInitialValues(jsonData)

    return (
        <div
            data-test={dataTest('views-constantconfigformnew')}
            className={styles.container}
        >
            <Form destroyOnUnregister onSubmit={onSubmit}>
            {({ handleSubmit }) => (
                    <InteropForm
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                    onCancelClick={onCancelClick}
                    />
                    )}
            </Form>
        </div>
    )
}
