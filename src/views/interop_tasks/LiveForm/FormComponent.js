import React, { useState, useEffect } from 'react'
import {
    SingleSelectField,
    SingleSelectFieldFF,
    ReactFinalForm,
    InputFieldFF,
    hasValue,
    Button,
    ButtonStrip,
    SingleSelectOption,
    CenteredContent,
    CircularLoader,
} from '@dhis2/ui'
import './liveForm.css'
import { PageHeadline, PageSubHeadline } from '../../../headline'
import { Task } from '../../../models/task.js'

const { Form, Field } = ReactFinalForm

export const FormComponent = ({ onSubmit, progData }) => {
    const taskTypeOptions = () =>
        Object.entries(Task.bidirectionalTaskType).map(
            ([label, value]) =>
                new Object({
                    label,
                    value,
                })
        )
    return (
        <Form onSubmit={onSubmit}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className="max800">
                    <PageHeadline>Bidirectional Task Model</PageHeadline>
                    <PageSubHeadline>Input task parameters</PageSubHeadline>
                    {/* <div className="mb">
                        <Field
                            required
                            name="name"
                            label="Task name"
                            component={InputFieldFF}
                            validate={hasValue}
                            initialValue="asdf"
                        />
                    </div> */}
                    <div className="mb">
                        <ReactFinalForm.Field
                            name="action"
                            label="Action"
                            component={SingleSelectFieldFF}
                            initialValue="export"
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
                            <Field
                                name="taskType"
                                label="Task Type"
                                component={SingleSelectFieldFF}
                                initialValue="programs"
                                options={taskTypeOptions()}
                            />
                        </div>

                    <div className="mb">
                        <Field
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
                        <Field
                            required
                            name="pathSender"
                            label="Sender Path"
                            component={InputFieldFF}
                            validate={hasValue}
                            //initialValue="/api/programs?fields=*&paging=false"
                            initialValue="/api/trackedEntityInstances.json?ouMode=ALL&fields=*"
                        />
                    </div>
                    <div className="mb">
                        <Field
                            required
                            name="pathReceiver"
                            label="Receiver Path"
                            component={InputFieldFF}
                            validate={hasValue}
                            //initialValue="/api/outbreaks"
                            initialValue="/api/outbreaks/5d03e3bd-cf77-4c9a-b4d0-6245c0ec1926/cases"
                        />
                    </div>

                    <ButtonStrip>
                        <Button type="submit" primary>
                            Next
                        </Button>
                    </ButtonStrip>
                </form>
            )}
        </Form>
    )
}
