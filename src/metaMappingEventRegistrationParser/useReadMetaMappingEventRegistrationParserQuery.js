import { useDataQuery } from '@dhis2/app-runtime'

export const READ_META_MAPPING_EVENT_REGISTRATION_PARSER_QUERY = {
    smsCommand: {
        resource: 'smsCommands',
        id: ({ id }) => id,
        params: {
            fields: [
                '*',
                'program[id,displayName]',
                'programStage[id,displayName,programStageDataElements[id,dataElement[id,displayName]]',
            ],
            paging: 'false',
        },
    },
}

export const useReadMetaMappingEventRegistrationParserQuery = id =>
    useDataQuery(READ_META_MAPPING_EVENT_REGISTRATION_PARSER_QUERY, {
        variables: { id },
    })
