import { useDataMutation } from '@dhis2/app-runtime'

export const UPDATE_GODATA_SERVER_CONSTANT_MUTATION = {
    resource: 'constants',
    id: ({ id }) => id,
    type: 'update',
    data: ({ urlTemplate, username, password, id }) => ({
        id: id,
        displayName: 'Go.Data Server configs (URL)',
        shortName: 'Go.Data Server configs',
        code: 'godataserverconf',
        name: 'Go.Data Server configs',
        description: '{"id": "' + id + '", "urlTemplate": "' + urlTemplate + '", "username": "' + username + '", "password": "' + password + '"}',
        createdBy: {
            code: 'admin', 
            displayName: 'admin admin',
            name: 'admin admin',
            id: 'M5zQapPyTZI',
            username: 'admin',
            },
            lastUpdated: Date.now(),
        value: '1',
    }),
}

export const useUpdateGoDataServerConfigConstantMutation = () =>
useDataMutation(UPDATE_GODATA_SERVER_CONSTANT_MUTATION)
