import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import {
    ReactFinalForm,
    NoticeBox,
    CenteredContent,
    CircularLoader,
} from '@dhis2/ui'
import { useDataQuery } from '@dhis2/app-runtime'

import {
    FIELD_COMMAND_SMS_CODES_NAME,
    FieldMappingName,
    FieldMappingSeparator,
    FieldMappingParser,
    FieldMappingDefaultMessage,
    FieldMappingWrongFormatMessage,
    FieldMappingNoUserMessage,
    FieldMappingMoreThanOneOrgUnitMessage,
    FieldMappingSuccessMessage,
    FieldMappingSmsCode,
} from '../metaMappingFields'
import { MappingFormActions, useUpdateMapping } from '../metaMapping'
import { FormRow } from '../forms'
import { FieldProgram } from '../program'
import { PageSubHeadline } from '../headline'
import i18n from '../locales'

const { Form } = ReactFinalForm

const formatSmsCodes = updates => ({
    ...updates,
    [FIELD_COMMAND_SMS_CODES_NAME]: Object.values(
        updates[FIELD_COMMAND_SMS_CODES_NAME]
    ),
})

const query = {
    metaMapping: {
        resource: 'metaMappings',
        id: ({ commandId }) => commandId,
        params: {
            fields: [
                'name',
                'parserType',
                'separator',
                'defaultMessage',
                'wrongFormatMessage',
                'noUserMessage',
                'moreThanOneOrgUnitMessage',
                'successMessage',
                // The queries below should be reduced to only the data we need
                'program[id,displayName,programTrackedEntityAttributes[trackedEntityAttribute[:all,id,displayName]]]',
                'smsCodes[:all,trackedEntityAttribute[id,displayName,valueType]]',
            ],
        },
    },
}

export const MappingEditTrackedEntityRegistrationParserForm = ({
    commandId,
    onAfterChange,
    onCancel,
}) => {
    const updateMapping = useUpdateMapping({
        commandId,
        onAfterChange,
        formatMapping: formatSmsCodes,
        //partial: true,
    })

    const { loading, error, data } = useDataQuery(query, {
        variables: { commandId },
    })

    if (loading) {
        return (
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        )
    }

    if (error) {
        const msg = i18n.t(
            'Something went wrong whilst loading the sms command'
        )

        return (
            <NoticeBox error title={msg}>
                {error.message}
            </NoticeBox>
        )
    }

    const {
        name,
        parserType,
        program,
        separator,
        defaultMessage,
        wrongFormatMessage,
        noUserMessage,
        moreThanOneOrgUnitMessage,
        successMessage,
        smsCodes: smsCodesOriginal,
    } = data.metaMapping

    const smsCodes = smsCodesOriginal.reduce(
        (curSmsCodes, smsCode) => ({
            ...curSmsCodes,
            [smsCode.trackedEntityAttribute.id]: smsCode,
        }),
        {}
    )

    const initialValues = {
        name,
        parserType,
        program,
        separator,
        defaultMessage,
        wrongFormatMessage,
        noUserMessage,
        moreThanOneOrgUnitMessage,
        successMessage,
        smsCodes,
    }
    const selectedProgramOption = {
        value: program.id,
        label: program.displayName,
    }

    /**
     * Create usable data for the dynamic fields
     */

    // The tracked entity attributes here have the right order for the fields
    const trackedEntityAttributes = program.programTrackedEntityAttributes.map(
        ({ trackedEntityAttribute }) => trackedEntityAttribute
    )

    // Creating an array with only the data we need to render our dynamic form fields
    const dynamicFields = trackedEntityAttributes.map(
        trackedEntityAttribute => {
            const { id, displayName, valueType } = trackedEntityAttribute
            const merged = { id, displayName, valueType }
            const smsCode = smsCodes[id]

            if (smsCode) {
                // This contains the actual value of the field
                merged.initialValue = smsCode.code
            }

            return merged
        }
    )

    return (
        <Form
            keepDirtyOnReinitialize
            onSubmit={updateMapping}
            initialValues={initialValues}
        >
            {({ handleSubmit, pristine }) => (
                <form onSubmit={handleSubmit}>
                    <FormRow>
                        <FieldMappingName />
                    </FormRow>

                    <FormRow>
                        <FieldMappingParser disabled />
                    </FormRow>

                    <FormRow>
                        <FieldProgram
                            disabled
                            programs={[selectedProgramOption]}
                        />
                    </FormRow>

                    <FormRow>
                        <FieldMappingSeparator />
                    </FormRow>

                    <FormRow>
                        <FieldMappingDefaultMessage />
                    </FormRow>

                    <FormRow>
                        <FieldMappingWrongFormatMessage />
                    </FormRow>

                    <FormRow>
                        <FieldMappingNoUserMessage />
                    </FormRow>

                    <FormRow>
                        <FieldMappingMoreThanOneOrgUnitMessage />
                    </FormRow>

                    <FormRow>
                        <FieldMappingSuccessMessage />
                    </FormRow>

                    <PageSubHeadline>
                        {i18n.t('SMS short codes')}
                    </PageSubHeadline>

                    {dynamicFields.map(dynamicField => {
                        // I assume this should switch field types based on `valueType`
                        // which can be 'TEXT', 'NUMBER', etc. Currently this renders
                        // a regular input for everything.
                        return (
                            <FormRow key={dynamicField.id}>
                                <FieldMappingSmsCode
                                    id={dynamicField.id}
                                    displayName={dynamicField.displayName}
                                    valueType={dynamicField.valueType}
                                />
                            </FormRow>
                        )
                    })}

                    <MappingFormActions onCancel={() => onCancel(pristine)} />
                </form>
            )}
        </Form>
    )
}

MappingEditTrackedEntityRegistrationParserForm.propTypes = {
    commandId: PropTypes.string.isRequired,
    onAfterChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
}
