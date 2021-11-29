import { useDataMutation } from '@dhis2/app-runtime'
import { now } from 'moment'

export const CREATE_GODATA_SERVER_CONFIG_CONSTANT_MUTATION = {
    resource: 'constants',
    type: 'create',
    data: ({ urlTemplate, username, password }) => ({
        displayName: 'Go.Data Server configs (URL)',
        shortName: 'Go.Data Server configs',
        code: 'godataserverconf',
        name: 'Go.Data Server configs',
        description: '{"urlTemplate": "' + urlTemplate + '", "username": "' + username + '", "password": "' + password + '"}',
        createdBy: {
            code: 'admin', 
            displayName: 'admin admin',
            name: 'admin admin',
            id: 'M5zQapPyTZI',
            username: 'admin',
            },
            created: Date.now(),
            lastUpdated: Date.now(),
        value: '-1000001',
    }),
}

export const useCreateGoDataServerConfigConstantMutation = () =>
    useDataMutation(CREATE_GODATA_SERVER_CONFIG_CONSTANT_MUTATION)
