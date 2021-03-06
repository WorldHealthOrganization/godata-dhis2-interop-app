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

import { DeleteConstantsConfirmationDialog } from '../../constants/DeleteConstantsConfirmationDialog.js'
import { ListActions } from '../../dataList'
import { PageHeadline } from '../../headline'
import { Paragraph } from '../../text'
import { dataTest } from '../../dataTest'
import i18n from '../../locales'
import styles from './InteropList.module.css'
import { Task } from '../../models/task.js'

export const INTEROP_LIST_PATH = '/interop'
export const INTEROP_LIST_LABEL = 'Interoperability Tasks'

export const InteropList = () => {
    const history = useHistory()
    const onAddConstantClick = () => history.push(INTEROP_FORM_NEW_PATH)
    const [checkedConstants, setCheckedConstants] = useState([])
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [tasks, setTasks] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        Task.getAllTasks()
            .then(tasks => {
                console.log({ tasks })
                setTasks(tasks)
                setLoading(false)
            })
            .catch(err => setError(err))
    }, [])

    const onDeleteClick = async () => {
        setTasks(await dataStore.deleteByArrayIds('tasks', checkedConstants))
        setCheckedConstants([])
        setShowDeleteDialog(false)
    }

    const onDefaultsClick = async () => {
        setLoading(true)
        Task.addDefaultTasks()
            .then(tasks => {
                setTasks(tasks)
                setLoading(false)
            })
            .catch(err => {
                setError(err)
                setLoading(false)
            })
    }

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

    if (!!error) {
        return (
            <>
                <PageHeadline>{INTEROP_LIST_LABEL}</PageHeadline>
                <NoticeBox error>{error}</NoticeBox>
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
                disableDelete={!checkedConstants.length}
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
                            </TableRowHead>
                        </TableHead>

                        <TableBody>
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
