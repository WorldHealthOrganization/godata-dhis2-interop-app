import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { CssVariables } from '@dhis2/ui'
import React from 'react'
import styles from './App.module.css'

import { useD2 } from '@dhis2/app-runtime-adapter-d2'
import { getUserSettings } from 'd2'

import { AlertHandler } from './notifications'
import { Navigation } from './navigation'
import {
    METADATA_CONFIG_LIST_PATH,
    METADATA_CONFIG_FORM_NEW_PATH,
    METADATA_CONFIG_FORM_EDIT_PATH,
    INTEROP_LIST_PATH,
    INTEROP_FORM_NEW_PATH,
    INTEROP_FORM_EDIT_PATH,
    INTEROP_RUN_TASK_FORM_PATH,
    SCHEDULED_TASK_FORM_PATH,
    GODATA_CONFIG_FORM_PATH,
    DHIS_CONFIG_FORM_PATH,
    MetadataConfigFormNew,
    MetadataConfigFormEdit,
    MetadataConfigList,
    InteropList,
    InteropFormNew,
    InteropFormEdit,
    InteropRunTaskForm,
    ScheduleTaskForm,
    GoDataConfigForm,
    DhisConfigForm,
    HOME_PATH,
    Home,
} from './views'
import { dataTest } from './dataTest'

const d2Config = {
    schemas: ['dataStore'],
}

const App = () => {
    const { d2 } = useD2()

    if (!d2) {
        return null
    }

    return (
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

                        {/* Go.Data configuration */ ''}
                        <Route
                            exact
                            path={GODATA_CONFIG_FORM_PATH}
                            component={GoDataConfigForm}
                        />

                        {/* Dhis2 configuration */ ''}
                        <Route
                            exact
                            path={DHIS_CONFIG_FORM_PATH}
                            component={DhisConfigForm}
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

                        <Route
                            exact
                            path={INTEROP_LIST_PATH}
                            component={InteropList}
                        />
                        
                        <Route
                            exact
                            path={INTEROP_FORM_NEW_PATH}
                            component={InteropFormNew}
                        />

                        <Route
                            exact
                            path={INTEROP_FORM_EDIT_PATH}
                            component={InteropFormEdit}
                        />

                        <Route
                            exact
                            path={INTEROP_RUN_TASK_FORM_PATH}
                            component={InteropRunTaskForm}
                        />
                        
                        <Route
                            exact
                            path={SCHEDULED_TASK_FORM_PATH}
                            component={ScheduleTaskForm}
                        />

                        <Redirect from="*" to={HOME_PATH} />
                    </Switch>
                </main>
            </div>
        </HashRouter>
    </AlertHandler>)
}

export default App
