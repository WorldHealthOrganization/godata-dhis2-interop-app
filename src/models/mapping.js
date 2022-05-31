import axios from 'axios'
import dot from 'dot-object'
import { buildUrl } from '../constants/helpers'

export class Mapping {
    mapping
    static GODATA_OUTBREAK = 'Go.Data Outbreak'
    static GODATA_CASE = 'Go.Data Case'
    static GODATA_CONTACT = 'Go.Data Contact'
    static GODATA_CONTACT_OF_CONTACT = 'Go.Data Contact of Contact'
    static GODATA_ORG_UNIT = 'Go.Data Location'
    static GODATA_EVENT = 'Go.Data Event'
    static GODATA_CUSTOM = 'Go.Data Custom Object'
    static mappingNames = {
        [this.GODATA_OUTBREAK]: 'Outbreak',
        [this.GODATA_CASE]: 'Case',
        [this.GODATA_CONTACT]: 'Contact',
        [this.GODATA_CONTACT_OF_CONTACT]: 'Contact-of-Contact',
        [this.GODATA_ORG_UNIT]: 'Location',
        [this.GODATA_EVENT]: 'Event',
    }

    static mappingFormTypeToGodataModels = {
        [this.GODATA_OUTBREAK]: 'outbreak',
        [this.GODATA_CASE]: 'case',
        [this.GODATA_CONTACT]: 'contact',
        [this.GODATA_CONTACT_OF_CONTACT]: 'contactOfContact',
        [this.GODATA_ORG_UNIT]: 'location',
        [this.GODATA_EVENT]: 'case',
    }

    setMapping = mapping => {
        this.mapping = mapping
    }

    getGodataValue = () => {
        console.log(this.mapping.mapping[0])
        if (!this.mapping || this.mapping.mapping.length <= 0) return []
        return this.mapping.mapping[0].godataValue
    }

    getMapping = () => this.mapping

    getDataElementsFromEnrollments = programs => {
        const dataElements = {}
        for (const { events } of programs)
            for (const { dataValues } of events)
                for (const { dataElement, value } of dataValues)
                    dataElements[dataElement] = value
        return dataElements
    }

    applyMappingImport = ({ ...rest }, programId) => {
        console.log({ rest })
        const ret = {
            attributes: [],
            enrollments: [],
        }

        const godataValue = this.getGodataValue()
        const orgUnit = godataValue[1].find(({dhis2}) => dhis2 === "orgUnit").godata
        console.log({orgUnit});
        if (!!godataValue) {
            godataValue[1].forEach(
                ({
                    dhis2,
                    godata,
                    programStageId,
                    program,
                    props: { values, conversion },
                }) => {
                    console.log({ programStageId })
                    if (conversion === 'true') {
                        if (!!dhis2)
                            ret[dhis2] = this.getFromPredefinedValuesImport(
                                values, dot.pick(godata, rest)
                            )
                    } else if (conversion === 'false') {
                        ret[dhis2] = this.getFromPredefinedValuesImport(values, godata)
                    } else if (conversion === 'attr') {
                        const value = dot.pick(godata, rest)
                        if (!!value)
                            ret.attributes.push({
                                attribute: dhis2,
                                value: this.getFromPredefinedValuesImport(
                                    values, value
                                ),
                            })
                    } else if (conversion === 'delm') {
                        const value = dot.pick(godata, rest)
                        if (!!value && !!dhis2) {
                            const dataValue = {
                                dataElement: dhis2,
                                value: this.getFromPredefinedValuesImport(
                                    values, value
                                ),
                            }
                            let enrollment = ret.enrollments.findIndex(
                                e => e.program === program
                            )
                            if (enrollment < 0)
                                enrollment =
                                    ret.enrollments.push({
                                        orgUnit: orgUnit,
                                        program: program,
                                        events: [],
                                    }) - 1

                            if (!ret.enrollments[enrollment].events)
                                ret.enrollments[enrollment].events = []

                            let event = ret.enrollments[
                                enrollment
                            ].events.findIndex(
                                e =>
                                    e.program === program &&
                                    e.programStage === programStageId
                            )
                            if (event < 0)
                                event =
                                    ret.enrollments[enrollment].events.push({
                                        program: program,
                                        orgUnit: orgUnit,
                                        eventDate: new Date(),
                                        programStage: programStageId,
                                    }) - 1

                            if (
                                !ret.enrollments[enrollment].events[event]
                                    .dataValues
                            )
                                ret.enrollments[enrollment].events[
                                    event
                                ].dataValues = []

                            ret.enrollments[enrollment].events[
                                event
                            ].dataValues.push(dataValue)
                        }
                    }
                }
            )
        }
        // dot.object(ret)
        console.log({ ret })
        return ret
    }

    getFromPredefinedValuesImport = (godataDhis2, target) =>
        godataDhis2[target] || godataDhis2.default || target

    getFromPredefinedValuesExport = (godataDhis2, target) => {
        for (const [key, value] of Object.entries(godataDhis2))
            if (value === target)
                return key

        return (
            Object.keys(godataDhis2).find(k => godataDhis2[k] === 'default') ||
            target
        )
    }


    applyMappingExport = ({ attributes, enrollments, ...rest }) => {
        const ret = {}
        // console.log({attributes, enrollments, ...rest})
        const dataElements = this.getDataElementsFromEnrollments(enrollments)

        const godataValue = this.getGodataValue()
        if (!!godataValue) {
            godataValue[1].forEach(
                ({ dhis2, godata, props: { values, conversion } }) => {
                    if (conversion === 'true') {
                        ret[godata] = dot.pick(dhis2, rest)
                    } else if (conversion === 'false') {
                        ret[godata] = dhis2
                    } else if (conversion === 'attr') {
                        const attribute = attributes.find(
                            a => a.attribute === dhis2
                        )
                        if (!!attribute) {
                            ret[godata] = attribute.value
                        }
                    } else if (conversion === 'delm') {
                        ret[godata] = dataElements[dhis2]
                    }

                    if (!!values && !!ret[godata]) {
                        ret[godata] = this.getFromPredefinedValuesExport(
                            values,
                            ret[godata]
                        )
                    }
                }
            )
        }
        dot.object(ret)
        console.log(ret)
        return ret
    }

    static async autoGenerate(mappingFormType, credentials) {
        const model = this.mappingFormTypeToGodataModels[mappingFormType]
        return axios
            .get(
                buildUrl(
                    credentials.godata.url,
                    `/api/system-settings/model-definition?model=${model}`
                )
            )
            .then(res => res.data)
            .catch(error => false)
    }

    static mainIterator(obj) {
        let walked = []
        let stack = [{ obj: obj, stack: '' }]
        let mappings = []
        let i = 0
        while (stack.length > 0) {
            let item = stack.pop()
            let obj = item.obj
            for (let property in obj) {
                if (obj.hasOwnProperty(property)) {
                    if (typeof obj[property] == 'object') {
                        let alreadyFound = false
                        for (let i = 0; i < walked.length; i++) {
                            if (walked[i] === obj[property]) {
                                alreadyFound = true
                                break
                            }
                        }
                        if (!alreadyFound) {
                            walked.push(obj[property])
                            stack.push({
                                obj: obj[property],
                                stack: item.stack + '.' + property,
                            })
                        }
                    } else {
                        i++
                        mappings.push({
                            godata: (item.stack + '.' + property).substr(1),
                            dhis2: '',
                            props: {
                                conversion: 'true',
                                values: {},
                            },
                        })
                    }
                }
            }
        }
        return mappings
    }

    static entityIterator({
        id,
        programStages,
        programTrackedEntityAttributes,
        ...rest
    }) {
        console.log({
            id,
            programStages,
            programTrackedEntityAttributes,
            ...rest,
        })
        return programStages
            .map(({ id: programStageId, name, programStageDataElements }) =>
                programStageDataElements.map(
                    ({ dataElement }) =>
                        new Object({
                            dhis2: `${dataElement.id}`,
                            dhis2Description: dataElement.name,
                            programStageId: programStageId,
                            programStageName: name,
                            program: id,
                            conversion: 'delm',
                        })
                )
            )
            .flat()
            .concat(
                programTrackedEntityAttributes.map(
                    ({ trackedEntityAttribute: { id: attributeId, name } }) =>
                        new Object({
                            dhis2: `${attributeId}`,
                            program: id,
                            dhis2Description: name,
                            conversion: 'attr',
                        })
                )
            )
            .concat(
                Object.keys(dot.dot(rest)).map(
                    k =>
                        new Object({
                            dhis2: k,
                            conversion: 'true',
                        })
                )
            )
    }

    static secondIterator(obj) {
        let walked = []
        let stack = [
            {
                obj: obj,
                stack: '',
            },
        ]
        let dhismappings = []

        while (stack.length > 0) {
            let item = stack.pop()
            let obj = item.obj

            for (let property in obj) {
                if (obj.hasOwnProperty(property)) {
                    if (typeof obj[property] == 'object') {
                        let alreadyFound = false

                        for (let i = 0; i < walked.length; i++) {
                            if (walked[i] === obj[property]) {
                                alreadyFound = true
                                break
                            }
                        }

                        if (!alreadyFound) {
                            walked.push(obj[property])
                            stack.push({
                                obj: obj[property],
                                stack: item.stack + '.' + property,
                            })
                        }
                    } else {
                        dhismappings.push({
                            dhis2: (item.stack + '.' + property).substr(1),
                        })
                    }
                }
            }
        }
        return dhismappings
    }
}
