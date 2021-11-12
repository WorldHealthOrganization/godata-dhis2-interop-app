import {
    CenteredContent,
    CircularLoader,
    NoticeBox,
    ReactFinalForm,
} from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React, { useState } from 'react'

import {
    ALL_DATAVALUE,
    MappingsAddSpecialCharacters,
    DataElementTimesCategoryOptionCombos,
    FIELD_COMMAND_COMPLETENESS_METHOD_NAME,
    FIELD_COMMAND_DEFAULT_MESSAGE_NAME,
    FIELD_COMMAND_MORE_THAN_ONE_ORG_UNIT_MESSAGE_NAME,
    FIELD_COMMAND_NAME_NAME,
    FIELD_COMMAND_NO_USER_MESSAGE_NAME,
    FIELD_COMMAND_PARSER_NAME,
    FIELD_COMMAND_SEPARATOR_NAME,
    FIELD_COMMAND_SMS_CODES_NAME,
    FIELD_COMMAND_SPECIAL_CHARS_NAME,
    FIELD_COMMAND_SUCCESS_MESSAGE_NAME,
    FIELD_COMMAND_USE_CURRENT_PERIOD_FOR_REPORTING_NAME,
    FIELD_COMMAND_WRONG_FORMAT_MESSAGE_NAME,
    FieldMappingCompletenessMethod,
    FieldMappingDefaultMessage,
    FieldMappingMoreThanOneOrgUnitMessage,
    FieldMappingName,
    FieldMappingNoUserMessage,
    FieldMappingParser,
    FieldMappingSeparator,
    FieldMappingSpecialCharacter,
    FieldMappingSuccessMessage,
    FieldMappingUseCurrentPeriodForReporting,
    FieldMappingWrongFormatMessage,
    KEY_VALUE_PARSER,
} from '../metaMappingFields'
import {
    MappingFormActions,
    getSmsCodeDuplicates,
    useUpdateMapping,
} from '../metaMapping'
import { FIELD_DATA_SET_NAME, FieldDataSet } from '../dataSet'
import { FormRow } from '../forms'
import { PageSubHeadline } from '../headline'
import { useReadMetaMappingWithDataSetQuery } from './useReadMetaMappingWithDataSetQuery'
import i18n from '../locales'

const { Form, FormSpy } = ReactFinalForm

const getInitialFormState = (command, initialCompletenessMethod) => {
    const name = command[FIELD_COMMAND_NAME_NAME]
    const parserType = KEY_VALUE_PARSER.value
    const dataSetId = { id: command[FIELD_DATA_SET_NAME].id }
    const separator = command[FIELD_COMMAND_SEPARATOR_NAME]
    const completenessMethod =
        initialCompletenessMethod ||
        command[FIELD_COMMAND_COMPLETENESS_METHOD_NAME] ||
        ALL_DATAVALUE.value
    const useCurrentPeriodForReporting =
        command[FIELD_COMMAND_USE_CURRENT_PERIOD_FOR_REPORTING_NAME]
    const defaultMessage = command[FIELD_COMMAND_DEFAULT_MESSAGE_NAME]
    const wrongFormatMessage = command[FIELD_COMMAND_WRONG_FORMAT_MESSAGE_NAME]
    const noUserMessage = command[FIELD_COMMAND_NO_USER_MESSAGE_NAME]
    const moreThanOneOrgUnitMessage =
        command[FIELD_COMMAND_MORE_THAN_ONE_ORG_UNIT_MESSAGE_NAME]
    const successMessage = command[FIELD_COMMAND_SUCCESS_MESSAGE_NAME]
    const smsCodes = command[FIELD_COMMAND_SMS_CODES_NAME].reduce(
        (acc, { code, compulsory, formula, optionId, dataElement }) => {
            const key =
                optionId < 10 ? dataElement.id : `${dataElement.id}-${optionId}`

            const smsCode = { code, compulsory, optionId }

            if (formula) {
                smsCode.formula = formula
            }

            return {
                ...acc,
                [key]: smsCode,
            }
        },
        {}
    )
    const specialCharacters = command[FIELD_COMMAND_SPECIAL_CHARS_NAME] || []

    return {
        [FIELD_COMMAND_NAME_NAME]: name,
        [FIELD_COMMAND_PARSER_NAME]: parserType,
        [FIELD_DATA_SET_NAME]: dataSetId,
        [FIELD_COMMAND_SEPARATOR_NAME]: separator,
        [FIELD_COMMAND_COMPLETENESS_METHOD_NAME]: completenessMethod,
        [FIELD_COMMAND_USE_CURRENT_PERIOD_FOR_REPORTING_NAME]: useCurrentPeriodForReporting,
        [FIELD_COMMAND_DEFAULT_MESSAGE_NAME]: defaultMessage,
        [FIELD_COMMAND_WRONG_FORMAT_MESSAGE_NAME]: wrongFormatMessage,
        [FIELD_COMMAND_NO_USER_MESSAGE_NAME]: noUserMessage,
        [FIELD_COMMAND_MORE_THAN_ONE_ORG_UNIT_MESSAGE_NAME]: moreThanOneOrgUnitMessage,
        [FIELD_COMMAND_SUCCESS_MESSAGE_NAME]: successMessage,
        smsCodes,
        specialCharacters,
    }
}

const globalValidate = values => {
    let hasErrors = false
    const errors = {}

    const smsCodesFormState = values[FIELD_COMMAND_SMS_CODES_NAME]
    const smsCodes = smsCodesFormState ? Object.entries(smsCodesFormState) : []
    const smsCodesWithValue = smsCodes.filter(([_, { code }]) => code) //eslint-disable-line no-unused-vars

    if (smsCodesWithValue.length) {
        const duplicates = getSmsCodeDuplicates(smsCodesWithValue)

        if (duplicates.length) {
            hasErrors = true

            const duplicateErrors = {}

            duplicates.forEach(duplicate => {
                duplicateErrors[duplicate] = {
                    code: i18n.t('Duplicate value!'),
                }
            })

            errors[FIELD_COMMAND_SMS_CODES_NAME] =
                errors[FIELD_COMMAND_SMS_CODES_NAME] || {}

            Object.assign(errors[FIELD_COMMAND_SMS_CODES_NAME], duplicateErrors)
        }
    }

    return hasErrors ? errors : undefined
}

const formatSmsCodes = updates => {
    const smsCodes = updates[FIELD_COMMAND_SMS_CODES_NAME]
    const formattedSmsCodes = Object.entries(smsCodes).map(
        ([id, { code, formula, compulsory, optionId }]) => {
            const [dataElementId] = id.split('-')
            const formattedSmsCode = {
                code,
                compulsory,
                dataElement: { id: dataElementId },
            }

            if (formula) {
                formattedSmsCode.formula = formula
            }

            if (optionId) {
                formattedSmsCode.optionId = optionId
            }

            return formattedSmsCode
        }
    )

    return {
        ...updates,
        [FIELD_COMMAND_SMS_CODES_NAME]: formattedSmsCodes,
    }
}

const FormComponent = ({
    DE_COC_combination_data,
    dataTest,
    handleSubmit,
    hasSpecialChars,
    onCancel,
    pristine,
    selectedDataSetOption,
}) => {
    const [specialKeyRemoved, setSpecialKeyRemoved] = useState(false)
    const onSpecialKeyRemoved = () => setSpecialKeyRemoved(true)
    const enableSubmit = specialKeyRemoved && hasSpecialChars

    return (
        <form onSubmit={handleSubmit} data-test={dataTest}>
            <FormRow>
                <FieldMappingName />
            </FormRow>

            <FormRow>
                <FieldMappingParser disabled />
            </FormRow>

            <FormRow>
                <FieldDataSet disabled dataSets={[selectedDataSetOption]} />
            </FormRow>

            <FormRow>
                <FieldMappingCompletenessMethod />
            </FormRow>

            <FormRow>
                <FieldMappingUseCurrentPeriodForReporting />
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

            {DE_COC_combination_data && (
                <DataElementTimesCategoryOptionCombos
                    DE_COC_combinations={DE_COC_combination_data}
                />
            )}

            <PageSubHeadline>{i18n.t('Special characters')}</PageSubHeadline>

            <FormSpy subscription={{ values: true }}>
                {({ values }) => (
                    <>
                        {values[FIELD_COMMAND_SPECIAL_CHARS_NAME].map(
                            (_, index) => (
                                <FormRow key={index}>
                                    <FieldMappingSpecialCharacter
                                        index={index}
                                        onSpecialKeyRemoved={
                                            onSpecialKeyRemoved
                                        }
                                    />
                                </FormRow>
                            )
                        )}
                    </>
                )}
            </FormSpy>

            <MappingsAddSpecialCharacters />

            <MappingFormActions
                enableSubmit={enableSubmit}
                onCancel={() => onCancel(pristine)}
            />
        </form>
    )
}

FormComponent.propTypes = {
    dataTest: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    hasSpecialChars: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    DE_COC_combination_data: PropTypes.arrayOf(
        PropTypes.shape({
            dataElement: PropTypes.shape({
                displayName: PropTypes.string.isRequired,
                id: PropTypes.string.isRequired,
            }).isRequired,
            categoryOptionCombo: PropTypes.shape({
                code: PropTypes.string.isRequired,
                displayName: PropTypes.string.isRequired,
                id: PropTypes.string.isRequired,
            }),
        })
    ),
    selectedDataSetOption: PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    }),
}

export const MappingEditWithDataSetForm = ({
    commandId,
    onAfterChange,
    dataTest,
    initialCompletenessMethod,
    onCancel,
}) => {
    const {
        error: loadingMappingError,
        data: commandData,
    } = useReadMetaMappingWithDataSetQuery(commandId)

    const command = commandData?.metaMapping

    const updateMapping = useUpdateMapping({
        commandId,
        onAfterChange,
        formatMapping: formatSmsCodes,
    })

    if (loadingMappingError) {
        const msg = i18n.t(
            "Something went wrong whilst loading the command's details"
        )

        return (
            <NoticeBox error title={msg}>
                {loadingMappingError.message}
            </NoticeBox>
        )
    }

    if (!command) {
        return (
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        )
    }

    const selectedDataSetOption = {
        value: command[FIELD_DATA_SET_NAME].id,
        label: command[FIELD_DATA_SET_NAME].displayName,
    }

    const initialValues = getInitialFormState(
        command,
        initialCompletenessMethod
    )

    const DE_COC_combination_data = command.dataset.dataSetElements.reduce(
        (curCombinations, { dataElement }) => {
            const categoryOptionCombo =
                dataElement.categoryCombo?.categoryOptionCombo

            if (!categoryOptionCombo) {
                return [...curCombinations, { dataElement }]
            }

            const combos = categoryOptionCombo.map(COC => ({
                dataElement,
                categoryOptionCombo: COC,
            }))

            return [...curCombinations, ...combos]
        },
        []
    )

    const specialChars = initialValues[FIELD_COMMAND_SPECIAL_CHARS_NAME]
    const hasSpecialChars = !!specialChars?.length

    return (
        <Form
            keepDirtyOnReinitialize
            onSubmit={updateMapping}
            initialValues={initialValues}
            validate={globalValidate}
            subscription={{ pristine: true }}
        >
            {({ handleSubmit, pristine, dirty }) => (
                <FormComponent
                    DE_COC_combination_data={DE_COC_combination_data}
                    dataTest={dataTest}
                    dirty={dirty}
                    handleSubmit={handleSubmit}
                    pristine={pristine}
                    hasSpecialChars={hasSpecialChars}
                    selectedDataSetOption={selectedDataSetOption}
                    onCancel={onCancel}
                />
            )}
        </Form>
    )
}

MappingEditWithDataSetForm.propTypes = {
    commandId: PropTypes.string.isRequired,
    onAfterChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    dataTest: PropTypes.string,
    initialCompletenessMethod: PropTypes.string,
}
