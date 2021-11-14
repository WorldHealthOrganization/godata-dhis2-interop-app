import { useHistory, useParams } from 'react-router-dom'
import { NoticeBox, CenteredContent, CircularLoader } from '@dhis2/ui'
import React, { useState } from 'react'

import { METADATA_CONFIG_LIST_PATH } from './MetadataConfigList'
import {
    GODATA_OUTBREAK,
    GODATA_CASE,
    GODATA_CONTACT,
    GODATA_CONTACT_OF_CONTACT,
    GODATA_ORG_UNIT,
    FIELD_GATEWAY_PASSWORD_CONFIRMATION_NAME,
    FIELD_GATEWAY_PASSWORD_NAME,
    GatewayBulkSMSForm,
    GatewayClickatellForm,
    GatewayGenericForm,
    useReadGatewayQuery,
    useUpdateGenericGatewayMutation,
    useUpdateBulkSMSGatewayMutation,
    useUpdateClickatellGatewayMutation,
} from '../../gateways'
import { CancelDialog } from '../../cancelDialog'
import { PageHeadline } from '../../headline'
import { dataTest } from '../../dataTest'
import i18n from '../../locales'
import styles from './MetadataConfigFormEdit.module.css'

export const METADATA_CONFIG_FORM_EDIT_PATH_STATIC = '/metadata/edit'
export const METADATA_CONFIG_FORM_EDIT_PATH = `${METADATA_CONFIG_FORM_EDIT_PATH_STATIC}/:id`

const getFormComponent = gatewayType => {
    if (gatewayType === GODATA_OUTBREAK) {
        return GatewayGenericForm
    }

    if (gatewayType === GODATA_CASE) {
        return GatewayBulkSMSForm
    }

    if (gatewayType === GODATA_CONTACT) {
        return GatewayClickatellForm
    }

    throw new Error(`The gateway type does not exist, got "${gatewayType}"`)
}

const getInitialValues = gateway => {
    if (gateway.type === GODATA_CASE) {
        return {
            ...gateway,
            [FIELD_GATEWAY_PASSWORD_CONFIRMATION_NAME]:
                gateway[FIELD_GATEWAY_PASSWORD_NAME],
        }
    }

    return gateway
}

export const MetadataConfigFormEdit = () => {
    const history = useHistory()
    const { id } = useParams()
    const [showCancelDialog, setShowCancelDialog] = useState(false)

    const { loading, error: loadError, data: jsonData } = useReadGatewayQuery(
        id
    )

    const [
        saveGenericGateway,
        { error: saveGenericGatewayError },
    ] = useUpdateGenericGatewayMutation()

    const [
        saveBulkSMSGateway,
        { error: saveBulkSMSGatewayError },
    ] = useUpdateBulkSMSGatewayMutation()

    const [
        saveClickatellGateway,
        { error: saveClickatellGatewayError },
    ] = useUpdateClickatellGatewayMutation()

    const saveError =
        saveGenericGatewayError ||
        saveBulkSMSGatewayError ||
        saveClickatellGatewayError

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
        const msg = i18n.t('Something went wrong whilst loading gateways')

        return (
            <>
                <PageHeadline>{i18n.t('Edit')}</PageHeadline>
                <NoticeBox error title={msg}>
                    {loadError.message}
                </NoticeBox>
            </>
        )
    }

    const data =
        /**
         * @TODO:
         *   * The response does not contain the right content type header
         *     -> https://jira.dhis2.org/browse/DHIS2-9252
         */
        jsonData && typeof jsonData.gateway === 'string'
            ? { gateway: JSON.parse(jsonData.gateway) }
            : jsonData

    const gatewayType = data?.gateway?.type
    const onSubmit = async formValues => {
        const values = { ...formValues, id: data.gateway.uid }

        try {
            if (values.type === GODATA_OUTBREAK) {
                await saveGenericGateway(values)
            }

            if (values.type === GODATA_CASE) {
                await saveBulkSMSGateway(values)
            }

            if (values.type === GODATA_CONTACT) {
                await saveClickatellGateway(values)
            }

            history.push(METADATA_CONFIG_LIST_PATH)
        } catch (e) {
            return Promise.reject(e)
        }
    }

    const FormComponent = getFormComponent(gatewayType)
    const initialValues = gatewayType && getInitialValues(data.gateway)

    return (
        <div
            data-test={dataTest('views-gatewayconfigformedit')}
            className={styles.container}
        >
            <PageHeadline>{i18n.t('Edit gateway')}</PageHeadline>

            {gatewayType ? (
                <div
                    data-test={dataTest(
                        'views-gatewayconfigformedit-formcontainer'
                    )}
                    data-gateway-id={data.gateway.uid}
                >
                    {saveError && (
                        <NoticeBox
                            error
                            title={i18n.t(
                                'Something went wrong whilst saving gateways'
                            )}
                        >
                            {saveError.message}
                        </NoticeBox>
                    )}

                    <FormComponent
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        onCancelClick={pristine =>
                            pristine
                                ? history.push(METADATA_CONFIG_LIST_PATH)
                                : setShowCancelDialog(true)
                        }
                    />
                </div>
            ) : (
                <NoticeBox error title={i18n.t('Gateway not found')}>
                    {i18n.t('The requested gateway could not be loaded')}
                </NoticeBox>
            )}

            {showCancelDialog && (
                <CancelDialog
                    onConfirmCancel={() =>
                        history.push(METADATA_CONFIG_LIST_PATH)
                    }
                    onAbortCancel={() => setShowCancelDialog(false)}
                />
            )}
        </div>
    )
}
