import { SingleSelectField, SingleSelectOption, NoticeBox } from '@dhis2/ui'
import { useHistory } from 'react-router-dom'
import React, { useState } from 'react'

import { METADATA_CONFIG_LIST_PATH } from './MetadataConfigList'
import { GODATA_OUTBREAK, GODATA_CASE, GODATA_CONTACT, GODATA_CONTACT_OF_CONTACT, 
    GODATA_ORG_UNIT } from '../../gateways'
import { FormRow } from '../../forms'
import { PageHeadline } from '../../headline'
import { dataTest } from '../../dataTest'
import {
    useCreateClickatellGatewayMutation,
    useCreateGenericGatewayMutation,
} from '../../gateways'
import {
    useCreateCasesConstantMutation,
} from '../../constants'
import {
    LocationsForm,
    CasesForm,
    ContactsForm,
    ContactsOfContactForm,
    OutbreaksForm,
} from '../../constants'
import i18n from '../../locales'
import styles from './MetadataConfigFormNew.module.css'

export const METADATA_CONFIG_FORM_NEW_PATH = '/metadata/new'

export const MetadataConfigFormNew = () => {
    const history = useHistory()
    const [visibleForm, setVisibleForm] = useState(GODATA_OUTBREAK)

    const [
        saveGenericGateway,
        { error: saveGenericGatewayError },
    ] = useCreateGenericGatewayMutation()

    const [
        saveCasesConstant,
        { error: saveCasesConstantError },
    ] = useCreateCasesConstantMutation()

    const [
        saveClickatellGateway,
        { error: saveClickatellGatewayError },
    ] = useCreateClickatellGatewayMutation()

    const error =
        saveGenericGatewayError ||
        saveCasesConstantError ||
        saveClickatellGatewayError

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
            if (visibleForm === GODATA_OUTBREAK) {
                await saveGenericGateway(values)
            }

            if (visibleForm === GODATA_CASE) {
                await saveCasesConstant(values)
            }

            if (visibleForm === GODATA_CONTACT) {
                await saveClickatellGateway(values)
            }

            history.push(METADATA_CONFIG_LIST_PATH)
        } catch (e) {
            return Promise.reject(e)
        }
    }

    const onCancelClick = () => history.push(METADATA_CONFIG_LIST_PATH)

    return (
        <div
            data-test={dataTest('views-gatewayconfigformnew')}
            className={styles.container}
        >
            <PageHeadline>{i18n.t('Add mappings')}</PageHeadline>

            <FormRow>
                <SingleSelectField
                    label={i18n.t('Type')}
                    onChange={({ selected }) => setVisibleForm(selected)}
                    selected={visibleForm}
                    dataTest={dataTest(
                        'views-gatewayconfigformnew-gatewaytype'
                    )}
                >
                    <SingleSelectOption
                        value={GODATA_OUTBREAK}
                        label={i18n.t(GODATA_OUTBREAK)}
                    />

                    <SingleSelectOption
                        value={GODATA_CASE}
                        label={i18n.t(GODATA_CASE)}
                    />

                    <SingleSelectOption
                        value={GODATA_CONTACT}
                        label={i18n.t(GODATA_CONTACT)}
                    />

                    <SingleSelectOption
                        value={GODATA_CONTACT_OF_CONTACT}
                        label={i18n.t(GODATA_CONTACT_OF_CONTACT)}
                    />
                    
                    <SingleSelectOption
                        value={GODATA_ORG_UNIT}
                        label={i18n.t(GODATA_ORG_UNIT)}
                    />

                </SingleSelectField>
            </FormRow>

            <FormRow>
                {visibleForm === GODATA_OUTBREAK && (
                    <OutbreaksForm
                        onSubmit={onSubmit}
                        onCancelClick={onCancelClick}
                    />
                )}

                {visibleForm === GODATA_CASE && (
                    <CasesForm
                        onSubmit={onSubmit}
                        passwordRequired={true}
                        onCancelClick={onCancelClick}
                    />
                )}

                {visibleForm === GODATA_CONTACT && (
                    <ContactsForm
                        onSubmit={onSubmit}
                        passwordRequired={true}
                        onCancelClick={onCancelClick}
                    />
                )}
                
                {visibleForm === GODATA_CONTACT_OF_CONTACT && (
                    <ContactsOfContactForm
                        onSubmit={onSubmit}
                        passwordRequired={true}
                        onCancelClick={onCancelClick}
                    />
                )}
                
                {visibleForm === GODATA_ORG_UNIT && (
                    <LocationsForm
                        onSubmit={onSubmit}
                        passwordRequired={true}
                        onCancelClick={onCancelClick}
                    />
                )}
            </FormRow>
        </div>
    )
}
