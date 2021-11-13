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
import { META_DATA_MAPPING_LIST_PATH } from './MetaDataMappingList'
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
import styles from './MetaDataMappingFormEdit.module.css'

export const META_DATA_MAPPING_FORM_EDIT_PATH_STATIC = '/meta-data-config/edit'
export const META_DATA_MAPPING_FORM_EDIT_PATH = `${META_DATA_MAPPING_FORM_EDIT_PATH_STATIC}/:id`

const getMetaMappingEditFormComponent = parserType => {

        return MappingEditProgramStageDataEntryParserForm
 
}

export const MetaDataMappingFormEdit = () => {
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
        const msg = i18n.t('Something went wrong whilst loading mapping')

        return (
            <NoticeBox error title={msg}>
                {error.message}
            </NoticeBox>
        )
    }

    const parserType = data?.metaMapping[FIELD_COMMAND_PARSER_NAME]
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
                    onConfirmCancel={() => history.push(META_DATA_MAPPING_LIST_PATH)}
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
