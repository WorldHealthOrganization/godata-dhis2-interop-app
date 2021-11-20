import { useDataQuery } from '@dhis2/app-runtime'

export const PROGRAM_QUERY_MAPPINGS_CODE = {
    programs: {
        resource: 'programs',
        params: {
            paging: false,
            fields: ['lastUpdated',
            'id',
            'created',
            'name',
            'shortName',
            'completeEventsExpiryDays',
            'description',
            'ignoreOverdueEvents',
            'skipOffline',
            'featureType',
            'minAttributesRequiredToSearch',
            'displayFrontPageList',
            'onlyEnrollOnce',
            'programType',
            'accessLevel',
            'version',
            'maxTeiCountToReturn',
            'selectIncidentDatesInFuture',
            'displayIncidentDate',
            'selectEnrollmentDatesInFuture',
            'expiryDays',
            'useFirstStageDuringRegistration',
            'relatedProgram',
            'categoryCombo',
            'lastUpdatedBy',
            'createdBy',
            'trackedEntityType',
            'notificationTemplates']
        },
    },
}

export const useReadProgramsQueryForMappings = value =>
    useDataQuery(PROGRAM_QUERY_MAPPINGS_CODE, { variables: { value } })
