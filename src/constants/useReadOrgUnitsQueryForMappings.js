import { useDataQuery } from '@dhis2/app-runtime'

export const ORGUNITS_QUERY_MAPPINGS_CODE = {
    programs: {
        resource: 'organisationUnits',
        params: {
            paging: false,
            fields: '*, geometry'
        },
    },
}

export const useReadOrgUnitsQueryForMappings = value =>
    useDataQuery(ORGUNITS_QUERY_MAPPINGS_CODE, { variables: { value } })
