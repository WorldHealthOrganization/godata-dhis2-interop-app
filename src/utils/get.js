import { getValueUserDataStore } from './userDataStore.js'
const NAMESPACE_APP = 'dhis2-godata-interop-configuration'

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

export const getCredentialsFromUserDataStore = async () => 
    Promise.all(
        [
            'godatauser',
            'godatauserpass',
            'godatabaseurl',
            'dhisuser',
            'dhisuserpass',
            'dhisbaseurl',
        ].map(field => getValueUserDataStore(field))
    ).then(
        ([
            godatauser,
            godatauserpass,
            godatabaseurl,
            dhisuser,
            dhisuserpass,
            dhisbaseurl
        ]) => new Object({
                godata: {
                    username: godatauser,
                    password: godatauserpass,
                    url: godatabaseurl,
                },
                dhis: {
                    username: dhisuser,
                    password: dhisuserpass,
                    url: dhisbaseurl,
                },
            })
    )

