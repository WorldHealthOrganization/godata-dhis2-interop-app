import { Button, ButtonStrip } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import { SaveMappingButton } from './SaveMappingButton'
import { SubmitErrors } from './SubmitErrors'
import i18n from '../locales'
import styles from './MappingFormActions.module.css'

export const MappingFormActions = ({ enableSubmit, onCancel }) => (
    <div className={styles.container}>
        <SubmitErrors />

        <ButtonStrip>
            <SaveMappingButton enabled={enableSubmit} />
            <Button onClick={onCancel}>{i18n.t('Cancel')}</Button>
        </ButtonStrip>
    </div>
)

MappingFormActions.propTypes = {
    onCancel: PropTypes.func.isRequired,
    enableSubmit: PropTypes.bool,
}
