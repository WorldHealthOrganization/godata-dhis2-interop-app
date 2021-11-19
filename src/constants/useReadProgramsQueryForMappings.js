import { useDataQuery } from '@dhis2/app-runtime'

export const PROGRAM_QUERY_MAPPINGS_CODE = {
    programs: {
        resource: 'programs',
        params: {
            paging: false,
            fields: ['*']
        },
    },
}

export const useReadProgramsQueryForMappings = value =>
    useDataQuery(PROGRAM_QUERY_MAPPINGS_CODE, { variables: { value } })
