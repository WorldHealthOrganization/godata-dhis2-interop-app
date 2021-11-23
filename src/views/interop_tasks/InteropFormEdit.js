import { NoticeBox, CenteredContent, CircularLoader } from '@dhis2/ui'
import { useHistory, useParams } from 'react-router-dom'
import React, { useState } from 'react'

import { INTEROP_LIST_PATH } from './InteropList'

import { FormRow } from '../../forms'
import { PageHeadline } from '../../headline'
import { dataTest } from '../../dataTest'
import {
    InteropForm,
    useReadMappingConfigConstantsQueryById,
} from '../../constants'
import i18n from '../../locales'
import styles from './InteropFormEdit.module.css'

export const INTEROP_FORM_EDIT_PATH_STATIC = '/interop/edit'
export const INTEROP_FORM_EDIT_PATH = `${INTEROP_FORM_EDIT_PATH_STATIC}/:id`


const getInitialValues = jsonData => {
    return jsonData.constant
}

    const getFormComponent = selectedForm => {
            return InteropForm
    }


export const InteropFormEdit = () => {
    const history = useHistory()
    const { id } = useParams()
    const [showCancelDialog, setShowCancelDialog] = useState(false)
    const onCancel = pristine =>
        pristine ? history.goBack() : setShowCancelDialog(true)

    const { loading, error: loadError, data: jsonData } = useReadMappingConfigConstantsQueryById(
        id
    )
    
    const conversionType =
    jsonData
        ? JSON.parse(jsonData.constant.description)[0].godataValue[0][0].conversionType
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

    const FormComponent = getFormComponent(conversionType)
    const initialValues = conversionType && getInitialValues(jsonData)

    return (
        <div
            data-test={dataTest('views-constantconfigformnew')}
            className={styles.container}
        >
            <PageHeadline>{i18n.t('Add tasks')}</PageHeadline>
            
            <FormComponent
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        onCancelClick={pristine =>
                            pristine
                                ? history.push(INTEROP_LIST_PATH)
                                : setShowCancelDialog(true)
                        }
                    />
        </div>
    )
}
