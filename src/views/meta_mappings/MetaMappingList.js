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

import { META_MAPPING_FORM_EDIT_PATH_STATIC } from './MetaMappingFormEdit'
import { META_MAPPING_FORM_NEW_PATH } from './MetaMappingFormNew'
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
import styles from './MetaMappingList.module.css'

export const META_MAPPING_LIST_LABEL = i18n.t('Mapping')
export const META_MAPPING_LIST_PATH = '/sms-config'

export const MetaMappingList = () => {
    const history = useHistory()
    const onAddCommandClick = () => history.push(META_MAPPING_FORM_NEW_PATH)
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

    const [
        deleteMetaMappings,
        { loading: loadingDelete, error: errorDelete },
    ] = useDeleteMetaMappingMutation()

    if (loadingReadMetaMappings) {
        return (
            <div data-test={dataTest('views-smscommandlist')}>
                <PageHeadline>{META_MAPPING_LIST_LABEL}</PageHeadline>
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
                <PageHeadline>{META_MAPPING_LIST_LABEL}</PageHeadline>
                <NoticeBox error title={msg}>
                    {error.message}
                </NoticeBox>
            </div>
        )
    }

    const onToggleCallChange = () => {
        const smsCommands = data?.smsCommands?.smsCommands

        if (!smsCommands) {
            return
        }

        if (checkedMetaMappings.length === smsCommands.length) {
            setCheckedMetaMappings([])
        } else {
            setCheckedMetaMappings(
                smsCommands.map(({ id, displayName }) => ({ id, displayName }))
            )
        }
    }

    const toggleMetaMapping = smsCommand => {
        const { id } = smsCommand

        if (checkedMetaMappings.find(({ id: checkedId }) => id === checkedId)) {
            const index = checkedMetaMappings.findIndex(
                ({ id: checkedId }) => id === checkedId
            )

            return setCheckedMetaMappings([
                ...checkedMetaMappings.slice(0, index),
                ...checkedMetaMappings.slice(index + 1),
            ])
        }

        return setCheckedMetaMappings([...checkedMetaMappings, smsCommand])
    }

    const onDeleteClick = async () => {
        const ids = checkedMetaMappings.map(({ id }) => id)
        await deleteMetaMappings({ ids })

        setCheckedMetaMappings([])
        setShowDeleteConfirmationDialog(false)
        refetch()
    }

    const allChecked =
        checkedMetaMappings.length === data?.smsCommands?.smsCommands?.length
    const hasCommands = data?.smsCommands?.smsCommands?.length > 0

    return (
        <div
            data-test={dataTest('views-smscommandlist')}
            className={styles.container}
        >
            <PageHeadline>{META_MAPPING_LIST_LABEL}</PageHeadline>

            <Paragraph>
                {i18n.t(
                    'Mapping are used to integrate GoData<->DHIS2 data sharing. Multiple mappings can be set up to process and handle data in multiple ways. Add and configure mappings below.'
                )}
            </Paragraph>

            <ListActions
                addLabel={i18n.t('Add command')}
                deleteLabel={i18n.t('Delete selected')}
                dataTest="views-smscommandlist"
                onAddClick={onAddCommandClick}
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
                        <TableCellHead>{i18n.t('Sms command')}</TableCellHead>
                        <TableCellHead>{i18n.t('Parser')}</TableCellHead>
                        <TableCellHead />
                    </TableRowHead>
                </TableHead>
                <TableBody>
                    {hasCommands ? (
                        data?.smsCommands?.smsCommands?.map(
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
                                                    `${META_MAPPING_FORM_EDIT_PATH_STATIC}/${id}`
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
                                {i18n.t('No commands to display')}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
