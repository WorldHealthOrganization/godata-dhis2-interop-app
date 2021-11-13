import { useDataQuery } from '@dhis2/app-runtime'

export const READ_META_MAPPING_PARSER_TYPE_QUERY = {
    metaMapping: {
        resource: 'constants',
        id: ({ id }) => id,
        params: {
            fields: 'name',
            paging: 'false',
        },
    },
}

export const useReadMetaMappingParserTypeQuery = id =>
    useDataQuery(READ_META_MAPPING_PARSER_TYPE_QUERY, { variables: { id } })
