import { useDataQuery } from '@dhis2/app-runtime'

export const META_DATA_MAPPINGS_QUERY = {
    metadataMappings: {
        resource: 'constants',
        pager: false,
        params: ({ ids } = {}) => ({
            // @TODO: Why is `paging: false` not working?
            paging: 'false',
            fields: '*',
            filter: ids ? `ids:in:[${ids.join(',')}]` : undefined,
        }),
    },
}

export const useReadMetaMappingsQuery = () => useDataQuery(META_DATA_MAPPINGS_QUERY)
