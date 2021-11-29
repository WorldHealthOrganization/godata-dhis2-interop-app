import { useDataQuery } from '@dhis2/app-runtime'

export const CONSTANT_QUERY_CONFIG_CODE = {
    constants: {
        resource: 'constants',
        params: {
            paging: false,
            fields: ['id', 'displayName', 'code', 'description'],
            filter: ['value:eq:-1000001'],
        },
    },
}

export const useReadMappingConfigConstantsQueryForGodataConfig = value =>
    useDataQuery(CONSTANT_QUERY_CONFIG_CODE, { variables: { value } })
