import {
    Button,
    Checkbox,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableRowHead,
    TableCell,
    TableCellHead,
    NoticeBox,
    CenteredContent,
    CircularLoader,
} from '@dhis2/ui'
import { useHistory } from 'react-router-dom'
import React, { useState } from 'react'

import { META_DATA_MAPPING_FORM_EDIT_PATH_STATIC } from './MetaDataMappingFormEdit'
import { META_DATA_MAPPING_FORM_NEW_PATH } from './MetaDataMappingFormNew'
import { ListActions } from '../../dataList'
import { PageHeadline } from '../../headline'
import { Paragraph } from '../../text'
import {
    DeleteCommandsConfirmationDialog,
    getLabelByParserTypes,
    useDeleteMetaMappingMutation,
    useReadMetaMappingsQuery,
} from '../../metaMapping'
import { dataTest } from '../../dataTest'
import i18n from '../../locales'
import styles from './MetaDataMappingList.module.css'

export const META_DATA_MAPPING_LIST_LABEL = i18n.t('Metadata Mappings')
export const META_DATA_MAPPING_LIST_PATH = '/meta-data-config'

export const MetaDataMappingList = () => {
    const history = useHistory()
    const onAddMappingClick = () => history.push(META_DATA_MAPPING_FORM_NEW_PATH)
    const [checkedMetaMappings, setCheckedMetaMappings] = useState([])
    const [
        showDeleteConfirmationDialog,
        setShowDeleteConfirmationDialog,
    ] = useState(false)

    const {
        loading: loadingReadMetaMappings,
        error: errorReadMetaMappings,
        data,
        refetch,
    } = useReadMetaMappingsQuery()

    //console.log('data.metadataMappings ' + data.metadataMappings)

    const [
        deleteMetaMappings,
        { loading: loadingDelete, error: errorDelete },
    ] = useDeleteMetaMappingMutation()

    if (loadingReadMetaMappings) {
        return (
            <div data-test={dataTest('views-smscommandlist')}>
                <PageHeadline>{META_DATA_MAPPING_LIST_LABEL}</PageHeadline>
                <CenteredContent>
                    <CircularLoader />
                </CenteredContent>
            </div>
        )
    }

    const error = errorReadMetaMappings || errorDelete

    if (error) {
        const msg = i18n.t(
            'Something went wrong whilst performing the requested operation'
        )

        return (
            <div data-test={dataTest('views-smscommandlist')}>
                <PageHeadline>{META_DATA_MAPPING_LIST_LABEL}</PageHeadline>
                <NoticeBox error title={msg}>
                    {error.message}
                </NoticeBox>
            </div>
        )
    }

    const onToggleCallChange = () => {
        const metadataMappings = data?.metadataMappings?.metadataMappings

        if (!metadataMappings) {
            return
        }

        if (checkedMetaMappings.length === metadataMappings.length) {
            setCheckedMetaMappings([])
        } else {
            setCheckedMetaMappings(
                metadataMappings.map(({ id, displayName }) => ({ id, displayName }))
            )
        }
    }

    const toggleMetaMapping = metadataMapping => {
        const { id } = metadataMapping

        if (checkedMetaMappings.find(({ id: checkedId }) => id === checkedId)) {
            const index = checkedMetaMappings.findIndex(
                ({ id: checkedId }) => id === checkedId
            )

            return setCheckedMetaMappings([
                ...checkedMetaMappings.slice(0, index),
                ...checkedMetaMappings.slice(index + 1),
            ])
        }

        return setCheckedMetaMappings([...checkedMetaMappings, metadataMapping])
    }

    const onDeleteClick = async () => {
        const ids = checkedMetaMappings.map(({ id }) => id)
        await deleteMetaMappings({ ids })

        setCheckedMetaMappings([])
        setShowDeleteConfirmationDialog(false)
        refetch()
    }

    const allChecked =
        checkedMetaMappings.length === data?.metadataMappings?.constants?.length
    const hasMappings = data?.metadataMappings?.constants?.length > 0

    return (
        <div
            data-test={dataTest('views-smscommandlist')}
            className={styles.container}
        >
            <PageHeadline>{META_DATA_MAPPING_LIST_LABEL}</PageHeadline>
            <Paragraph>
                {i18n.t(
                    'Mapping are used to integrate GoData<->DHIS2 data sharing. Multiple mappings can be set up to process and handle data in multiple ways. Add and configure mappings below.'
                )}
            </Paragraph>

            <ListActions
                addLabel={i18n.t('Add mapping')}
                deleteLabel={i18n.t('Delete selected')}
                dataTest="views-smscommandlist"
                onAddClick={onAddMappingClick}
                onDeleteClick={() => setShowDeleteConfirmationDialog(true)}
                disableAdd={loadingDelete}
                disableDelete={!checkedMetaMappings.length || loadingDelete}
            />

            {showDeleteConfirmationDialog && (
                <DeleteCommandsConfirmationDialog
                    onCancelClick={() => setShowDeleteConfirmationDialog(false)}
                    onDeleteClick={onDeleteClick}
                />
            )}

            <Table dataTest={dataTest('views-smscommandlist-commandtable')}>
                <TableHead>
                    <TableRowHead>
                        <TableCellHead>
                            <Checkbox
                                checked={allChecked}
                                onChange={onToggleCallChange}
                            />
                        </TableCellHead>
                        <TableCellHead>{i18n.t('Mapping Name')}</TableCellHead>
                        <TableCellHead>{i18n.t('Parser')}</TableCellHead>
                        <TableCellHead />
                    </TableRowHead>
                </TableHead>
                <TableBody>
                    {hasMappings ? (
                        data?.metadataMappings?.constants?.map(
                            ({ id, displayName, parserType }) => (
                                <TableRow key={id}>
                                    <TableCell className={styles.checkbox}>
                                        <Checkbox
                                            checked={
                                                !!checkedMetaMappings.find(
                                                    ({ id: checkedId }) =>
                                                        id === checkedId
                                                )
                                            }
                                            onChange={() =>
                                                toggleMetaMapping({
                                                    id,
                                                    displayName,
                                                })
                                            }
                                        />
                                    </TableCell>

                                    <TableCell>{displayName}</TableCell>

                                    <TableCell>
                                        {getLabelByParserTypes(parserType)}
                                    </TableCell>

                                    <TableCell
                                        className={styles.editButtonCell}
                                    >
                                        <Button
                                            onClick={() =>
                                                history.push(
                                                    `${META_DATA_MAPPING_FORM_EDIT_PATH_STATIC}/${id}`
                                                )
                                            }
                                        >
                                            {i18n.t('Edit')}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        )
                    ) : (
                        <TableRow>
                            <TableCell colSpan="4" className={styles.noResults}>
                                {i18n.t('No mapping to display')}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
