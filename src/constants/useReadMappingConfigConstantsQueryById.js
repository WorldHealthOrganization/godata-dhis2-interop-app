import { useDataQuery } from '@dhis2/app-runtime'

export const CONSTANT_QUERY_CONSTANT_BY_ID = {
    constant: {
        resource: 'constants',
        id: ({ id }) => id,
    },
}

export const useReadMappingConfigConstantsQueryById = id =>
    useDataQuery(CONSTANT_QUERY_CONSTANT_BY_ID, { variables: { id } })
