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
                    godata: 'name',
                    dhis2: 'event',
                    props: {
                        conversion: 'true',
                        values: {},
                    },
                },
                {
                    godata: 'dateApproximate',
                    dhis2: 'eventDate',
                    props: {
                        conversion: 'true',
                        values: {},
                    },
                },
                {
                    godata: 'description',
                    dhis2: "''",
                    props: {
                        conversion: 'false',
                        values: {},
                    },
                },
                {
                    godata: 'id',
                    dhis2: 'event',
                    props: {
                        conversion: 'true',
                        values: {},
                    },
                },
                {
                    godata: 'outbreakId',
                    dhis2: '29f72303-1d01-4168-8572-32916eda9419',
                    props: {
                        conversion: 'false',
                        values: {},
                    },
                },
                {
                    godata: 'dateOfReporting',
                    dhis2: 'dueDate',
                    props: {
                        conversion: 'true',
                        values: {},
                    },
                },
                {
                    godata: 'isDateOfReportingApproximate',
                    dhis2: 'eventDate',
                    props: {
                        conversion: 'true',
                        values: {},
                    },
                },
            ],
        ],
    },
    {
        name: 'string',
        dateApproximate: true,
        description: 'string',
        address: {
            typeId: 'LNG_REFERENCE_DATA_CATEGORY_ADDRESS_TYPE_USUAL_PLACE_OF_RESIDENCE',
            country: 'string',
            city: 'string',
            addressLine1: 'string',
            postalCode: 'string',
            locationId: 'string',
            geoLocation: {
                lat: 0,
                lng: 0,
            },
            geoLocationAccurate: false,
            date: '2022-05-14T15:46:05.270Z',
            phoneNumber: 'string',
            emailAddress: 'string',
        },
        id: 'string',
        outbreakId: 'string',
        visualId: 'string',
        dateOfReporting: '2022-05-14T15:46:05.270Z',
        isDateOfReportingApproximate: false,
        dateOfLastContact: '2022-05-14T15:46:05.270Z',
        followUpTeamId: 'string',
        date: '2022-05-14T15:46:05.270Z',
        deletedByParent: 'string',
        vaccinesReceived: [
            {
                vaccine: 'string',
                date: '2022-05-14T15:46:05.270Z',
                status: 'string',
            },
        ],
        pregnancyStatus: 'string',
        hasRelationships: false,
        relationshipsRepresentation: [
            {
                id: 'string',
                active: true,
                otherParticipantType: 'string',
                otherParticipantId: 'string',
                target: true,
                source: true,
            },
        ],
        numberOfExposures: 0,
        numberOfContacts: 0,
        notDuplicatesIds: ['string'],
        usualPlaceOfResidenceLocationId: 'string',
        responsibleUserId: 'string',
        createdAt: '2022-05-14T15:46:05.271Z',
        createdBy: 'string',
        updatedAt: '2022-05-14T15:46:05.271Z',
        updatedBy: 'string',
        createdOn: 'string',
        deleted: false,
        deletedAt: '2022-05-14T15:46:05.271Z',
    },
    {
        href: 'http://localhost:8080/api/events/zkFowSfmyBM',
        event: 'zkFowSfmyBM',
        status: 'COMPLETED',
        program: 'HFztYmEhb3r',
        programStage: 'q1eg3YIkRlc',
        enrollment: 'O38mqrlnkdW',
        enrollmentStatus: 'ACTIVE',
        orgUnit: 'zTHjIvPmPI0',
        orgUnitName: 'Bo District',
        eventDate: '2022-05-11T00:00:00.000',
        dueDate: '2022-05-13T01:58:02.171',
        storedBy: 'admin',
        notes: [
            {
                note: 'XMN8tF7aPiU',
                value: 'Event example',
                storedBy: 'admin',
                storedDate: '2022-05-13T01:58:02.178',
                lastUpdatedBy: {
                    uid: 'M5zQapPyTZI',
                    username: 'admin',
                    firstName: 'admin',
                    surname: 'admin',
                },
                lastUpdated: '2022-05-13T01:58:02.178',
            },
        ],
        followup: false,
        deleted: false,
        created: '2022-05-13T01:58:02.176',
        createdByUserInfo: {
            uid: 'M5zQapPyTZI',
            username: 'admin',
            firstName: 'admin',
            surname: 'admin',
        },
        lastUpdated: '2022-05-13T01:58:02.233',
        lastUpdatedByUserInfo: {
            uid: 'M5zQapPyTZI',
            username: 'admin',
            firstName: 'admin',
            surname: 'admin',
        },
        createdAtClient: '2022-05-13T01:58:02.176',
        lastUpdatedAtClient: '2022-05-13T01:58:02.233',
        attributeOptionCombo: 'HllvX50cXC0',
        attributeCategoryOptions: 'xYerKDKCefk',
        completedBy: 'admin',
        completedDate: '2022-05-13T00:00:00.000',
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
    '/api/outbreaks/29f72303-1d01-4168-8572-32916eda9419/events',
    '?ou=Plmg8ikyfrK&program=HFztYmEhb3r&skipPaging=true&skipMeta=true&programStage=q1eg3YIkRlc .json?ou=Plmg8ikyfrK&program=HFztYmEhb3r&programStage=q1eg3YIkRlc',
    {
        id: 'string',
        date: '2022-05-13T10:08:41.847Z',
        name: 'string',
        address: {
            city: 'string',
            date: '2022-05-13T10:08:41.847Z',
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
        createdAt: '2022-05-13T10:08:41.847Z',
        createdBy: 'string',
        createdOn: 'string',
        deletedAt: '2022-05-13T10:08:41.847Z',
        updatedAt: '2022-05-13T10:08:41.847Z',
        updatedBy: 'string',
        outbreakId: 'string',
        description: 'string',
        followUpTeamId: 'string',
        dateApproximate: true,
        dateOfReporting: '2022-05-13T10:08:41.847Z',
        deletedByParent: 'string',
        pregnancyStatus: 'string',
        hasRelationships: false,
        notDuplicatesIds: ['string'],
        numberOfContacts: 0,
        vaccinesReceived: [
            {
                date: '2022-05-13T10:08:41.847Z',
                status: 'string',
                vaccine: 'string',
            },
        ],
        dateOfLastContact: '2022-05-13T10:08:41.847Z',
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
    false,
    0,
    'Go.Data Event',
    'trackedEntityInstances',
    'description sample',
]

export const GODATA_DHIS_OUTBREAK_TASK = [
    '/api/32/programs',
    '/api/outbreaks',
    '?paging=false&fields=*',
    {
        name: 'string',
        description: 'string',
        disease: 'string',
        countries: [{ id: 'string' }],
        locationIds: ['string'],
        startDate: '2021-11-26T10:21:59.833Z',
        endDate: '2021-11-26T10:21:59.833Z',
        longPeriodsBetweenCaseOnset: 0,
        periodOfFollowup: 0,
        frequencyOfFollowUp: 1,
        frequencyOfFollowUpPerDay: 0,
        generateFollowUpsOverwriteExisting: false,
        generateFollowUpsKeepTeamAssignment: true,
        generateFollowUpsTeamAssignmentAlgorithm:
            'LNG_REFERENCE_DATA_CATEGORY_FOLLOWUP_GENERATION_TEAM_ASSIGNMENT_ALGORITHM_ROUND_ROBIN_ALL_TEAMS',
        generateFollowUpsDateOfLastContact: false,
        intervalOfFollowUp: 'string',
        noDaysAmongContacts: 0,
        noDaysInChains: 0,
        noDaysNotSeen: 0,
        noLessContacts: 0,
        noDaysNewContacts: 1,
        fieldsToDisplayNode: ['string'],
        caseInvestigationTemplate: [],
        contactInvestigationTemplate: [],
        contactFollowUpTemplate: [],
        labResultsTemplate: [],
        caseIdMask: '9999999999',
        contactIdMask: '9999999999',
        reportingGeographicalLevelId: 'string',
        isContactLabResultsActive: false,
        contactOfContactIdMask: '9999999999',
        isContactsOfContactsActive: false,
        isDateOfOnsetRequired: true,
        applyGeographicRestrictions: false,
        id: 'string',
        createdAt: '2021-11-26T10:21:59.833Z',
        createdBy: 'string',
        updatedAt: '2021-11-26T10:21:59.833Z',
        updatedBy: 'string',
        createdOn: 'string',
        deleted: false,
        deletedAt: '2021-11-26T10:21:59.833Z',
    },
    false,
    3,
    'Go.Data Outbreak',
    'programs',
    'Transference of locations from DHIS to Go.Data instance after selecting the desired value to be sent.',
]
export const GODATA_DHIS_LOCATION_TASK = [
    '/api/organisationUnits.json',
    '/api/locations/import',
    '?paging=false&fields=*,geography&?order=level:asc',
    {
        name: 'string',
        synonyms: ['string'],
        identifiers: [{ code: 'string', description: 'string' }],
        active: true,
        populationDensity: 0,
        parentLocationId: 'string',
        geoLocation: { lat: 0, lng: 0 },
        geographicalLevelId: 'string',
        id: 'string',
        createdAt: '2021-12-07T05:31:50.310Z',
        createdBy: 'string',
        updatedAt: '2021-12-07T05:31:50.310Z',
        updatedBy: 'string',
        createdOn: 'string',
        deleted: false,
        deletedAt: '2021-12-07T05:31:50.310Z',
    },
    false,
    2,
    'Go.Data Location',
    'organisationUnits',
    'Transference of locations from DHIS to Go.Data instance after selecting the desired value to be sent.',
]
export const GODATA_DHIS_CASE_TASK = [
    '/api/trackedEntityInstances/query.json /api/trackedEntityInstances/',
    '/api/outbreaks/1baf28ab-9a4d-4a3f-aca1-9a18683977df/cases',
    '?ou=Plmg8ikyfrK&ouMode=DESCENDANTS&program=uYjxkTbwRNf&fields=id,name&skipPaging=true&skipMeta=true .json?ou=Plmg8ikyfrK&program=uYjxkTbwRNf&fields=trackedEntityInstance,enrollments[events[dataValues[dataElement,value]]],attributes[attribute,value]',
    {
        id: 'string',
        age: {
            years: 0,
            months: 0,
        },
        dob: '2022-01-10T17:38:49.334Z',
        gender: 'string',
        deleted: false,
        lastName: 'string',
        visualId: 'string',
        addresses: [
            {
                city: 'string',
                date: '2022-01-10T17:38:49.334Z',
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
        ],
        createdAt: '2022-01-10T17:38:49.334Z',
        createdBy: 'string',
        createdOn: 'string',
        deletedAt: '2022-01-10T17:38:49.334Z',
        documents: [
            {
                type: 'string',
                number: 'string',
            },
        ],
        firstName: 'string',
        outcomeId: 'string',
        riskLevel: 'string',
        updatedAt: '2022-01-10T17:38:49.334Z',
        updatedBy: 'string',
        dateRanges: [
            {
                typeId: 'string',
                endDate: '2022-01-10T17:38:49.334Z',
                comments: 'string',
                startDate: '2022-01-10T17:38:49.334Z',
                centerName: 'string',
                locationId: 'string',
            },
        ],
        middleName: 'string',
        occupation: 'string',
        outbreakId: 'string',
        riskReason: 'string',
        safeBurial: false,
        wasContact: false,
        dateOfOnset: '2022-01-10T17:38:49.334Z',
        dateOfBurial: '2022-01-10T17:38:49.334Z',
        dateOfOutcome: '2022-01-10T17:38:49.334Z',
        duplicateKeys: {
            name: ['string'],
            document: ['string'],
        },
        classification: 'string',
        dateBecomeCase: '2022-01-10T17:38:49.334Z',
        followUpTeamId: 'string',
        burialPlaceName: 'string',
        dateOfInfection: '2022-01-10T17:38:49.334Z',
        dateOfReporting: '2022-01-10T17:38:49.334Z',
        deletedByParent: 'string',
        pregnancyStatus: 'string',
        transferRefused: false,
        burialLocationId: 'string',
        hasRelationships: false,
        notDuplicatesIds: ['string'],
        numberOfContacts: 0,
        vaccinesReceived: [
            {
                date: '2022-01-10T17:38:49.334Z',
                status: 'string',
                vaccine: 'string',
            },
        ],
        dateOfLastContact: '2022-01-10T17:38:49.334Z',
        numberOfExposures: 0,
        responsibleUserId: 'string',
        questionnaireAnswers: {},
        classificationHistory: [
            {
                endDate: '2022-01-10T17:38:49.334Z',
                startDate: '2022-01-10T17:38:49.334Z',
                classification: 'string',
            },
        ],
        isDateOfOnsetApproximate: true,
        questionnaireAnswersContact: {},
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
    false,
    1,
    'Go.Data Case',
    'trackedEntityInstances',
    'Default transference of cases from DHIS to Go.Data instance after selecting the desired value to be sent.',
]

export const GODATA_DHIS_CONTACT_TASK = [
    '/api/trackedEntityInstances/query.json /api/trackedEntityInstances/',
    '/api/outbreaks/1baf28ab-9a4d-4a3f-aca1-9a18683977df/contacts',
    '?ou=Plmg8ikyfrK&ouMode=DESCENDANTS&program=uYjxkTbwRNf&fields=id,name&skipPaging=true&skipMeta=true .json?ou=Plmg8ikyfrK&program=uYjxkTbwRNf&fields=trackedEntityInstance,enrollments[events[dataValues[dataElement,value]]],attributes[attribute,value]',
    {
        firstName: 'string',
        gender: 'string',
        riskLevel: 'string',
        riskReason: 'string',
        outcomeId: 'string',
        safeBurial: false,
        wasCase: false,
        active: true,
        vaccinesReceived: [
            {
                vaccine: 'string',
                date: '2022-05-07T15:43:44.477Z',
                status: 'string',
            },
        ],
        pregnancyStatus: 'string',
        questionnaireAnswers: {},
        questionnaireAnswersCase: {},
        id: 'string',
        outbreakId: 'string',
        visualId: 'string',
        middleName: 'string',
        lastName: 'string',
        dob: '2022-05-07T15:43:44.477Z',
        age: {
            years: 0,
            months: 0,
        },
        occupation: 'string',
        documents: [
            {
                type: 'string',
                number: 'string',
            },
        ],
        addresses: [
            {
                typeId: 'LNG_REFERENCE_DATA_CATEGORY_ADDRESS_TYPE_USUAL_PLACE_OF_RESIDENCE',
                country: 'string',
                city: 'string',
                addressLine1: 'string',
                postalCode: 'string',
                locationId: 'string',
                geoLocation: {
                    lat: 0,
                    lng: 0,
                },
                geoLocationAccurate: false,
                date: '2022-05-07T15:43:44.477Z',
                phoneNumber: 'string',
                emailAddress: 'string',
            },
        ],
        dateOfReporting: '2022-05-07T15:43:44.477Z',
        isDateOfReportingApproximate: false,
        dateOfLastContact: '2022-05-07T15:43:44.477Z',
        followUpHistory: [
            {
                status: 'string',
                startDate: '2022-05-07T15:43:44.477Z',
                endDate: '2022-05-07T15:43:44.477Z',
            },
        ],
        dateOfOutcome: '2022-05-07T15:43:44.477Z',
        dateOfBurial: '2022-05-07T15:43:44.477Z',
        dateBecomeContact: '2022-05-07T15:43:44.477Z',
        followUp: {
            originalStartDate: '2022-05-07T15:43:44.477Z',
            startDate: '2022-05-07T15:43:44.477Z',
            endDate: '2022-05-07T15:43:44.477Z',
            status: 'string',
        },
        followUpTeamId: 'string',
        deletedByParent: 'string',
        hasRelationships: false,
        relationshipsRepresentation: [
            {
                id: 'string',
                active: true,
                otherParticipantType: 'string',
                otherParticipantId: 'string',
                target: true,
                source: true,
            },
        ],
        numberOfExposures: 0,
        numberOfContacts: 0,
        notDuplicatesIds: ['string'],
        usualPlaceOfResidenceLocationId: 'string',
        duplicateKeys: {
            name: ['string'],
            document: ['string'],
        },
        responsibleUserId: 'string',
        createdAt: '2022-05-07T15:43:44.477Z',
        createdBy: 'string',
        updatedAt: '2022-05-07T15:43:44.477Z',
        updatedBy: 'string',
        createdOn: 'string',
        deleted: false,
        deletedAt: '2022-05-07T15:43:44.477Z',
    },
    false,
    1,
    'Go.Data Contacts',
    'trackedEntityInstances',
    'Default transference of contacts from DHIS to Go.Data instance after selecting the desired value to be sent.',
]
