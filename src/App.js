import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { CssVariables } from '@dhis2/ui'
import React from 'react'
import styles from './App.module.css'

import { AlertHandler } from './notifications'
import { Navigation } from './navigation'
import {
    GODATA_CALL_FORM_PATH,
    GODATA_CONFIG_FORM_PATH,
    META_MAPPING_LIST_PATH,
    META_MAPPING_FORM_EDIT_PATH,
    META_MAPPING_FORM_NEW_PATH,
    GoDataCallForm,
    GoDataConfigForm,
    MetaMappingList,
    MetaMappingFormEdit,
    MetaMappingFormNew,
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

                        {/* MetaData configuration */ ''}
                        <Route
                            exact
                            path={META_MAPPING_LIST_PATH}
                            component={MetaMappingList}
                        />

                        <Route
                            exact
                            path={META_MAPPING_FORM_EDIT_PATH}
                            component={MetaMappingFormEdit}
                        />

                        <Route
                            exact
                            path={META_MAPPING_FORM_NEW_PATH}
                            component={MetaMappingFormNew}
                        />

                        <Route
                            exact
                            path={GODATA_CALL_FORM_PATH}
                            component={GoDataCallForm}
                        />

                        <Redirect from="*" to={HOME_PATH} />
                    </Switch>
                </main>
            </div>
        </HashRouter>
    </AlertHandler>
)

export default App
