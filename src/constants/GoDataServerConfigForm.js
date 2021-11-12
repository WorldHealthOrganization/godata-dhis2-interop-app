import { Button, ButtonStrip, ReactFinalForm, CircularLoader } from '@dhis2/ui'
import React from 'react'
import { PropTypes } from '@dhis2/prop-types'

import { FormRow } from '../forms'
import {
    FieldGoDataUrlTemplate,
    FieldGoDataUsername,
    FieldGoDataPassword
} from '../constants'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Form } = ReactFinalForm

export const GoDataServerConfigForm = ({
    onCancelClick,
    onSubmit,
    initialValues,
}) => {
    const submitText = initialValues
        ? i18n.t('Save')
        : i18n.t('Add')

    return (
        <Form
            keepDirtyOnReinitialize
            onSubmit={onSubmit}
            initialValues={initialValues}
        >
            {({ handleSubmit, submitting, pristine }) => (
                <form
                    onSubmit={handleSubmit}
                    data-test={dataTest('gateways-gatewaybulksmsform')}
                >
                    <FormRow>
                        <FieldGoDataUrlTemplate />
                    </FormRow>

                    <FormRow>
                        <FieldGoDataUsername />
                    </FormRow>

                    <FormRow>
                        <FieldGoDataPassword />
                    </FormRow>

                    <ButtonStrip>
                        <Button
                            primary
                            type="submit"
                            icon={submitting ? <CircularLoader small /> : null}
                            disabled={submitting}
                            dataTest={dataTest(
                                'forms-gatewaybulksmsform-submit'
                            )}
                        >
                            {submitText}
                        </Button>

                        <Button onClick={() => onCancelClick(pristine)}>
                            {i18n.t('Cancel')}
                        </Button>
                    </ButtonStrip>
                </form>
            )}
        </Form>
    )
}

GoDataServerConfigForm.defaultProps = {
    initialValues: {},
}

GoDataServerConfigForm.propTypes = {
    onCancelClick: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
}
