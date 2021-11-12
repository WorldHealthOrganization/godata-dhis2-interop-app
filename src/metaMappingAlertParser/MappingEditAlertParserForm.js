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
    FieldMappingName,
    FieldMappingParser,
    FieldMappingConfirmMessage,
} from '../metaMappingFields'
import { MappingFormActions, useUpdateMapping } from '../metaMapping'
import { FieldUserGroup } from '../userGroup'
import { FormRow } from '../forms'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Form } = ReactFinalForm

const query = {
    smsMapping: {
        resource: 'smsMappings',
        id: ({ commandId }) => commandId,
        params: {
            fields: [
                'name',
                'parserType',
                'receivedMessage',
                'userGroup[name,id]',
            ],
        },
    },
}

export const MappingEditAlertParserForm = ({
    commandId,
    onAfterChange,
    onCancel,
}) => {
    const updateMapping = useUpdateMapping({
        commandId,
        onAfterChange,
        replace: true,
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

    const { name, parserType, receivedMessage, userGroup } = data.smsMapping
    const initialValues = {
        name,
        parserType,
        receivedMessage,
        userGroup: userGroup.id,
    }
    const userGroups = [
        {
            value: userGroup.id,
            label: userGroup.name,
        },
    ]

    return (
        <Form
            keepDirtyOnReinitialize
            onSubmit={updateMapping}
            initialValues={initialValues}
        >
            {({ handleSubmit, pristine }) => (
                <form
                    onSubmit={handleSubmit}
                    data-test={dataTest('commands-commandeditalertparserform')}
                >
                    <FormRow>
                        <FieldMappingName />
                    </FormRow>

                    <FormRow>
                        <FieldMappingParser disabled />
                    </FormRow>

                    <FormRow>
                        <FieldUserGroup disabled userGroups={userGroups} />
                    </FormRow>

                    <FormRow>
                        <FieldMappingConfirmMessage />
                    </FormRow>

                    <MappingFormActions onCancel={() => onCancel(pristine)} />
                </form>
            )}
        </Form>
    )
}

MappingEditAlertParserForm.propTypes = {
    commandId: PropTypes.string.isRequired,
    onAfterChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
}
