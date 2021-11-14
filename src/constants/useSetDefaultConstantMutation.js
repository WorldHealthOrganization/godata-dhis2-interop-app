import { useDataMutation } from '@dhis2/app-runtime'

export const SET_DEFAULT_CONSTANT_MUTATION = {
    resource: 'gateways/default',
    type: 'replace',
    id: ({ id }) => id,
}

export const useSetDefaultConstantMutation = () =>
    useDataMutation(SET_DEFAULT_CONSTANT_MUTATION)
