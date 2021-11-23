import { NoticeBox } from '@dhis2/ui'
import { useHistory } from 'react-router-dom'
import React from 'react'

import { INTEROP_LIST_PATH } from './InteropList'

import { FormRow } from '../../forms'
import { PageHeadline } from '../../headline'
import { dataTest } from '../../dataTest'
import {
    useCreateClickatellGatewayMutation,
    useCreateGenericGatewayMutation,
} from '../../gateways'
import {
    useCreateTaskConstantMutation,
} from '../../constants'
import {
    InteropForm,
} from '../../constants'
import i18n from '../../locales'
import styles from './InteropFormNew.module.css'

export const INTEROP_FORM_NEW_PATH = '/interop/new'

export const InteropFormNew = () => {
    const history = useHistory()

    const [
        saveCasesConstant,
        { error: saveCasesConstantError },
    ] = useCreateTaskConstantMutation()

    const error = saveCasesConstantError

    if (error) {
        const msg = i18n.t('Something went wrong whilst saving the gateway')

        return (
            <div data-test={dataTest('views-gatewayconfigformnew')}>
                <PageHeadline>{i18n.t('Add constant')}</PageHeadline>
                <NoticeBox error title={msg}>
                    {error.message}
                </NoticeBox>
            </div>
        )
    }

    const onSubmit = async values => {
        try {
            if (visibleForm === GODATA_CASE) {
                await saveCasesConstant(values)
            }

            history.push(INTEROP_LIST_PATH)
        } catch (e) {
            return Promise.reject(e)
        }
    }

    const onCancelClick = () => history.push(INTEROP_LIST_PATH)

    return (
        <div
            data-test={dataTest('views-gatewayconfigformnew')}
            className={styles.container}
        >
            <PageHeadline>{i18n.t('Add task')}</PageHeadline>


            <FormRow>
                    <InteropForm
                        onSubmit={onSubmit}
                        passwordRequired={true}
                        onCancelClick={onCancelClick}
                    />
            </FormRow>
        </div>
    )
}
