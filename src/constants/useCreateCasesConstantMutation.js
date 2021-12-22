import { useDataMutation } from '@dhis2/app-runtime'

export const CREATE_CASES_CONSTANT_MUTATION = {
    resource: 'constants',
    type: 'create',
    data: ({ allValues, nameInput }) => ({
        //displayName: 'Go.Data (URL)1',
        shortName: nameInput,
        //code: 'dhis2serverconf',
        name: nameInput,
        description: JSON.stringify(allValues) ,
/*        createdBy: {
            code: 'admin', 
            displayName: 'admin admin',
            name: 'admin admin',
            id: 'M5zQapPyTZI',
            username: 'admin',
            },*/
            created: Date.now(),
            lastUpdated: Date.now(),
        value: '-1000000',
    }),
}

export const useCreateCasesConstantMutation = () =>
    useDataMutation(CREATE_CASES_CONSTANT_MUTATION)
