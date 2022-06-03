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
            'godata',
            'dhis2',
        ].map(field => getValueUserDataStore(field))
    ).then(
        ([
            godata,
            dhis2
        ]) => new Object({dhis2, godata})
    )

