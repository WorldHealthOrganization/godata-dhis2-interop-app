import { useDataMutation } from '@dhis2/app-runtime'

export const CREATE_TASK_CONSTANT_MUTATION = {
    resource: 'constants',
    type: 'create',
    data: ({ allValues, nameInput }) => ({
        //displayName: 'Go.Data (URL)1',
        shortName: nameInput,
        //code: 'cases1',
        name: nameInput,
        description: JSON.stringify(allValues) ,
        createdBy: {
            code: 'admin', 
            displayName: 'admin admin',
            name: 'admin admin',
            id: 'M5zQapPyTZI',
            username: 'admin',
            },
            created: Date.now(),
            lastUpdated: Date.now(),
        value: '-1000002',
    }),
}

export const useCreateTaskConstantMutation = () =>
    useDataMutation(CREATE_TASK_CONSTANT_MUTATION)
