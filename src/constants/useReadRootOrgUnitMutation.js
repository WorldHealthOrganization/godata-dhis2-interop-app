import { useDataQuery } from '@dhis2/app-runtime'

export const ROOT_ORG_UNIT = {
    organisationUnits: {
        resource: 'organisationUnits',
        params: {
            paging: false,
            fields: ['id', 'displayName', 'code', 'description', 'shortName'],
            filter: ['parentId:eq:NULL'],
        },
    },
}

export const useReadRootOrgUnitMutation = value =>
    useDataQuery(ROOT_ORG_UNIT, { variables: { value } })
