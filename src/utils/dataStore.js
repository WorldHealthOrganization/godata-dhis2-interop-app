import { getInstance } from 'd2'

const NAMESPACE_APP = 'dhis2-godata-interop-configuration'

/**
 * DATA STORE
 */


/**
 * @post set(key,{...currentValue, value})
 * @returns {Promise}
 */
export const appendValue = (key, value) => {
    return getNamespace(NAMESPACE_APP).then(namespace =>
        namespace
            .getKeys()
            .then(keys =>
                !keys.includes(key)
                    ? namespace.set(key, [value])
                    : namespace
                          .get(key)
                          .then(currentValue =>
                              namespace
                                  .set(key, [
                                      value,
                                      ...currentValue.filter(
                                          x =>
                                              x.displayName !==
                                              value.displayName
                                      ),
                                  ])
                                  .then(() => [
                                      value,
                                      ...currentValue.filter(
                                          x =>
                                              x.displayName !==
                                              value.displayName
                                      ),
                                  ])
                          )
            )
    )
}

export const editById = async (key, i, value) => {
    return getNamespace(NAMESPACE_APP).then(namespace => {
        namespace.get(key).then(arr => {
            console.log({i});
            arr[i] = value;
            console.log(arr);
            return namespace.update(key, arr)
        })
    })
}

/**
 * Get namespace or create it if it does not exist
 * @returns {Promise.<DataStoreNamespace>}
 */
export const getNamespace = namespaceName => {
    return getInstance().then(d2 =>
        d2.dataStore
            .has(namespaceName)
            .then(hasMappingNamespace =>
                hasMappingNamespace
                    ? d2.dataStore.get(namespaceName, false)
                    : d2.dataStore.create(namespaceName)
            )
    )
}

/**
 *
 * @returns The stored value with key <key>
 */
export const getValue = key => {
    return getNamespace(NAMESPACE_APP).then(namespace =>
        namespace
            .getKeys()
            .then(keys => (keys.includes(key) ? namespace.get(key) : {}))
    )
}

//TODO: use set (if key does not exists  it will be creted, else updates)
export const deleteByArrayIds = (key, ids) => {
    return getNamespace(NAMESPACE_APP).then(namespace =>
        namespace.get(key).then(currentValue =>
            namespace
                .update(
                    key,
                    currentValue.filter((_, i) => !ids.includes(i))
                )
                .then(() => currentValue.filter((_, i) => !ids.includes(i)))
        )
    )
}

