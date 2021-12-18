import { useDataQuery } from '@dhis2/app-runtime'

export const ENTITY_QUERY_MAPPINGS_CODE = {
    trackedEntityInstances: {
        resource: 'trackedEntityInstances',
        params: {
            paging: false,
            ou: 'ImspTQPwCqd',
            ouMode: 'DESCENDANTS'
        },
    },
}

export const useReadTrackedEntityInstancesQueryForMappings = value =>
    useDataQuery(ENTITY_QUERY_MAPPINGS_CODE, { variables: { value } })
