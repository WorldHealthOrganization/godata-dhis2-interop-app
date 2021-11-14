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
                                onChange={() => onConstantToggle(constant.id)}
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
                            {getTypeLabelByType(constant.type)}
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
                                            `${METADATA_CONFIG_FORM_EDIT_PATH_STATIC}/${constant.id}`
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
            displayName: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
        })
    ).isRequired,
    onConstantToggle: PropTypes.func.isRequired,
    onMakeDefaultClick: PropTypes.func.isRequired,
    onToggleAll: PropTypes.func.isRequired,
    allConstantsChecked: PropTypes.bool,
}
