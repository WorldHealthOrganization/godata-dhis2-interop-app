import { ReactFinalForm, NoticeBox } from '@dhis2/ui'
import { useHistory } from 'react-router-dom'
import React from 'react'

import { INTEROP_LIST_PATH } from './InteropList'

import { FormRow } from '../../forms'
import { PageHeadline } from '../../headline'
import { dataTest } from '../../dataTest'
import {
    InteropForm,
} from '../../constants'
import i18n from '../../locales'
import styles from './InteropFormNew.module.css'

const { Form, useForm } = ReactFinalForm

export const INTEROP_FORM_NEW_PATH = '/interop/new'

export const InteropFormNew = () => {
    const history = useHistory()

    const onSubmit = values => {history.push(INTEROP_LIST_PATH)}

    const onCancelClick = () => history.push(INTEROP_LIST_PATH)

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
                        onCancelClick={onCancelClick}
                    />
                    )}
            </Form>
        </div>
    )
}
