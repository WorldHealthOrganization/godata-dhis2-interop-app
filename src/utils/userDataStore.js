import { getInstance } from 'd2'

const NAMESPACE_APP = 'dhis2-godata-interop-configuration'

/**
 * USER DATA STORE
 */

/**
 *
 * @returns The stored value with key <key>
 */
export const getValueUserDataStore = key => {
    return getInstance().then(d2 =>
        d2.currentUser.dataStore
            .has(NAMESPACE_APP)
            .then(hasNamespace =>
                hasNamespace
                    ? d2.currentUser.dataStore
                          .get(NAMESPACE_APP)
                          .then(namespace =>
                              namespace
                                  .getKeys()
                                  .then(keys =>
                                      keys.includes(key)
                                          ? namespace.get(key)
                                          : {}
                                  )
                          )
                    : ''
            )
    )
}

export const setKeyValueUserDataStore = (key, value) => {
    return getInstance().then(d2 =>
        d2.currentUser.dataStore
            .has(NAMESPACE_APP)
            .then(hasNamespace =>
                hasNamespace
                    ? d2.currentUser.dataStore.get(NAMESPACE_APP)
                    : d2.currentUser.dataStore.create(NAMESPACE_APP)
            )
            .then(namespace => namespace.set(key, value, false, true))
    )
}
