import { useDataMutation } from '@dhis2/app-runtime'

export const CREATE_DHIS_SERVER_CONFIG_CONSTANT_MUTATION = {
    resource: 'constants',
    type: 'create',
    data: ({ urlTemplate, username, password }) => ({
        displayName: 'DHIS2 Server configs (URL)',
        shortName: 'DHIS2 Server configs',
        code: 'dhis2serverconf',
        name: 'DHIS2 Server configs',
        description: '{"urlTemplate": "' + urlTemplate + '", "username": "' + username + '", "password": "' + password + '"}',
/*        createdBy: {
            code: 'admin', 
            displayName: 'admin admin',
            name: 'admin admin',
            id: 'M5zQapPyTZI',
            username: 'admin',
            },*/
        created: Date.now(),
        lastUpdated: Date.now(),
        value: '-1000003',
    }),
}

export const useCreateDhisServerConfigConstantMutation = () =>
    useDataMutation(CREATE_DHIS_SERVER_CONFIG_CONSTANT_MUTATION)
