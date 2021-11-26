import { useHistory } from 'react-router-dom'
import React, { useState } from 'react'
import { NoticeBox, CenteredContent, CircularLoader,    Button,
    ButtonStrip,
    Checkbox,
    Table,
    TableHead,
    TableBody,
    TableRowHead,
    TableCellHead,
    TableRow,
    TableCell, } from '@dhis2/ui'

import { INTEROP_FORM_NEW_PATH } from './InteropFormNew'
import { INTEROP_FORM_EDIT_PATH_STATIC } from './InteropFormEdit'

import {
    useSetDefaultConstantMutation,
    useDeleteConstantsMutation,
    DeleteConstantsConfirmationDialog,
    useReadTaskConstantsQueryForTasks
} from '../../constants'
import { ListActions } from '../../dataList'
import { PageHeadline } from '../../headline'
import { Paragraph } from '../../text'
import { dataTest } from '../../dataTest'
import i18n from '../../locales'
import styles from './InteropList.module.css'

export const INTEROP_LIST_PATH = '/interop'
export const INTEROP_LIST_LABEL = 'Interoperability Tasks'

export const InteropList = () => {
    const history = useHistory()
    const onAddConstantClick = () => history.push(INTEROP_FORM_NEW_PATH)
    const [checkedConstants, setCheckedConstants] = useState([])
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    const {
        loading: loadingReadConstants,
        error: errorReadConstants,
        data,
        refetch: refetchReadConstants,
    } = useReadTaskConstantsQueryForTasks()

    const constants = data?.constants?.constants

    const performExchangeTask = () => {}

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
                <PageHeadline>{INTEROP_LIST_LABEL}</PageHeadline>
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
                <PageHeadline>{INTEROP_LIST_LABEL}</PageHeadline>
                <NoticeBox error title={msg}>
                    {error.message}
                </NoticeBox>
            </>
        )
    }

    const allConstantsChecked = checkedConstants.length === constants.length

    const toggleConstant = id => {
        if (checkedConstants.includes(id)) {
            const index = checkedConstants.findIndex(curId => curId === id)

            const newCheckedConstants =
                index === 0
                    ? checkedConstants.slice(1)
                    : [
                          ...checkedConstants.slice(0, index),
                          ...checkedConstants.slice(index + 1),
                      ]

            setCheckedConstants(newCheckedConstants)
        } else {
            setCheckedConstants([...checkedConstants, id])
        }
    }

    const toggleAll = () => {
        if (!allConstantsChecked) {
            const allConstantIds = constants.map(({ id }) => id)
            setCheckedConstants(allConstantIds)
        } else {
            setCheckedConstants([])
        }
    }
    
    const hasMappings = !!data?.constants?.constants?.length
    

    return (
        <div
            className={styles.container}
            data-test={dataTest('views-gatewayconfiglist')}
        >
            <PageHeadline>{INTEROP_LIST_LABEL}</PageHeadline>

            <Paragraph>
                {i18n.t(
                    'Tasks are used to perform GoData<->DHIS2 data sharing. Multiple tasks can be set up to process and handle data. Add and configure tasks below.'
                )}
            </Paragraph>

            <ListActions
                addLabel={i18n.t('Add task')}
                deleteLabel={i18n.t('Delete selected')}
                dataTest="views-gatewayconfiglist"
                onAddClick={onAddConstantClick}
                onDeleteClick={() => setShowDeleteDialog(true)}
                disableAdd={loadingDelete}
                disableDelete={!checkedConstants.length || loadingDelete}
            />

            {hasMappings ? (
        <div
        className={styles.container}
        data-test={dataTest('constants-gatewaylist')}
    >
        {loading && (
            <div className={styles.processingMessage}>
                <div className={styles.loadingContainer}>
                    <CircularLoader />
                </div>
            </div>
        )}

<Table dataTest={dataTest('constants-constantstable')}>
            <TableHead>
                <TableRowHead>
                    <TableCellHead
                        dataTest={dataTest('constants-constantstable-checkall')}
                    >
                        <Checkbox
                            onChange={toggleAll}
                            checked={allConstantsChecked}
                        />
                    </TableCellHead>
                    <TableCellHead>{i18n.t('Name')}</TableCellHead>
                    <TableCellHead>{i18n.t('Type')}</TableCellHead>
                    <TableCellHead />
                    <TableCellHead />
                </TableRowHead>
            </TableHead>

            <TableBody>
                {constants.map(constant => (
                    <TableRow
                        key={constant.id}
                        dataTest={dataTest('constants-constantstable-row')}
                    >
                        <TableCell
                            className={styles.checkboxCell}
                            dataTest={dataTest(
                                'constants-constantstable-checkbox'
                            )}
                        >
                            <Checkbox
                                value={constant.id}
                                onChange={() => toggleConstant(constant.id)}
                                checked={checkedConstants.includes(constant.id)}
                                dataTest={dataTest('constants-constantstable-id')}
                            />
                        </TableCell>

                        <TableCell
                            dataTest={dataTest('constants-constantstable-name')}
                        >
                            {constant.displayName}
                        </TableCell>

                        <TableCell
                            className={styles.typeCell}
                            dataTest={dataTest('constants-constantstable-type')}
                        >
                            {constant.shortName}
                        </TableCell>

                        <TableCell
                            dataTest={dataTest(
                                'constants-constantstable-actions'
                            )}
                            className={styles.editCell}
                        >
                            <ButtonStrip className={styles.rowActions}>
                                <Button
                                    dataTest={dataTest(
                                        'constants-constantstable-edit'
                                    )}
                                    onClick={() => {
                                        history.push(
                                            `${INTEROP_FORM_EDIT_PATH_STATIC}/${constant.id}`
                                        )
                                    }}
                                >
                                    {i18n.t('Edit')}
                                </Button>
                                <Button
                                    dataTest={dataTest(
                                        'constants-constantstable-edit'
                                    )}
                                    onClick={() => {
                                        performExchangeTask(constant.id)
                                        
                                    }}
                                >
                                    {i18n.t('Run Task')}
                                </Button>
                            </ButtonStrip>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
            ) : (
                <NoticeBox info title={i18n.t('No task found')}>
                    {i18n.t(
                        "It looks like there aren't any configured task, or they couldn't be loaded."
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
