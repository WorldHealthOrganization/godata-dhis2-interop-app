import React, { useState, useEffect } from 'react'
import {
    SingleSelectFieldFF,
    ReactFinalForm,
    InputFieldFF,
    hasValue,
    Button,
    ButtonStrip,
    CenteredContent,
    CircularLoader,
} from '@dhis2/ui'
import './liveForm.css'
import * as dataStore from '../../../utils/dataStore.js'
import { PageHeadline, PageSubHeadline } from '../../../headline'

export const Form = ({ onSubmit, progData }) => {
    return (
        <ReactFinalForm.Form onSubmit={onSubmit}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className="max800">
                    <PageHeadline>Bidirectional Task Model</PageHeadline>
                    <PageSubHeadline>Input task parameters</PageSubHeadline>
                    <div className="mb">
                        <ReactFinalForm.Field
                            required
                            name="name"
                            label="Task name"
                            component={InputFieldFF}
                            validate={hasValue}
                            initialValue="asdf"
                        />
                    </div>
                    <div className="mb">
                        <ReactFinalForm.Field
                            name="action"
                            label="Action"
                            component={SingleSelectFieldFF}
                            initialValue="import"
                            options={[
                                {
                                    label: 'Import',
                                    value: 'import',
                                },
                                {
                                    label: 'Export',
                                    value: 'export',
                                },
                            ]}
                        />
                    </div>
                    <div className="mb">
                        <ReactFinalForm.Field
                            name="program"
                            label="Program"
                            component={SingleSelectFieldFF}
                            initialValue={
                                progData.programs.programs.length > 0
                                    ? progData.programs.programs[0].id
                                    : undefined
                            }
                            options={progData.programs.programs.map(
                                ({ shortName, id }) =>
                                    new Object({
                                        label: shortName,
                                        value: id,
                                    })
                            )}
                        />
                    </div>

                    <div className="mb">
                        <ReactFinalForm.Field
                            required
                            name="pathSender"
                            label="Sender Path"
                            component={InputFieldFF}
                            validate={hasValue}
                            initialValue="/api/outbreaks/51421ef5-8a59-4937-8e5c-d01a4ad62bb3/cases"
                        />
                    </div>
                    <div className="mb">
                        <ReactFinalForm.Field
                            required
                            name="pathReceiver"
                            label="Receiver Path"
                            component={InputFieldFF}
                            validate={hasValue}
                            initialValue="/api/trackedEntityInstances"
                        />
                    </div>

                    <ButtonStrip>
                        <Button type="submit" primary>
                            Next
                        </Button>
                        <Button type="submit">Cancel</Button>
                    </ButtonStrip>
                </form>
            )}
        </ReactFinalForm.Form>
    )
}
