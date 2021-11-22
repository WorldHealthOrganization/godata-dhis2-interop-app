import { useDataMutation } from '@dhis2/app-runtime'

export const UPDATE_CASES_CONSTANT_MUTATION = {
    resource: 'constants',
    id: ({ id }) => id,
    type: 'update',
    data: ({ godataValue, inpu }) => ({
        //displayName: 'Go.Data (URL)1',
        shortName: inpu,
        //code: 'cases1',
        name: inpu,
        description: JSON.stringify(godataValue) ,
        createdBy: {
            code: 'admin', 
            displayName: 'admin admin',
            name: 'admin admin',
            id: 'M5zQapPyTZI',
            username: 'admin',
            },
            created: Date.now(),
            lastUpdated: Date.now(),
        value: '-1000000',
    }),
}

export const useUpdateCasesConstantMutation = () =>
useDataMutation(UPDATE_CASES_CONSTANT_MUTATION)
