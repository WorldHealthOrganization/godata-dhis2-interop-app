const config = {
    type: 'app',
    name: 'dhis2-godata-interop-app',
    title: 'DHIS2 - Go.Data Interoperability',
    description: 'Configure DHIS2 and Go.Data servers and manage their interoperability',
    coreApp: false,

    entryPoints: {
        app: './src/App',
    },
    dataStoreNamespace: 'dhis2-godata-interop-configuration',
    minDHIS2Version: '2.34',
}

module.exports = config
