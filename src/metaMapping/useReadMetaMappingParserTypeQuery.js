import { useDataQuery } from '@dhis2/app-runtime'

export const READ_META_MAPPING_PARSER_TYPE_QUERY = {
    smsCommand: {
        resource: 'smsCommands',
        id: ({ id }) => id,
        params: {
            fields: 'parserType',
            paging: 'false',
        },
    },
}

export const useReadMetaMappingParserTypeQuery = id =>
    useDataQuery(READ_META_MAPPING_PARSER_TYPE_QUERY, { variables: { id } })
