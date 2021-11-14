import {
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
import { PropTypes } from '@dhis2/prop-types'
import { useHistory } from 'react-router-dom'
import React from 'react'

import { METADATA_CONFIG_FORM_EDIT_PATH_STATIC } from '../views/metadata_configuration/MetadataConfigFormEdit'
import { dataTest } from '../dataTest'
import { getTypeLabelByType } from './getTypeLabelByType'
import i18n from '../locales'
import styles from './ConstantsTable.module.css'

export const ConstantsTable = ({
    allConstantsChecked,
    checkedConstants,
    constants,
    onConstantToggle,
    onToggleAll,
    onMakeDefaultClick,
}) => {
    const history = useHistory()

    return (
        <Table dataTest={dataTest('constants-constantstable')}>
            <TableHead>
                <TableRowHead>
                    <TableCellHead
                        dataTest={dataTest('constants-constantstable-checkall')}
                    >
                        <Checkbox
                            onChange={onToggleAll}
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
                        key={constant.uid}
                        dataTest={dataTest('constants-constantstable-row')}
                    >
                        <TableCell
                            className={styles.checkboxCell}
                            dataTest={dataTest(
                                'constants-constantstable-checkbox'
                            )}
                        >
                            <Checkbox
                                value={constant.uid}
                                onChange={() => onConstantToggle(constant.uid)}
                                checked={checkedConstants.includes(constant.uid)}
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
                            {getTypeLabelByType(constant.type)}
                        </TableCell>

                        <TableCell className={styles.defaultCell}>
                            {!constant.isDefault ? (
                                <Button
                                    dataTest={dataTest(
                                        'constants-constantstable-makedefault'
                                    )}
                                    onClick={() =>
                                        onMakeDefaultClick(constant.uid)
                                    }
                                    className={styles.makeDefaultButton}
                                >
                                    {i18n.t('Make default')}
                                </Button>
                            ) : (
                                <span
                                    className={styles.isDefaultText}
                                    data-test={dataTest(
                                        'constants-constantstable-isdefault'
                                    )}
                                >
                                    {i18n.t('Default constant')}
                                </span>
                            )}
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
                                            `${METADATA_CONFIG_FORM_EDIT_PATH_STATIC}/${constant.uid}`
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
    )
}

ConstantsTable.propTypes = {
    checkedConstants: PropTypes.arrayOf(PropTypes.string).isRequired,
    constants: PropTypes.arrayOf(
        PropTypes.shape({
            isDefault: PropTypes.bool.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            uid: PropTypes.string.isRequired,
        })
    ).isRequired,
    onConstantToggle: PropTypes.func.isRequired,
    onMakeDefaultClick: PropTypes.func.isRequired,
    onToggleAll: PropTypes.func.isRequired,
    allConstantsChecked: PropTypes.bool,
}