import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import { MappingEditWithDataSetForm } from '../metaMappingWithDataSet'
import { dataTest } from '../dataTest'

export const MappingEditKeyValueParserForm = ({
    commandId,
    onAfterChange,
    onCancel,
}) => (
    <MappingEditWithDataSetForm
        dataTest={dataTest(
            'smscommandkeyvalueparser-commandeditkeyvalueparserform'
        )}
        commandId={commandId}
        onAfterChange={onAfterChange}
        onCancel={onCancel}
    />
)

MappingEditKeyValueParserForm.propTypes = {
    commandId: PropTypes.string.isRequired,
    onAfterChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
}
