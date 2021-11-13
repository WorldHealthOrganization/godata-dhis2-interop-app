import { NoticeBox, CenteredContent, CircularLoader } from '@dhis2/ui'
import { useHistory, useParams } from 'react-router-dom'
import React, { useState } from 'react'

import {
    ALERT_PARSER,
    EVENT_REGISTRATION_PARSER,
    J2ME_PARSER,
    KEY_VALUE_PARSER,
    PROGRAM_STAGE_DATAENTRY_PARSER,
    TRACKED_ENTITY_REGISTRATION_PARSER,
    UNREGISTERED_PARSER,
    FIELD_COMMAND_PARSER_NAME,
} from '../../metaMappingFields'
import { META_MAPPING_LIST_PATH } from './MetaMappingList'
import { CancelDialog } from '../../cancelDialog'
import { MappingEditUnregisteredParserForm } from '../../metaMappingUnregisteredParser'
import { MappingEditTrackedEntityRegistrationParserForm } from '../../metaMappingTrackedEntityRegistrationParser'
import { MappingEditProgramStageDataEntryParserForm } from '../../metaMappingProgramStageDataEntryParser'
import { MappingEditKeyValueParserForm } from '../../metaMappingKeyValueParser'
import { MappingEditJ2MEParserForm } from '../../metaMappingJ2MEParser'
import { MappingEditEventRegistrationParserForm } from '../../metaMappingEventRegistrationParser'
import { MappingEditAlertParserForm } from '../../metaMappingAlertParser'
import { PageHeadline } from '../../headline'
import { dataTest } from '../../dataTest'
import {
    isParserType,
    useReadMetaMappingParserTypeQuery,
} from '../../metaMapping'
import i18n from '../../locales'
import styles from './MetaMappingFormEdit.module.css'

export const META_MAPPING_FORM_EDIT_PATH_STATIC = '/sms-config/edit'
export const META_MAPPING_FORM_EDIT_PATH = `${META_MAPPING_FORM_EDIT_PATH_STATIC}/:id`

const getMetaMappingEditFormComponent = parserType => {
    const isParser = isParserType.bind(null, parserType)

    if (parserType && isParser(KEY_VALUE_PARSER)) {
        return MappingEditKeyValueParserForm
    }

    if (parserType && isParser(J2ME_PARSER)) {
        return MappingEditJ2MEParserForm
    }

    if (parserType && isParser(ALERT_PARSER)) {
        return MappingEditAlertParserForm
    }

    if (parserType && isParser(PROGRAM_STAGE_DATAENTRY_PARSER)) {
        return MappingEditProgramStageDataEntryParserForm
    }

    if (parserType && isParser(UNREGISTERED_PARSER)) {
        return MappingEditUnregisteredParserForm
    }

    if (parserType && isParser(EVENT_REGISTRATION_PARSER)) {
        return MappingEditEventRegistrationParserForm
    }

    if (parserType && isParser(TRACKED_ENTITY_REGISTRATION_PARSER)) {
        return MappingEditTrackedEntityRegistrationParserForm
    }

    return null
}

export const MetaMappingFormEdit = () => {
    const history = useHistory()
    const { id } = useParams()
    const { loading, error, data } = useReadMetaMappingParserTypeQuery(id)
    const [showCancelDialog, setShowCancelDialog] = useState(false)
    const onAfterChange = () => history.push(META_MAPPING_LIST_PATH)
    const onCancel = pristine =>
        pristine ? history.goBack() : setShowCancelDialog(true)

    if (loading) {
        return (
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        )
    }

    if (error) {
        const msg = i18n.t('Something went wrong whilst loading commands')

        return (
            <NoticeBox error title={msg}>
                {error.message}
            </NoticeBox>
        )
    }

    const parserType = data?.smsCommand[FIELD_COMMAND_PARSER_NAME]
    const FormComponent = getMetaMappingEditFormComponent(parserType)

    return (
        <div
            className={styles.container}
            data-test={dataTest('views-smscommandformedit')}
        >
            <PageHeadline>{i18n.t('Edit mapping')}</PageHeadline>

            {FormComponent && (
                <FormComponent
                    commandId={id}
                    onCancel={onCancel}
                    onAfterChange={onAfterChange}
                />
            )}

            {showCancelDialog && (
                <CancelDialog
                    onConfirmCancel={() => history.push(META_MAPPING_LIST_PATH)}
                    onAbortCancel={() => setShowCancelDialog(false)}
                />
            )}

            {!parserType && (
                <NoticeBox error title={i18n.t('Unrecognised parser type')}>
                    {i18n.t('Could not find the requested parser type')}
                </NoticeBox>
            )}
        </div>
    )
}
