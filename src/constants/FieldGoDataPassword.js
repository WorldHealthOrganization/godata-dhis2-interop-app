import {
    InputFieldFF,
    ReactFinalForm,
    composeValidators,
    hasValue,
    string,
} from '@dhis2/ui'
import React from 'react'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Field } = ReactFinalForm

export const FIELD_GODATA_PASSWORD_NAME = 'password'
export const FIELD_GODATA_PASSWORD_LABEL = i18n.t('Password')

export const FieldGoDataPassword = () => (
    <Field
        required
        type="password"
        dataTest={dataTest('gateways-fieldgatewaypassword')}
        name={FIELD_GODATA_PASSWORD_NAME}
        label={FIELD_GODATA_PASSWORD_LABEL}
        component={InputFieldFF}
        validate={composeValidators(string, hasValue)}
    />
)
