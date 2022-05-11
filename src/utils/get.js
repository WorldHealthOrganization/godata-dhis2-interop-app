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

export const getCredentialsFromUserDataStore = async () => {
    const godatauser = await getValueUserDataStore('godatauser');
    const godatauserpass = await getValueUserDataStore('godatauserpass');
    const godatabaseurl = await getValueUserDataStore('godatabaseurl');
    const dhisuser = await getValueUserDataStore('dhisuser');
    const dhisuserpass = await getValueUserDataStore('dhisuserpass');
    const dhisbaseurl = await getValueUserDataStore('dhisbaseurl');

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
}
