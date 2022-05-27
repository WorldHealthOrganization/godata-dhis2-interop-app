import { useDataQuery } from '@dhis2/app-runtime'

//http://localhost:8080/api/34/programs.json?filter=id:eq:uYjxkTbwRNf&paging=false&fields=lastUpdated,id,created,name,shortName,completeEventsExpiryDays,description,ignoreOverdueEvents,skipOffline,featureType,minAttributesRequiredToSearch,displayFrontPageList,onlyEnrollOnce,programType,accessLevel,version,maxTeiCountToReturn,selectIncidentDatesInFuture,displayIncidentDate,selectEnrollmentDatesInFuture,expiryDays,useFirstStageDuringRegistration,relatedProgram,categoryCombo,lastUpdatedBy,createdBy,trackedEntityType,notificationTemplates,programTrackedEntityAttributes[trackedEntityAttribute[id%2C%20name]],programStages[id%2C%20name%2C%20programStageDataElements[dataElement[id%2C%20name]]

//Tener type y program select

export const PROGRAM_WITH_STAGES_QUERY_MAPPINGS_CODE = {
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
            'notificationTemplates',
            'programTrackedEntityAttributes[trackedEntityAttribute[id, name]]',
            'programStages[id, name, programStageDataElements[dataElement[id, name]]'
        ]
        },
    },
}

export const useReadProgramsWithStagesQueryForMappings = value =>
    useDataQuery(PROGRAM_WITH_STAGES_QUERY_MAPPINGS_CODE, { variables: { value } })
