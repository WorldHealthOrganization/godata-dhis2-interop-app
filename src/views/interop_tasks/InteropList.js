import { useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import * as dataStore from '../../utils/dataStore.js'
import {
    NoticeBox,
    CenteredContent,
    CircularLoader,
    Button,
    ButtonStrip,
    Checkbox,
    Table,
    TableHead,
    TableBody,
    TableRowHead,
    TableCellHead,
    TableRow,
    TableCell,
} from '@dhis2/ui'

import { INTEROP_FORM_NEW_PATH } from './InteropFormNew'
import { INTEROP_RUN_TASK_FORM_PATH_STATIC } from './InteropRunTaskForm'
import { INTEROP_FORM_EDIT_PATH_STATIC } from './InteropFormEdit'

import {
    GODATA_DHIS_OUTBREAK_TASK,
    GODATA_DHIS_LOCATION_TASK,
    GODATA_DHIS_CASE_TASK,
    GODATA_DHIS_CONTACT_TASK
} from '../../constants'

import {
    useCreateTaskConstantMutation,
    useReadTaskConstantsQueryById,
    useDeleteConstantsMutation,
    DeleteConstantsConfirmationDialog,
    useReadTaskConstantsQueryForTasks,
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
    const [tasks, setTasks] = useState({})

    const {
        loading: loadingReadConstants,
        error: errorReadConstants,
        data,
        refetch: refetchReadConstants,
    } = useReadTaskConstantsQueryForTasks()

    useEffect(() => {
        dataStore.getValue('tasks').then(tasks => {
            setTasks(tasks)
        })
    }, [])

    const constants = data?.constants?.constants

    const [
        deleteCheckedConstants,
        { loading: loadingDelete, error: errorDelete },
    ] = useDeleteConstantsMutation()

    const onDeleteClick = async () => {
        setTasks(await dataStore.deleteByArrayIds('tasks', checkedConstants))
        setCheckedConstants([])
        setShowDeleteDialog(false)
    }

    const onDefaultsClick = async () => {
        console.log('default clicked')
        var allValues = GODATA_DHIS_OUTBREAK_TASK
        var nameInput = 'Default Go.Data DHIS2 Outbreak Task'
        await dataStore.appendValue('tasks', {
            task: allValues,
            displayName: nameInput,
        })
        allValues = GODATA_DHIS_LOCATION_TASK
        nameInput = 'Default Go.Data DHIS2 Location Task'
        setTasks(
            await dataStore.appendValue('tasks', {
                task: allValues,
                displayName: nameInput,
            })
        )
        allValues = GODATA_DHIS_CASE_TASK
        nameInput = 'Default Go.Data DHIS2 Case Task'
        setTasks(
            await dataStore.appendValue('tasks', {
                task: allValues,
                displayName: nameInput,
            })
        )
        allValues = GODATA_DHIS_CONTACT_TASK
        nameInput = 'Default Go.Data DHIS2 Contact Task'
        setTasks(
            await dataStore.appendValue('tasks', {
                task: allValues,
                displayName: nameInput,
            })
        )
        
    }

    const loading = loadingReadConstants || loadingDelete

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

    const error = errorReadConstants || errorDelete

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

    const allConstantsChecked = checkedConstants.length === tasks.length

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
        if (!allConstantsChecked)
            setCheckedConstants([...Array(tasks.length).keys()])
        else setCheckedConstants([])
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
                    'Tasks are used to perform Go.Data<->DHIS2 interoperability. Multiple tasks can be set up to process and handle data. Add and configure tasks below.'
                )}
            </Paragraph>

            <ListActions
                addLabel={i18n.t('Add task')}
                deleteLabel={i18n.t('Delete selected')}
                defaultLabel={i18n.t('Load default config')}
                dataTest="views-gatewayconfiglist"
                onAddClick={onAddConstantClick}
                onDefaultsClick={onDefaultsClick}
                onDeleteClick={() => setShowDeleteDialog(true)}
                disableAdd={loadingDelete}
                disableDelete={!checkedConstants.length || loadingDelete}
            />

            {Object.keys(tasks).length ? (
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
                                    dataTest={dataTest(
                                        'constants-constantstable-checkall'
                                    )}
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
                            {console.log(tasks)}
                            {tasks.map((task, i) => (
                                <TableRow
                                    key={i}
                                    dataTest={dataTest(
                                        'constants-constantstable-row'
                                    )}
                                >
                                    <TableCell
                                        className={styles.checkboxCell}
                                        dataTest={dataTest(
                                            'constants-constantstable-checkbox'
                                        )}
                                    >
                                        <Checkbox
                                            value={i.toString()}
                                            onChange={() => toggleConstant(i)}
                                            checked={checkedConstants.includes(
                                                i
                                            )}
                                            dataTest={dataTest(
                                                'constants-constantstable-id'
                                            )}
                                        />
                                    </TableCell>

                                    <TableCell
                                        dataTest={dataTest(
                                            'constants-constantstable-name'
                                        )}
                                    >
                                        {task.displayName}
                                    </TableCell>

                                    <TableCell
                                        className={styles.typeCell}
                                        dataTest={dataTest(
                                            'constants-constantstable-type'
                                        )}
                                    >
                                        {task.task[6]}
                                    </TableCell>

                                    <TableCell
                                        dataTest={dataTest(
                                            'constants-constantstable-actions'
                                        )}
                                        className={styles.editCell}
                                    >
                                        <ButtonStrip
                                            className={styles.rowActions}
                                        >
                                            <Button
                                                dataTest={dataTest(
                                                    'constants-constantstable-edit'
                                                )}
                                                onClick={() => {
                                                    history.push(
                                                        `${INTEROP_FORM_EDIT_PATH_STATIC}/${i}`
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
                                                    history.push(
                                                        `${INTEROP_RUN_TASK_FORM_PATH_STATIC}/${i}`
                                                    )
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
