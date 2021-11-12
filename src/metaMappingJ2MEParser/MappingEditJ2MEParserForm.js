import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import { MappingEditWithDataSetForm } from '../metaMappingWithDataSet'
import { AT_LEAST_ONE_DATAVALUE } from '../metaMappingFields'
import { dataTest } from '../dataTest'

export const MappingEditJ2MEParserForm = ({
    commandId,
    onAfterChange,
    onCancel,
}) => (
    <MappingEditWithDataSetForm
        dataTest={dataTest(
            'smscommandkeyvalueparser-commandeditj2meparserform'
        )}
        commandId={commandId}
        onAfterChange={onAfterChange}
        onCancel={onCancel}
        initialCompletenessMethod={AT_LEAST_ONE_DATAVALUE.value}
    />
)

MappingEditJ2MEParserForm.propTypes = {
    commandId: PropTypes.string.isRequired,
    onAfterChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
}
