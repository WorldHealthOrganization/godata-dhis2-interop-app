import { Menu } from '@dhis2/ui'
import React from 'react'

import {
    METADATA_CONFIG_LIST_PATH,
    METADATA_CONFIG_LIST_LABEL,
    META_DATA_MAPPING_LIST_PATH,
    META_DATA_MAPPING_LIST_LABEL,
    GODATA_CALL_FORM_PATH,
    GODATA_CALL_FORM_LABEL,
    META_MAPPING_LIST_LABEL,
    META_MAPPING_LIST_PATH,
    GODATA_CONFIG_FORM_LABEL,
    GODATA_CONFIG_FORM_PATH,
    HOME_PATH,
    HOME_LABEL,
} from '../views'
import { NavigationItem } from './NavigationItem'
import { dataTest } from '../dataTest'

export const Navigation = () => (
    <Menu dataTest={dataTest('navigation-navigation')}>
        <NavigationItem path={HOME_PATH} label={HOME_LABEL} exactMatch={true} />

        <NavigationItem
            path={GODATA_CONFIG_FORM_PATH}
            label={GODATA_CONFIG_FORM_LABEL}
        />

        <NavigationItem
            path={METADATA_CONFIG_LIST_PATH}
            label={METADATA_CONFIG_LIST_LABEL}
        />

    </Menu>
)
