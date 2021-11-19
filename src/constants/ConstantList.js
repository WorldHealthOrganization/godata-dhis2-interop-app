import { CircularLoader } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import { ConstantsTable } from './ConstantsTable'
import { dataTest } from '../dataTest'
import styles from './ConstantList.module.css'

export const ConstantList = ({
    checkedConstants,
    constants,
    setCheckedConstants,
    onMakeDefaultClick,
    processing,
}) => {
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

    return (
        <div
            className={styles.container}
            data-test={dataTest('constants-gatewaylist')}
        >
            {processing && (
                <div className={styles.processingMessage}>
                    <div className={styles.loadingContainer}>
                        <CircularLoader />
                    </div>
                </div>
            )}

            <ConstantsTable
                allConstantsChecked={allConstantsChecked}
                constants={constants}
                checkedConstants={checkedConstants}
                onConstantToggle={toggleConstant}
                onMakeDefaultClick={onMakeDefaultClick}
                onToggleAll={toggleAll}
            />
        </div>
    )
}

ConstantList.propTypes = {
    checkedConstants: PropTypes.arrayOf(PropTypes.string).isRequired,
    constants: PropTypes.arrayOf(
        PropTypes.shape({
            displayName: PropTypes.string.isRequired,
           // type: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
            //isDefault: PropTypes.bool,
        })
    ).isRequired,
    setCheckedConstants: PropTypes.func.isRequired,
    onMakeDefaultClick: PropTypes.func.isRequired,
    processing: PropTypes.bool,
}
