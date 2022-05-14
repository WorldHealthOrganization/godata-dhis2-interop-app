import { useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import * as dataStore from '../../utils/dataStore.js'
import {
    NoticeBox,
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

import { METADATA_CONFIG_FORM_NEW_PATH } from './MetadataConfigFormNew'
import { METADATA_CONFIG_FORM_EDIT_PATH_STATIC } from './MetadataConfigFormEdit'

import {
    GODATA_DHIS_OUTBREAK_MODEL,
    GODATA_DHIS_LOCATION_MODEL,
    GODATA_DHIS_PROGRAM_TO_CASE_MODEL,
    GODATA_DHIS_PROGRAM_TO_CONTACT_MODEL
} from '../../constants'

import { DeleteConstantsConfirmationDialog } from '../../constants'
import { ListActions } from '../../dataList'
import { PageHeadline } from '../../headline'
import { Paragraph } from '../../text'
import { dataTest } from '../../dataTest'
import i18n from '../../locales'
import styles from './MetadataConfigList.module.css'

export const METADATA_CONFIG_LIST_PATH = '/metadata'
export const METADATA_CONFIG_LIST_LABEL = 'Metadata Mapping'

export const MetadataConfigList = () => {
    const history = useHistory()
    const onAddConstantClick = () => history.push(METADATA_CONFIG_FORM_NEW_PATH)

    const [checkedConstants, setCheckedConstants] = useState([])
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [mappings, setMappings] = useState([])

    useEffect(() => {
        dataStore.getValue('mappings').then(mappings => {
            console.log(mappings)
            setMappings(mappings)
        })
    }, [])

    const onDeleteClick = async () => {
        console.log('Deleting...')
        console.log(checkedConstants)
        setMappings(
            await dataStore.deleteByArrayIds('mappings', checkedConstants)
        )
        setCheckedConstants([])
        setShowDeleteDialog(false)
    }

    const onDefaultsClick = async () => {
        var allValues = GODATA_DHIS_OUTBREAK_MODEL
        var nameInput = 'Default Go.Data DHIS2 Outbreak Mapping'
        await dataStore.appendValue('mappings', {
            mapping: allValues,
            displayName: nameInput,
        })
        allValues = GODATA_DHIS_LOCATION_MODEL
        nameInput = 'Default Go.Data DHIS2 Location Mapping'
        await dataStore.appendValue('mappings', {
            mapping: allValues,
            displayName: nameInput,
        })
        allValues = GODATA_DHIS_PROGRAM_TO_CASE_MODEL
        nameInput = 'Default Go.Data DHIS2 Cases Mapping'
        await dataStore.appendValue('mappings', {
            mapping: allValues,
            displayName: nameInput,
        })
        allValues = GODATA_DHIS_PROGRAM_TO_CONTACT_MODEL
        nameInput = 'Default Go.Data DHIS2 Contacts Mapping'
        await dataStore.appendValue('mappings', {
            mapping: allValues,
            displayName: nameInput,
        })
        await dataStore
            .getValue('mappings')
            .then(mappings => setMappings(mappings))
    }

    const allConstantsChecked = checkedConstants.length === mappings.length

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
            setCheckedConstants([...Array(mappings.length).keys()])
        else setCheckedConstants([])
    }

    return (
        <div
            className={styles.container}
            data-test={dataTest('views-gatewayconfiglist')}
        >
            <PageHeadline>{METADATA_CONFIG_LIST_LABEL}</PageHeadline>

            <Paragraph>
                {i18n.t(
                    'Mapping are used to integrate Go.Data<->DHIS2 data sharing. Multiple mappings can be set up to process and handle data in multiple ways. Add and configure mappings below.'
                )}
            </Paragraph>

            <ListActions
                addLabel={i18n.t('Add mappings')}
                deleteLabel={i18n.t('Delete selected')}
                defaultLabel={i18n.t('Load default config')}
                dataTest="views-gatewayconfiglist"
                onAddClick={onAddConstantClick}
                onDefaultsClick={onDefaultsClick}
                onDeleteClick={() => setShowDeleteDialog(true)}
            />

            {mappings.length ? (
                <div
                    className={styles.container}
                    data-test={dataTest('constants-gatewaylist')}
                >
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
                                <TableCellHead/>
                            </TableRowHead>
                        </TableHead>

                        <TableBody>
                            {console.log({ mappings })}
                            {mappings.map((constant, i) => (
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
                                        {constant.displayName}
                                    </TableCell>

                                    <TableCell
                                        className={styles.typeCell}
                                        dataTest={dataTest(
                                            'constants-constantstable-type'
                                        )}
                                    >
                                        {
                                            constant.mapping[0]
                                                .godataValue[0][0]
                                                .conversionType
                                        }
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
                                                        `${METADATA_CONFIG_FORM_EDIT_PATH_STATIC}/${i}`
                                                    )
                                                }}
                                            >
                                                {i18n.t('Edit')}
                                            </Button>
                                        </ButtonStrip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
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
