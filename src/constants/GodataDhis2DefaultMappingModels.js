export const GODATA_DHIS_OUTBREAK_MODEL = [
    {
        godataValue: [
            [{ conversionType: 'Go.Data Outbreak' }],
            [
                {
                    godata: 'name',
                    dhis2: 'name',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'disease',
                    dhis2: 'LNG_REFERENCE_DATA_CATEGORY_DISEASE_2019_N_CO_V',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'locationIds.0',
                    dhis2: 'organisationUnits.0.id',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'startDate',
                    dhis2: 'created',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'longPeriodsBetweenCaseOnset',
                    dhis2: '12',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'periodOfFollowup',
                    dhis2: '14',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'noDaysNewContacts',
                    dhis2: '1',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'reportingGeographicalLevelId',
                    dhis2: 'LNG_REFERENCE_DATA_CATEGORY_LOCATION_GEOGRAPHICAL_LEVEL_ADMIN_LEVEL_0',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'frequencyOfFollowUp',
                    dhis2: '2',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'frequencyOfFollowUpPerDay',
                    dhis2: '1',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'generateFollowUpsOverwriteExisting',
                    dhis2: 'true',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'generateFollowUpsKeepTeamAssignment',
                    dhis2: 'true',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'generateFollowUpsTeamAssignmentAlgorithm',
                    dhis2: 'LNG_REFERENCE_DATA_CATEGORY_FOLLOWUP_GENERATION_TEAM_ASSIGNMENT_ALGORITHM_ROUND_ROBIN_ALL_TEAMS',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'generateFollowUpsDateOfLastContact',
                    dhis2: '',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'noDaysAmongContacts',
                    dhis2: '5',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'noDaysInChains',
                    dhis2: '1',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'noDaysNotSeen',
                    dhis2: '0',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'noLessContacts',
                    dhis2: '2',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'noDaysNewContacts',
                    dhis2: '',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'caseIdMask',
                    dhis2: '9999999999',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'contactIdMask',
                    dhis2: '9999999999',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'reportingGeographicalLevelId',
                    dhis2: '',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'isContactLabResultsActive',
                    dhis2: '',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'contactOfContactIdMask',
                    dhis2: '9999999999',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'isContactsOfContactsActive',
                    dhis2: 'true',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'isDateOfOnsetRequired',
                    dhis2: 'no',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'applyGeographicRestrictions',
                    dhis2: 'true',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'id',
                    dhis2: 'id',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'createdAt',
                    dhis2: 'created',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'createdBy',
                    dhis2: 'createdBy.name',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'updatedAt',
                    dhis2: 'lastUpdated',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'updatedBy',
                    dhis2: 'lastUpdatedBy.displayName',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'createdOn',
                    dhis2: 'created',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'deleted',
                    dhis2: 'skipOffline',
                    props: {
                        conversion: 'true',
                        values: { true: 'yes', fasle: 'no', false: 'no' },
                    },
                },
            ],
        ],
    },
    {},
    {},
]
export const GODATA_DHIS_LOCATION_MODEL = [
    {
        godataValue: [
            [{ conversionType: 'Go.Data Location' }],
            [
                {
                    godata: 'name',
                    dhis2: 'name',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'active',
                    dhis2: 'true',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'populationDensity',
                    dhis2: '0',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'parentLocationId',
                    dhis2: 'parent.id',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'geographicalLevelId',
                    dhis2: 'level',
                    props: {
                        conversion: 'true',
                        values: {
                            'Admin Level 1': '2',
                            'Admin Level 0': '1',
                            'Admin Level 2': '3',
                            'Admin Level 3': '4',
                            'Admin Level 4': '5',
                        },
                    },
                },
                {
                    godata: 'id',
                    dhis2: 'id',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'createdAt',
                    dhis2: 'openingDate',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'createdBy',
                    dhis2: 'system',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'updatedAt',
                    dhis2: 'lastUpdated',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'updatedBy',
                    dhis2: 'system',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'createdOn',
                    dhis2: 'created',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'deleted',
                    dhis2: 'false',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'deletedAt',
                    dhis2: '',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'geoLocation.lat',
                    dhis2: 'geometry.type',
                    props: { conversion: 'geo', values: {} },
                },
                {
                    godata: 'geoLocation.lng',
                    dhis2: 'geometry.type',
                    props: { conversion: 'geo', values: {} },
                },
                {
                    godata: 'identifiers.0.code',
                    dhis2: 'code',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'identifiers.0.description',
                    dhis2: 'displayFormName',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'synonyms.0',
                    dhis2: 'displayFormName',
                    props: { conversion: 'true', values: {} },
                },
            ],
        ],
    },
    {},
    {},
]

export const GODATA_DHIS_PROGRAM_TO_EVENT_MODEL = [
    {
        godataValue: [
            [
                {
                    conversionType: 'Go.Data Event',
                },
            ],
            [
                {
                    dhis2: 'classification',
                    props: {
                        values: {},
                        conversion: 'false',
                    },
                    godata: 'classification',
                    dhis2Description: 'classification',
                },
                {
                    dhis2: 'UNKNOWN',
                    props: {
                        values: {},
                        conversion: 'false',
                    },
                    godata: 'firstName',
                    dhis2Description: 'UNKNOWN',
                },
                {
                    dhis2: 'event',
                    props: {
                        values: {},
                        conversion: 'true',
                    },
                    godata: 'name',
                },
                {
                    dhis2: 'eventDate',
                    props: {
                        values: {},
                        conversion: 'true',
                    },
                    godata: 'dateApproximate',
                },
                {
                    dhis2: 'Sample description',
                    props: {
                        values: {},
                        conversion: 'false',
                    },
                    godata: 'description',
                    dhis2Description: 'Sample description',
                },
                {
                    dhis2: 'event',
                    props: {
                        values: {},
                        conversion: 'true',
                    },
                    godata: 'id',
                },
                {
                    dhis2: 'c8e8e7ba-653f-4b2d-b157-9d6ab88705ad',
                    props: {
                        values: {},
                        conversion: 'false',
                    },
                    godata: 'outbreakId',
                    dhis2Description: 'c8e8e7ba-653f-4b2d-b157-9d6ab88705ad',
                },
                {
                    dhis2: 'dueDate',
                    props: {
                        values: {},
                        conversion: 'true',
                    },
                    godata: 'dateOfReporting',
                },
                {
                    dhis2: 'eventDate',
                    props: {
                        values: {},
                        conversion: 'true',
                    },
                    godata: 'isDateOfReportingApproximate',
                },
            ],
        ],
    },
    {
        id: 'string',
        date: '2022-05-14T15:46:05.270Z',
        name: 'string',
        address: {
            city: 'string',
            date: '2022-05-14T15:46:05.270Z',
            typeId: 'LNG_REFERENCE_DATA_CATEGORY_ADDRESS_TYPE_USUAL_PLACE_OF_RESIDENCE',
            country: 'string',
            locationId: 'string',
            postalCode: 'string',
            geoLocation: {
                lat: 0,
                lng: 0,
            },
            phoneNumber: 'string',
            addressLine1: 'string',
            emailAddress: 'string',
            geoLocationAccurate: false,
        },
        deleted: false,
        visualId: 'string',
        createdAt: '2022-05-14T15:46:05.271Z',
        createdBy: 'string',
        createdOn: 'string',
        deletedAt: '2022-05-14T15:46:05.271Z',
        updatedAt: '2022-05-14T15:46:05.271Z',
        updatedBy: 'string',
        outbreakId: 'string',
        description: 'string',
        followUpTeamId: 'string',
        dateApproximate: true,
        dateOfReporting: '2022-05-14T15:46:05.270Z',
        deletedByParent: 'string',
        pregnancyStatus: 'string',
        hasRelationships: false,
        notDuplicatesIds: ['string'],
        numberOfContacts: 0,
        vaccinesReceived: [
            {
                date: '2022-05-14T15:46:05.270Z',
                status: 'string',
                vaccine: 'string',
            },
        ],
        dateOfLastContact: '2022-05-14T15:46:05.270Z',
        numberOfExposures: 0,
        responsibleUserId: 'string',
        relationshipsRepresentation: [
            {
                id: 'string',
                active: true,
                source: true,
                target: true,
                otherParticipantId: 'string',
                otherParticipantType: 'string',
            },
        ],
        isDateOfReportingApproximate: false,
        usualPlaceOfResidenceLocationId: 'string',
    },
    {
        href: 'http://localhost:8080/api/events/zkFowSfmyBM',
        event: 'zkFowSfmyBM',
        notes: [
            {
                note: 'XMN8tF7aPiU',
                value: 'Event example',
                storedBy: 'admin',
                storedDate: '2022-05-13T01:58:02.178',
                lastUpdated: '2022-05-13T01:58:02.178',
                lastUpdatedBy: {
                    uid: 'M5zQapPyTZI',
                    surname: 'admin',
                    username: 'admin',
                    firstName: 'admin',
                },
            },
        ],
        status: 'COMPLETED',
        created: '2022-05-13T01:58:02.176',
        deleted: false,
        dueDate: '2022-05-13T01:58:02.171',
        orgUnit: 'zTHjIvPmPI0',
        program: 'HFztYmEhb3r',
        followup: false,
        storedBy: 'admin',
        eventDate: '2022-05-11T00:00:00.000',
        enrollment: 'O38mqrlnkdW',
        completedBy: 'admin',
        lastUpdated: '2022-05-13T01:58:02.233',
        orgUnitName: 'Bo District',
        programStage: 'q1eg3YIkRlc',
        completedDate: '2022-05-13T00:00:00.000',
        createdAtClient: '2022-05-13T01:58:02.176',
        enrollmentStatus: 'ACTIVE',
        createdByUserInfo: {
            uid: 'M5zQapPyTZI',
            surname: 'admin',
            username: 'admin',
            firstName: 'admin',
        },
        lastUpdatedAtClient: '2022-05-13T01:58:02.233',
        attributeOptionCombo: 'HllvX50cXC0',
        lastUpdatedByUserInfo: {
            uid: 'M5zQapPyTZI',
            surname: 'admin',
            username: 'admin',
            firstName: 'admin',
        },
        attributeCategoryOptions: 'xYerKDKCefk',
    },
]

export const GODATA_DHIS_PROGRAM_TO_CASE_MODEL = [
    {
        godataValue: [
            [
                {
                    conversionType: 'Go.Data Case',
                },
            ],
            [
                {
                    godata: 'firstName',
                    dhis2: 'sB1IHYu2xQT',
                    props: {
                        conversion: 'attr',
                        values: {},
                    },
                },
                {
                    godata: 'gender',
                    dhis2: 'oindugucx72',
                    props: {
                        conversion: 'attr',
                        values: {},
                    },
                },
                {
                    godata: 'classification',
                    dhis2: 'classification',
                    props: {
                        conversion: 'false',
                        values: {},
                    },
                },
                {
                    godata: 'riskReason',
                    dhis2: 'fyzp8BpsPMl',
                    props: {
                        conversion: 'delm',
                        values: {},
                    },
                },
                {
                    godata: 'safeBurial',
                    dhis2: 'true',
                    props: {
                        conversion: 'false',
                        values: {},
                    },
                },
                {
                    godata: 'wasCase',
                    dhis2: 'no',
                    props: {
                        conversion: 'false',
                        values: {},
                    },
                },
                {
                    godata: 'active',
                    dhis2: 'true',
                    props: {
                        conversion: 'false',
                        values: {},
                    },
                },
                {
                    godata: 'id',
                    dhis2: 'HAZ7VQ730yn',
                    props: {
                        conversion: 'attr',
                        values: {},
                    },
                },
                {
                    godata: 'outbreakId',
                    dhis2: '1baf28ab-9a4d-4a3f-aca1-9a18683977df',
                    props: {
                        conversion: 'false',
                        values: {},
                    },
                },
                {
                    godata: 'visualId',
                    dhis2: 'he05i8FUwu3',
                    props: {
                        conversion: 'attr',
                        values: {},
                    },
                },
                {
                    godata: 'middleName',
                    dhis2: 'ENRjVGxVL6l',
                    props: {
                        conversion: 'attr',
                        values: {},
                    },
                },
                {
                    godata: 'lastName',
                    dhis2: '',
                    props: {
                        conversion: 'false',
                        values: {},
                    },
                },
                {
                    godata: 'occupation',
                    dhis2: 'ooK7aSiAaGq',
                    props: {
                        conversion: 'attr',
                        values: {},
                    },
                },
                {
                    godata: 'dateOfReporting',
                    dhis2: 's3eoonJ8OJb',
                    props: {
                        conversion: 'delm',
                        values: {},
                    },
                },
                {
                    godata: 'isDateOfReportingApproximate',
                    dhis2: 'yes',
                    props: {
                        conversion: 'false',
                        values: {},
                    },
                },
                {
                    godata: 'dateOfLastContact',
                    dhis2: '',
                    props: {
                        conversion: 'true',
                        values: {},
                    },
                },
                {
                    godata: 'followUpTeamId',
                    dhis2: '',
                    props: {
                        conversion: 'false',
                        values: {},
                    },
                },
                {
                    godata: 'hasRelationships',
                    dhis2: '',
                    props: {
                        conversion: 'true',
                        values: {},
                    },
                },
                {
                    godata: 'usualPlaceOfResidenceLocationId',
                    dhis2: '',
                    props: {
                        conversion: 'true',
                        values: {},
                    },
                },
                {
                    godata: 'responsibleUserId',
                    dhis2: '',
                    props: {
                        conversion: 'true',
                        values: {},
                    },
                },
                {
                    godata: 'createdAt',
                    dhis2: '',
                    props: {
                        conversion: 'true',
                        values: {},
                    },
                },
                {
                    godata: 'createdBy',
                    dhis2: '',
                    props: {
                        conversion: 'true',
                        values: {},
                    },
                },
                {
                    godata: 'updatedAt',
                    dhis2: '',
                    props: {
                        conversion: 'true',
                        values: {},
                    },
                },
                {
                    godata: 'updatedBy',
                    dhis2: '',
                    props: {
                        conversion: 'true',
                        values: {},
                    },
                },
                {
                    godata: 'createdOn',
                    dhis2: '',
                    props: {
                        conversion: 'true',
                        values: {},
                    },
                },
                {
                    godata: 'deleted',
                    dhis2: 'false',
                    props: {
                        conversion: 'false',
                        values: {},
                    },
                },
                {
                    godata: 'duplicateKeys.name.0',
                    dhis2: '',
                    props: {
                        conversion: 'true',
                        values: {},
                    },
                },
                {
                    godata: 'duplicateKeys.name.1',
                    dhis2: '',
                    props: {
                        conversion: 'true',
                        values: {},
                    },
                },
                {
                    godata: 'duplicateKeys.name.2',
                    dhis2: '',
                    props: {
                        conversion: 'true',
                        values: {},
                    },
                },
                {
                    godata: 'relationshipsRepresentation.0.id',
                    dhis2: '',
                    props: {
                        conversion: 'true',
                        values: {},
                    },
                },
                {
                    godata: 'relationshipsRepresentation.0.active',
                    dhis2: '',
                    props: {
                        conversion: 'true',
                        values: {},
                    },
                },
                {
                    godata: 'relationshipsRepresentation.0.otherParticipantType',
                    dhis2: '',
                    props: {
                        conversion: 'true',
                        values: {},
                    },
                },
                {
                    godata: 'relationshipsRepresentation.0.otherParticipantId',
                    dhis2: '',
                    props: {
                        conversion: 'true',
                        values: {},
                    },
                },
                {
                    godata: 'relationshipsRepresentation.0.target',
                    dhis2: '',
                    props: {
                        conversion: 'true',
                        values: {},
                    },
                },
                {
                    godata: 'followUp.originalStartDate',
                    dhis2: '',
                    props: {
                        conversion: 'true',
                        values: {},
                    },
                },
                {
                    godata: 'followUp.startDate',
                    dhis2: '',
                    props: {
                        conversion: 'true',
                        values: {},
                    },
                },
                {
                    godata: 'followUp.endDate',
                    dhis2: '',
                    props: {
                        conversion: 'true',
                        values: {},
                    },
                },
                {
                    godata: 'followUp.status',
                    dhis2: '',
                    props: {
                        conversion: 'true',
                        values: {},
                    },
                },
                {
                    godata: 'followUpHistory.0.status',
                    dhis2: '',
                    props: {
                        conversion: 'true',
                        values: {},
                    },
                },
                {
                    godata: 'followUpHistory.0.startDate',
                    dhis2: '',
                    props: {
                        conversion: 'true',
                        values: {},
                    },
                },
                {
                    godata: 'addresses.0.typeId',
                    dhis2: '',
                    props: {
                        conversion: 'true',
                        values: {},
                    },
                },
                {
                    godata: 'addresses.0.city',
                    dhis2: '',
                    props: {
                        conversion: 'true',
                        values: {},
                    },
                },
                {
                    godata: 'addresses.0.addressLine1',
                    dhis2: 'Xhdn49gUd52',
                    props: {
                        conversion: 'attr',
                        values: {},
                    },
                },
                {
                    godata: 'addresses.0.postalCode',
                    dhis2: '',
                    props: {
                        conversion: 'true',
                        values: {},
                    },
                },
                {
                    godata: 'addresses.0.locationId',
                    dhis2: 'arPkmfgnHgW',
                    props: {
                        conversion: 'delm',
                        values: {},
                    },
                },
                {
                    godata: 'addresses.0.geoLocationAccurate',
                    dhis2: 'false',
                    props: {
                        conversion: 'false',
                        values: {},
                    },
                },
                {
                    godata: 'addresses.0.date',
                    dhis2: 'NI0QRzJvQ0k',
                    props: {
                        conversion: 'attr',
                        values: {},
                    },
                },
                {
                    godata: 'addresses.0.phoneNumber',
                    dhis2: 'fctSQp5nAYl',
                    props: {
                        conversion: 'attr',
                        values: {},
                    },
                },
                {
                    godata: 'addresses.0.emailAddress',
                    dhis2: 'noemail@noemail.no',
                    props: {
                        conversion: 'false',
                        values: {},
                    },
                },
                {
                    godata: 'age.years',
                    dhis2: 'Rv8WM2mTuS5',
                    props: {
                        conversion: 'attr',
                        values: {},
                    },
                },
                {
                    godata: 'age.months',
                    dhis2: '0',
                    props: {
                        conversion: 'false',
                        values: {},
                    },
                },
            ],
        ],
    },
    {},
    {},
]
export const GODATA_DHIS_PROGRAM_TO_CONTACT_MODEL = [
    {
        godataValue: [
            [{ conversionType: 'Go.Data Contact' }],
            [
                {
                    godata: 'firstName',
                    dhis2: 'sB1IHYu2xQT',
                    props: { conversion: 'attr', values: {} },
                },
                {
                    godata: 'gender',
                    dhis2: 'oindugucx72',
                    props: { conversion: 'attr', values: {} },
                },
                {
                    godata: 'riskReason',
                    dhis2: 'fyzp8BpsPMl',
                    props: { conversion: 'delm', values: {} },
                },
                {
                    godata: 'safeBurial',
                    dhis2: 'true',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'wasCase',
                    dhis2: 'no',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'active',
                    dhis2: 'true',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'id',
                    dhis2: 'HAZ7VQ730yn',
                    props: { conversion: 'attr', values: {} },
                },
                {
                    godata: 'outbreakId',
                    dhis2: '8f84c8ab-b342-448c-8f3c-9a816a228127',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'visualId',
                    dhis2: 'he05i8FUwu3',
                    props: { conversion: 'attr', values: {} },
                },
                {
                    godata: 'middleName',
                    dhis2: 'ENRjVGxVL6l',
                    props: { conversion: 'attr', values: {} },
                },
                {
                    godata: 'lastName',
                    dhis2: '',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'occupation',
                    dhis2: 'ooK7aSiAaGq',
                    props: { conversion: 'attr', values: {} },
                },
                {
                    godata: 'dateOfReporting',
                    dhis2: 's3eoonJ8OJb',
                    props: { conversion: 'delm', values: {} },
                },
                {
                    godata: 'isDateOfReportingApproximate',
                    dhis2: 'yes',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'dateOfLastContact',
                    dhis2: '',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'followUpTeamId',
                    dhis2: '',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'hasRelationships',
                    dhis2: '',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'usualPlaceOfResidenceLocationId',
                    dhis2: '',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'responsibleUserId',
                    dhis2: '',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'createdAt',
                    dhis2: '',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'createdBy',
                    dhis2: '',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'updatedAt',
                    dhis2: '',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'updatedBy',
                    dhis2: '',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'createdOn',
                    dhis2: '',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'deleted',
                    dhis2: 'false',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'duplicateKeys.name.0',
                    dhis2: '',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'duplicateKeys.name.1',
                    dhis2: '',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'duplicateKeys.name.2',
                    dhis2: '',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'relationshipsRepresentation.0.id',
                    dhis2: '',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'relationshipsRepresentation.0.active',
                    dhis2: '',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'relationshipsRepresentation.0.otherParticipantType',
                    dhis2: '',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'relationshipsRepresentation.0.otherParticipantId',
                    dhis2: '',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'relationshipsRepresentation.0.target',
                    dhis2: '',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'followUp.originalStartDate',
                    dhis2: '',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'followUp.startDate',
                    dhis2: '',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'followUp.endDate',
                    dhis2: '',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'followUp.status',
                    dhis2: '',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'followUpHistory.0.status',
                    dhis2: '',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'followUpHistory.0.startDate',
                    dhis2: '',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'addresses.0.typeId',
                    dhis2: '',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'addresses.0.city',
                    dhis2: '',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'addresses.0.addressLine1',
                    dhis2: 'Xhdn49gUd52',
                    props: { conversion: 'attr', values: {} },
                },
                {
                    godata: 'addresses.0.postalCode',
                    dhis2: '',
                    props: { conversion: 'true', values: {} },
                },
                {
                    godata: 'addresses.0.locationId',
                    dhis2: 'arPkmfgnHgW',
                    props: { conversion: 'delm', values: {} },
                },
                {
                    godata: 'addresses.0.geoLocationAccurate',
                    dhis2: 'false',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'addresses.0.date',
                    dhis2: 'NI0QRzJvQ0k',
                    props: { conversion: 'attr', values: {} },
                },
                {
                    godata: 'addresses.0.phoneNumber',
                    dhis2: 'fctSQp5nAYl',
                    props: { conversion: 'attr', values: {} },
                },
                {
                    godata: 'addresses.0.emailAddress',
                    dhis2: 'noemail@noemail.no',
                    props: { conversion: 'false', values: {} },
                },
                {
                    godata: 'age.years',
                    dhis2: 'Rv8WM2mTuS5',
                    props: { conversion: 'attr', values: {} },
                },
                {
                    godata: 'age.months',
                    dhis2: '0',
                    props: { conversion: 'false', values: {} },
                },
            ],
        ],
    },
    {},
    {},
]

export const GODATA_DHIS_EVENT_TASK = [
    '/api/events/query.json /api/events/',
    '/api/outbreaks/29f72303-1d01-4168-8572-32916eda9419/cases',
    '?ou=Plmg8ikyfrK&program=HFztYmEhb3r&skipPaging=true&skipMeta=true&programStage=q1eg3YIkRlc .json?ou=Plmg8ikyfrK&program=HFztYmEhb3r&programStage=q1eg3YIkRlc',
    {},
    false,
    'Default Go.Data DHIS2 Events Mapping',
    'Go.Data Event',
    'trackedEntityInstances',
    'Transference of locations from DHIS to Go.Data instance after selecting the desired value to be sent.',
]

export const GODATA_DHIS_OUTBREAK_TASK = [
    '/api/32/programs',
    '/api/outbreaks',
    '?skipPaging=true&fields=*',
    {},
    false,
    'Default Go.Data DHIS2 Outbreak Mapping',
    'Go.Data Outbreak',
    'programs',
    'Transference of locations from DHIS to Go.Data instance after selecting the desired value to be sent.',
]
export const GODATA_DHIS_LOCATION_TASK = [
    '/api/organisationUnits.json',
    '/api/locations/import',
    '?paging=false&fields=*,geography&?order=level:asc',
    {},
    false,
    'Default Go.Data DHIS2 Location Mapping',
    'Go.Data Location',
    'organisationUnits',
    'Transference of locations from DHIS to Go.Data instance after selecting the desired value to be sent.',
]
export const GODATA_DHIS_CASE_TASK = [
    '/api/trackedEntityInstances/query.json /api/trackedEntityInstances/',
    '/api/outbreaks/1baf28ab-9a4d-4a3f-aca1-9a18683977df/cases',
    '?ou=Plmg8ikyfrK&ouMode=DESCENDANTS&program=uYjxkTbwRNf&fields=id,name&skipPaging=true&skipMeta=true .json?ouMode=ALL&program=uYjxkTbwRNf&fields=*',
    {},
    false,
    'Default Go.Data DHIS2 Cases Mapping',
    'Go.Data Case',
    'trackedEntityInstances',
    'Default transference of cases from DHIS to Go.Data instance after selecting the desired value to be sent.',
]

export const GODATA_DHIS_CONTACT_TASK = [
    '/api/trackedEntityInstances/query.json /api/trackedEntityInstances/',
    '/api/outbreaks/1baf28ab-9a4d-4a3f-aca1-9a18683977df/contacts',
    '?ou=Plmg8ikyfrK&ouMode=DESCENDANTS&program=uYjxkTbwRNf&fields=id,name&skipPaging=true&skipMeta=true .json?ouMode=ALL&program=uYjxkTbwRNf&fields=*',
    {},
    false,
    'Default Go.Data DHIS2 Contacts Mapping',
    'Go.Data Contact',
    'trackedEntityInstances',
    'Default transference of contacts from DHIS to Go.Data instance after selecting the desired value to be sent.',
]
