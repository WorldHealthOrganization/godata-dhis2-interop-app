import dot from 'dot-object'

export const formatCase = (obj) => {
    var walked = []
    var stack = [{ obj: obj, stack: '' }]
    mappings = []
    var i = 0
    while (stack.length > 0) {
        var item = stack.pop()
        var obj = item.obj
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                if (typeof obj[property] == 'object') {
                    var alreadyFound = false
                    for (var i = 0; i < walked.length; i++) {
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
}


export const composeJSONFromGodataModel = obj => {
    // return Object.keys(dot.dot(obj))
    //         //.filter(obj => !/\[\d*\]./.test(obj))
    //         .map(k => {
    //             return {
    //                 godata: k,
    //                 dhis2: '',
    //                 props: {
    //                     conversion: 'true',
    //                     values: {},
    //                 },
    //             }
    //         })
    let walked = []
    let stack = [{ obj: obj, stack: '' }]
    let mappings = []
    let i = 0
    let reducedGodataMappings
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
            const pattern = /\.\d*\./
            reducedGodataMappings = mappings.filter(obj => {
                return !pattern.test(String(obj.godata))
            })
        }
    }
    console.log({ reducedGodataMappings })
    return reducedGodataMappings
}

export const iterate2 = obj => {
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
                    dhismappings.push({
                        dhis2: (item.stack + '.' + property).substr(1),
                    })
                }
            }
        }
    }
    return dhismappings
}
