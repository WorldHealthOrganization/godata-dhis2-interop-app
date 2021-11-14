import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { CssVariables } from '@dhis2/ui'
import React from 'react'
import styles from './App.module.css'

import { AlertHandler } from './notifications'
import { Navigation } from './navigation'
import {
    METADATA_CONFIG_LIST_PATH,
    METADATA_CONFIG_FORM_NEW_PATH,
    METADATA_CONFIG_FORM_EDIT_PATH,
    GODATA_CALL_FORM_PATH,
    GODATA_CONFIG_FORM_PATH,
    MetadataConfigFormNew,
    MetadataConfigFormEdit,
    MetadataConfigList,
    GoDataCallForm,
    GoDataConfigForm,
    HOME_PATH,
    Home,
} from './views'
import { dataTest } from './dataTest'

const App = () => (
    <AlertHandler>
        <CssVariables spacers colors />
        <HashRouter>
            <div className={styles.container} data-test={dataTest('app')}>
                <div className={styles.sidebar}>
                    <Navigation />
                </div>

                <main className={styles.content}>
                    <Switch>
                        <Route exact path={HOME_PATH} component={Home} />

                        {/* GoData configuration */ ''}
                        <Route
                            exact
                            path={GODATA_CONFIG_FORM_PATH}
                            component={GoDataConfigForm}
                        />

                        <Route
                            exact
                            path={GODATA_CALL_FORM_PATH}
                            component={GoDataCallForm}
                        />


                        {/* MetaData configuration */ ''}
                        <Route
                            exact
                            path={METADATA_CONFIG_LIST_PATH}
                            component={MetadataConfigList}
                        />

                        <Route
                            exact
                            path={METADATA_CONFIG_FORM_EDIT_PATH}
                            component={MetadataConfigFormEdit}
                        />

                        <Route
                            exact
                            path={METADATA_CONFIG_FORM_NEW_PATH}
                            component={MetadataConfigFormNew}
                        />

                        <Redirect from="*" to={HOME_PATH} />
                    </Switch>
                </main>
            </div>
        </HashRouter>
    </AlertHandler>
)

export default App
