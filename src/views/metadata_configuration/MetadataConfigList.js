import { useHistory } from 'react-router-dom'
import React, { useState } from 'react'
import { NoticeBox, CenteredContent, CircularLoader } from '@dhis2/ui'

import { METADATA_CONFIG_FORM_NEW_PATH } from './MetadataConfigFormNew'

import {
    useSetDefaultConstantMutation,
    useDeleteConstantsMutation,
    DeleteConstantsConfirmationDialog,
    ConstantList,
    useReadMappingConfigConstantsQueryByCode
} from '../../constants'
import { ListActions } from '../../dataList'
import { PageHeadline } from '../../headline'
import { Paragraph } from '../../text'
import { dataTest } from '../../dataTest'
import i18n from '../../locales'
import styles from './MetadataConfigList.module.css'

export const METADATA_CONFIG_LIST_PATH = '/metadata'
export const METADATA_CONFIG_LIST_LABEL = 'Metadata configuration'

export const MetadataConfigList = () => {
    const history = useHistory()
    const onAddConstantClick = () => history.push(METADATA_CONFIG_FORM_NEW_PATH)
    const [checkedConstants, setCheckedConstants] = useState([])
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    const {
        loading: loadingReadConstants,
        error: errorReadConstants,
        data,
        refetch: refetchReadConstants,
    } = useReadMappingConfigConstantsQueryByCode()

    const [
        deleteCheckedConstants,
        { loading: loadingDelete, error: errorDelete },
    ] = useDeleteConstantsMutation()

    const [
        makeConstantDefault,
        { loading: loadingSetDefault, error: errorSetDefault },
    ] = useSetDefaultConstantMutation()

    const onDeleteClick = () => {
        const variables = { ids: checkedConstants }
        deleteCheckedConstants(variables).then(refetchReadConstants)
        setShowDeleteDialog(false)
    }

    const onMakeDefaultClick = id => {
        const variables = { id }
        makeConstantDefault(variables).then(refetchReadConstants)
    }

    const loading = loadingReadConstants || loadingDelete || loadingSetDefault

    if (loading) {
        return (
            <>
                <PageHeadline>{METADATA_CONFIG_LIST_LABEL}</PageHeadline>
                <CenteredContent>
                    <CircularLoader />
                </CenteredContent>
            </>
        )
    }

    const error = errorReadConstants || errorDelete || errorSetDefault

    if (error) {
        const msg = i18n.t(
            'Something went wrong whilst performing the requested operation'
        )

        return (
            <>
                <PageHeadline>{METADATA_CONFIG_LIST_LABEL}</PageHeadline>
                <NoticeBox error title={msg}>
                    {error.message}
                </NoticeBox>
            </>
        )
    }

    const hasMappings = !!data?.constants?.constants?.length

    return (
        <div
            className={styles.container}
            data-test={dataTest('views-gatewayconfiglist')}
        >
            <PageHeadline>{METADATA_CONFIG_LIST_LABEL}</PageHeadline>

            <Paragraph>
                {i18n.t(
                    'Mapping are used to integrate GoData<->DHIS2 data sharing. Multiple mappings can be set up to process and handle data in multiple ways. Add and configure mappings below.'
                )}
            </Paragraph>

            <ListActions
                addLabel={i18n.t('Add mappings')}
                deleteLabel={i18n.t('Delete selected')}
                dataTest="views-gatewayconfiglist"
                onAddClick={onAddConstantClick}
                onDeleteClick={() => setShowDeleteDialog(true)}
                disableAdd={loadingDelete}
                disableDelete={!checkedConstants.length || loadingDelete}
            />

            {hasMappings ? (
                <ConstantList
                    processing={loading}
                    checkedConstants={checkedConstants}
                    setCheckedConstants={setCheckedConstants}
                    constants={data.constants.constants}
                    onMakeDefaultClick={onMakeDefaultClick}
                />
            ) : (
                <NoticeBox info title={i18n.t('No mappings found')}>
                    {i18n.t(
                        "It looks like there aren't any configured metadta, or they couldn't be loaded."
                    )}
                </NoticeBox>
            )}

            {showDeleteDialog && (
                <DeleteConstantsConfirmationDialog
                    onCancelClick={() => setShowDeleteDialog(false)}
                    onDeleteClick={onDeleteClick}
                />
            )}
        </div>
    )
}
