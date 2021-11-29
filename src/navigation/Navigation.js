import { Menu } from '@dhis2/ui'
import React from 'react'

import {
    SCHEDULED_TASK_FORM_PATH,
    SCHEDULED_TASK_FORM_LABEL,
    INTEROP_LIST_PATH,
    INTEROP_LIST_LABEL,    
    METADATA_CONFIG_LIST_PATH,
    METADATA_CONFIG_LIST_LABEL,
    GODATA_CONFIG_FORM_LABEL,
    GODATA_CONFIG_FORM_PATH,
    DHIS_CONFIG_FORM_LABEL,
    DHIS_CONFIG_FORM_PATH,
    HOME_PATH,
    HOME_LABEL,
} from '../views'
import { NavigationItem } from './NavigationItem'
import { dataTest } from '../dataTest'

export const Navigation = () => (
    <Menu dataTest={dataTest('navigation-navigation')}>
        <NavigationItem 
            path={HOME_PATH} 
            label={HOME_LABEL} 
            exactMatch={true} />

        <NavigationItem
            path={GODATA_CONFIG_FORM_PATH}
            label={GODATA_CONFIG_FORM_LABEL}
        />

        <NavigationItem
            path={DHIS_CONFIG_FORM_PATH}
            label={DHIS_CONFIG_FORM_LABEL}
        />

        <NavigationItem
            path={METADATA_CONFIG_LIST_PATH}
            label={METADATA_CONFIG_LIST_LABEL}
        />

        <NavigationItem
            path={INTEROP_LIST_PATH}
            label={INTEROP_LIST_LABEL}
        />


        <NavigationItem
            path={SCHEDULED_TASK_FORM_PATH}
            label={SCHEDULED_TASK_FORM_LABEL}
        />

    </Menu>
)
