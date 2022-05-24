import axios from 'axios'
import dot from 'dot-object'
import { buildUrl } from '../constants/helpers'


export class Mapping {
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

    
    static async autoGenerate(mappingFormType, credentials) {
        const model = this.mappingFormTypeToGodataModels[mappingFormType]
        return axios.get(buildUrl(credentials.godata.url,`/api/system-settings/model-definition?model=${model}`)).then(res => res.data).catch(error => false)
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

    static entityIterator(obj) {
        let walked = []
        let stack = [{ obj: obj, stack: '' }]
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
                        const pattern = /\.\d*\./
                        if (!pattern.test(item.stack + '.' + property)) {
                            dhismappings.push({
                                dhis2: (item.stack + '.' + property).substr(1),
                                description:
                                    dot.pick(
                                        (item.stack + '.' + property).substr(1),
                                        obj
                                    ) === undefined
                                        ? JSON.stringify(obj)
                                        : dot.pick(
                                              (
                                                  item.stack +
                                                  '.' +
                                                  property
                                              ).substr(1),
                                              obj
                                          ),
                            })
                        } else {
                            if (property === 'id') {
                                if (item.stack.includes('dataElement')) {
                                    dhismappings.push({
                                        dhis2: 'delm ' + obj.id,
                                        'description: name': obj.name,
                                        conversion: 'delm',
                                    })
                                } else if (
                                    item.stack.includes(
                                        'trackedEntityAttribute'
                                    )
                                ) {
                                    dhismappings.push({
                                        dhis2: 'attr ' + obj.id,
                                        'description: name': obj.name,
                                        conversion: 'attr',
                                    })
                                } else {
                                    dhismappings.push({
                                        dhis2: 'stage ' + obj.id,
                                        'description: name': obj.name,
                                        conversion: 'stage',
                                    })
                                }
                            } else {
                                dhismappings.push({
                                    dhis2: (item.stack + '.' + property).substr(
                                        1
                                    ),
                                    description: obj.name,
                                })
                            }
                        }
                    }
                }
            }
        }
        const pattern = /\.\d*\./
        const ret = dhismappings.filter(
            obj => !pattern.test(String(obj.dhis2))
        )
        return ret
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
