import { useDataQuery } from '@dhis2/app-runtime'

const READ_SMS_COMMAND_PROGRAM_STAGE_DATA_ENTRY_PARSER_QUERY = {
    metadataMapping: {
        resource: 'constants',
        id: ({ id }) => id,
        params: {
            fields: [
                '*',
            ],
            paging: 'false',
        },
    },
}

export const useReadMetaMappingProgramStageDataEntryParserQuery = id =>
    useDataQuery(READ_SMS_COMMAND_PROGRAM_STAGE_DATA_ENTRY_PARSER_QUERY, {
        variables: {
            id: id,
        },
    })
