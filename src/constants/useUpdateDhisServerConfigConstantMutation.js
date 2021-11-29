import { useDataMutation } from '@dhis2/app-runtime'

export const UPDATE_DHIS_SERVER_CONSTANT_MUTATION = {
    resource: 'constants',
    id: ({ id }) => id,
    type: 'update',
    data: ({ urlTemplate, username, password, id }) => ({
        id: id,
        displayName: 'DHIS2 Server configs (URL)',
        shortName: 'DHIS2 Server configs',
        code: 'dhis2serverconf',
        name: 'DHIS2 Server configs',
        description: '{"id": "' + id + '", "urlTemplate": "' + urlTemplate + '", "username": "' + username + '", "password": "' + password + '"}',
        lastUpdated: Date.now(),
        value: '-1000003',
    }),
}

export const useUpdateDhisServerConfigConstantMutation = () =>
useDataMutation(UPDATE_DHIS_SERVER_CONSTANT_MUTATION)
