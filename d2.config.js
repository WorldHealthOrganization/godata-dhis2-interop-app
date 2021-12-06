const config = {
    type: 'app',
    name: 'interop-configuration',
    title: 'Go.Data Interoperability app',
    description: 'Configure Go.Data server and manage DHIS2 interoperability',
    coreApp: false,

    entryPoints: {
        app: './src/App',
    },
}

module.exports = config
