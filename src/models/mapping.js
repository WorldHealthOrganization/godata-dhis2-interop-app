import dot from 'dot-object'


export class Mapping {
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
        console.log({mappings})
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
        console.log({ret})
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
