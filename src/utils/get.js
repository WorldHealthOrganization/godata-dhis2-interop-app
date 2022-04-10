import api from '../utils/api'

export const get = (path, object) => {
    let value = null
    const segments = path.split('.')

    if (!(object instanceof Object)) {
        return value
    }

    for (let i = 0, cur = object; i < segments.length; ++i) {
        const nextObject = cur[segments[i]]
        if (!nextObject) break

        if (i === segments.length - 1) {
            value = nextObject
            break
        }

        cur = nextObject
    }

    return value
}

export const getCredentialsFromDataStore = () => {
    return Promise.all([
        api.getValue('dhis2-godata-interop-configuration', 'godatauser'),
        api.getValue('dhis2-godata-interop-configuration', 'godatauserpass'),
        api.getValue('dhis2-godata-interop-configuration', 'godatabaseurl'),
        api.getValue('dhis2-godata-interop-configuration', 'dhisuser'),
        api.getValue('dhis2-godata-interop-configuration', 'dhisuserpass'),
        api.getValue('dhis2-godata-interop-configuration', 'dhisbaseurl'),
    ])
        .then(v => v.map(v => v.value))
        .then(values => {
            const [
                godatauser,
                godatauserpass,
                godatabaseurl,
                dhisuser,
                dhisuserpass,
                dhisbaseurl,
            ] = values
            const res = {}
            res.godata = {
                username: godatauser,
                password: godatauserpass,
                url: godatabaseurl,
            }

            res.dhis = {
                username: dhisuser,
                password: dhisuserpass,
                url: dhisbaseurl,
            }
            return res
        })
}