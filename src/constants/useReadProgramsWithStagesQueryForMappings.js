import { useDataQuery } from '@dhis2/app-runtime'

export const PROGRAM_WITH_STAGES_QUERY_MAPPINGS_CODE = {
    programs: {
        resource: 'programs',
        params: {
            skipPaging: true,
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
            'notificationTemplates',
            'programTrackedEntityAttributes[trackedEntityAttribute[id, name]]',
            'programStages[id, name, programStageDataElements[dataElement[id, name]]'
        ]
        },
    },
}

export const useReadProgramsWithStagesQueryForMappings = value =>
    useDataQuery(PROGRAM_WITH_STAGES_QUERY_MAPPINGS_CODE, { variables: { value } })
