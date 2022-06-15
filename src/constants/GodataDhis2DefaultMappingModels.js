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
                    dhis2: 'LNG_REFERENCE_DATA_CATEGORY_CASE_CLASSIFICATION_NONE',
                    props: {
                        values: {},
                        conversion: 'false',
                    },
                    godata: 'classification',
                    dhis2Description:
                        'LNG_REFERENCE_DATA_CATEGORY_CASE_CLASSIFICATION_NONE',
                    programStageId: 'dDHkBd3X8Ce',
                    programStageName: 'Stage 3 - Lab Results',
                    conversion: 'delm',
                    programName: 'COVID-19 Case-based Surveillance',
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
                    dhis2: '3f8ce095-ac03-4a0c-8f04-16b7e052dfa4',
                    props: {
                        values: {},
                        conversion: 'false',
                    },
                    godata: 'outbreakId',
                    dhis2Description: '3f8ce095-ac03-4a0c-8f04-16b7e052dfa4',
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

export const GODATA_DHIS_PROGRAM_TO_CONTACT_MODEL = [
    {
        godataValue: [
            [
                {
                    conversionType: 'Go.Data Contact',
                },
            ],
            [
                {
                    dhis2: 'sB1IHYu2xQT',
                    props: {
                        values: {},
                        conversion: 'attr',
                    },
                    godata: 'firstName',
                    program: 'uYjxkTbwRNf',
                    dhis2Description: 'First Name',
                    conversion: 'attr',
                    programName: 'COVID-19 Case-based Surveillance',
                },
                {
                    dhis2: 'oindugucx72',
                    props: {
                        values: {},
                        conversion: 'attr',
                    },
                    godata: 'gender',
                    program: 'uYjxkTbwRNf',
                    dhis2Description: 'Sex',
                    conversion: 'attr',
                    programName: 'COVID-19 Case-based Surveillance',
                },
                {
                    dhis2: 'fyzp8BpsPMl',
                    props: {
                        values: {},
                        conversion: 'delm',
                    },
                    godata: 'riskReason',
                    dhis2Description: 'Sign/Symptoms Shortness of Breath',
                    programStageId: 'LpWNjNGvCO5',
                    programStageName:
                        'Stage 1 - Clinical examination and diagnosis',
                    program: 'uYjxkTbwRNf',
                    conversion: 'delm',
                    programName: 'COVID-19 Case-based Surveillance',
                },
                {
                    dhis2: 'HAZ7VQ730yn',
                    props: {
                        values: {},
                        conversion: 'attr',
                    },
                    godata: 'id',
                    program: 'uYjxkTbwRNf',
                    dhis2Description: 'System Generated Case ID',
                    conversion: 'attr',
                    programName: 'COVID-19 Case-based Surveillance',
                },
                {
                    dhis2: 'b17d7e8c-e076-4e30-8c72-97c5fb7a95bc',
                    props: {
                        values: {},
                        conversion: 'false',
                    },
                    godata: 'outbreakId',
                    dhis2Description: 'b17d7e8c-e076-4e30-8c72-97c5fb7a95bc',
                },
                {
                    dhis2: 'he05i8FUwu3',
                    props: {
                        values: {},
                        conversion: 'attr',
                    },
                    godata: 'visualId',
                    program: 'uYjxkTbwRNf',
                    dhis2Description: 'Local Case ID ',
                    conversion: 'attr',
                    programName: 'COVID-19 Case-based Surveillance',
                },
                {
                    dhis2: 'ENRjVGxVL6l',
                    props: {
                        values: {},
                        conversion: 'attr',
                    },
                    godata: 'middleName',
                    program: 'uYjxkTbwRNf',
                    dhis2Description: 'Surname',
                    conversion: 'attr',
                    programName: 'COVID-19 Case-based Surveillance',
                },
                {
                    dhis2: 'ooK7aSiAaGq',
                    props: {
                        values: {},
                        conversion: 'attr',
                    },
                    godata: 'occupation',
                    program: 'uYjxkTbwRNf',
                    dhis2Description: 'Workplace/school physical address',
                    conversion: 'attr',
                    programName: 'COVID-19 Case-based Surveillance',
                },
                {
                    dhis2: 's3eoonJ8OJb',
                    props: {
                        values: {},
                        conversion: 'delm',
                    },
                    godata: 'dateOfReporting',
                    dhis2Description: 'Date of symptoms onset',
                    programStageId: 'LpWNjNGvCO5',
                    programStageName:
                        'Stage 1 - Clinical examination and diagnosis',
                    program: 'uYjxkTbwRNf',
                    conversion: 'delm',
                    programName: 'COVID-19 Case-based Surveillance',
                },
                {
                    dhis2: 'arPkmfgnHgW',
                    props: {
                        values: {},
                        conversion: 'delm',
                    },
                    godata: 'addresses.0.locationId',
                    dhis2Description: 'Hospital name',
                    programStageId: 'LpWNjNGvCO5',
                    programStageName:
                        'Stage 1 - Clinical examination and diagnosis',
                    program: 'uYjxkTbwRNf',
                    conversion: 'delm',
                    programName: 'COVID-19 Case-based Surveillance',
                },
                {
                    dhis2: 'false',
                    props: {
                        values: {},
                        conversion: 'false',
                    },
                    godata: 'addresses.0.geoLocationAccurate',
                },
                {
                    dhis2: 'NI0QRzJvQ0k',
                    props: {
                        values: {},
                        conversion: 'attr',
                    },
                    godata: 'addresses.0.date',
                    program: 'uYjxkTbwRNf',
                    dhis2Description: 'Date of birth',
                    conversion: 'attr',
                    programName: 'COVID-19 Case-based Surveillance',
                },
                {
                    dhis2: 'fctSQp5nAYl',
                    props: {
                        values: {},
                        conversion: 'attr',
                    },
                    godata: 'addresses.0.phoneNumber',
                    program: 'uYjxkTbwRNf',
                    dhis2Description: 'Telephone (local)',
                    conversion: 'attr',
                    programName: 'COVID-19 Case-based Surveillance',
                },
                {
                    dhis2: 'noemail@noemail.no',
                    props: {
                        values: {},
                        conversion: 'false',
                    },
                    godata: 'addresses.0.emailAddress',
                },
                {
                    dhis2: 'Rv8WM2mTuS5',
                    props: {
                        values: {},
                        conversion: 'attr',
                    },
                    godata: 'age.years',
                    program: 'uYjxkTbwRNf',
                    dhis2Description: 'Age',
                    conversion: 'attr',
                    programName: 'COVID-19 Case-based Surveillance',
                },
                {
                    dhis2: '0',
                    props: {
                        values: {},
                        conversion: 'false',
                    },
                    godata: 'age.months',
                },
            ],
        ],
    },
    {},
    {},
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
                    dhis2: 'sB1IHYu2xQT',
                    props: {
                        values: {},
                        conversion: 'attr',
                    },
                    godata: 'firstName',
                    program: 'uYjxkTbwRNf',
                    conversion: 'attr',
                    programName: 'COVID-19 Case-based Surveillance',
                    dhis2Description: 'First Name',
                },
                {
                    dhis2: 'oindugucx72',
                    props: {
                        values: {},
                        conversion: 'attr',
                    },
                    godata: 'gender',
                    program: 'uYjxkTbwRNf',
                    conversion: 'attr',
                    programName: 'COVID-19 Case-based Surveillance',
                    dhis2Description: 'Sex',
                },
                {
                    dhis2: 'ovY6E8BSdto',
                    props: {
                        values: {
                            LNG_REFERENCE_DATA_CATEGORY_CASE_CLASSIFICATION_NONE:
                                'UNKNOWN',
                            LNG_REFERENCE_DATA_CATEGORY_CASE_CLASSIFICATION_SUSPECT:
                                'INCONCLUSIVE',
                            LNG_REFERENCE_DATA_CATEGORY_CASE_CLASSIFICATION_PROBABLE:
                                'INCONCLUSIVE',
                            LNG_REFERENCE_DATA_CATEGORY_CASE_CLASSIFICATION_CONFIRMED:
                                'POSITIVE',
                            LNG_REFERENCE_DATA_CATEGORY_CASE_CLASSIFICATION_NOT_A_CASE_DISCARDED:
                                'NEGATIVE',
                        },
                        conversion: 'delm',
                    },
                    godata: 'classification',
                    program: 'uYjxkTbwRNf',
                    conversion: 'delm',
                    programName: 'COVID-19 Case-based Surveillance',
                    programStageId: 'dDHkBd3X8Ce',
                    dhis2Description: 'Lab Test Result',
                    programStageName: 'Stage 3 - Lab Results',
                },
                {
                    dhis2: 'true',
                    props: {
                        values: {},
                        conversion: 'false',
                    },
                    godata: 'active',
                },
                {
                    dhis2: 'b17d7e8c-e076-4e30-8c72-97c5fb7a95bc',
                    props: {
                        values: {},
                        conversion: 'false',
                    },
                    godata: 'outbreakId',
                    dhis2Description: 'b17d7e8c-e076-4e30-8c72-97c5fb7a95bc',
                },
                {
                    dhis2: 'ENRjVGxVL6l',
                    props: {
                        values: {},
                        conversion: 'attr',
                    },
                    godata: 'lastName',
                    program: 'uYjxkTbwRNf',
                    conversion: 'attr',
                    programName: 'COVID-19 Case-based Surveillance',
                    dhis2Description: 'Surname',
                },
                {
                    dhis2: 'created',
                    props: {
                        values: {},
                        conversion: 'true',
                    },
                    godata: 'dateOfReporting',
                    dhis2Description: 'created',
                },
                {
                    dhis2: 'yes',
                    props: {
                        values: {},
                        conversion: 'false',
                    },
                    godata: 'isDateOfReportingApproximate',
                },
                {
                    dhis2: 'orgUnit',
                    props: {
                        values: {},
                        conversion: 'true',
                    },
                    godata: 'usualPlaceOfResidenceLocationId',
                    dhis2Description: 'orgUnit',
                },
                {
                    dhis2: 'created',
                    props: {
                        values: {},
                        conversion: 'true',
                    },
                    godata: 'createdAt',
                    dhis2Description: 'created',
                },
                {
                    dhis2: 'lastUpdatedAtClient',
                    props: {
                        values: {},
                        conversion: 'true',
                    },
                    godata: 'updatedAt',
                    dhis2Description: 'lastUpdatedAtClient',
                },
                {
                    dhis2: 'false',
                    props: {
                        values: {},
                        conversion: 'false',
                    },
                    godata: 'deleted',
                },
                {
                    dhis2: 'Xhdn49gUd52',
                    props: {
                        values: {},
                        conversion: 'attr',
                    },
                    godata: 'addresses.0.city',
                    program: 'uYjxkTbwRNf',
                    conversion: 'attr',
                    programName: 'COVID-19 Case-based Surveillance',
                    dhis2Description: 'Home Address',
                },
                {
                    dhis2: 'ooK7aSiAaGq',
                    props: {
                        values: {},
                        conversion: 'attr',
                    },
                    godata: 'addresses.0.addressLine1',
                    program: 'uYjxkTbwRNf',
                    conversion: 'attr',
                    programName: 'COVID-19 Case-based Surveillance',
                    dhis2Description: 'Workplace/school physical address',
                },
                {
                    dhis2: 'hBcoBCZBWFb',
                    props: {
                        values: {},
                        conversion: 'attr',
                    },
                    godata: 'addresses.0.locationId',
                    program: 'uYjxkTbwRNf',
                    conversion: 'attr',
                    programName: 'COVID-19 Case-based Surveillance',
                    dhis2Description: 'Country of Residence',
                },
                {
                    dhis2: 'false',
                    props: {
                        values: {},
                        conversion: 'false',
                    },
                    godata: 'addresses.0.geoLocationAccurate',
                },
                {
                    dhis2: 'NI0QRzJvQ0k',
                    props: {
                        values: {},
                        conversion: 'attr',
                    },
                    godata: 'addresses.0.date',
                    program: 'uYjxkTbwRNf',
                    conversion: 'attr',
                    programName: 'COVID-19 Case-based Surveillance',
                    dhis2Description: 'Date of birth',
                },
                {
                    dhis2: 'fctSQp5nAYl',
                    props: {
                        values: {},
                        conversion: 'attr',
                    },
                    godata: 'addresses.0.phoneNumber',
                    program: 'uYjxkTbwRNf',
                    conversion: 'attr',
                    programName: 'COVID-19 Case-based Surveillance',
                    dhis2Description: 'Telephone (local)',
                },
                {
                    dhis2: 'noemail@noemail.no',
                    props: {
                        values: {},
                        conversion: 'false',
                    },
                    godata: 'addresses.0.emailAddress',
                },
                {
                    dhis2: 'Rv8WM2mTuS5',
                    props: {
                        values: {},
                        conversion: 'attr',
                    },
                    godata: 'age.years',
                    program: 'uYjxkTbwRNf',
                    conversion: 'attr',
                    programName: 'COVID-19 Case-based Surveillance',
                    dhis2Description: 'Age',
                },
                {
                    dhis2: '0',
                    props: {
                        values: {},
                        conversion: 'false',
                    },
                    godata: 'age.months',
                },
            ],
        ],
    },
    {},
    {
        created: '2022-06-03T00:33:50.275',
        deleted: false,
        orgUnit: 'Plmg8ikyfrK',
        inactive: false,
        featureType: 'NONE',
        lastUpdated: '2022-06-05T01:47:43.666',
        createdAtClient: '2022-06-03T00:33:50.275',
        trackedEntityType: 'MCPQUTHX1Ze',
        lastUpdatedAtClient: '2022-06-03T00:33:50.275',
        trackedEntityInstance: 'l8dcQz81rDa',
    },
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
