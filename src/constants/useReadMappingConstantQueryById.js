import { useDataQuery } from '@dhis2/app-runtime'

export const MAPPING_QUERY_CONSTANT_BY_ID = {
    constant: {
        resource: 'constants',
        id: ({ id }) => id,
        params: {
            fields: ['id', 'displayName', 'code', 'description', 'shortName', 'name'],
        },
    },
}

export const useReadMappingConstantQueryById = id =>
    useDataQuery(MAPPING_QUERY_CONSTANT_BY_ID, { variables: { id } })
