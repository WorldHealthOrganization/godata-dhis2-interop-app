import React from 'react'
import i18n from '../../locales'
import { PageHeadline } from '../../headline'
import { dataTest } from '../../dataTest'
import {
    DHIS_CONFIG_FORM_PATH,
    SCHEDULED_TASK_FORM_PATH,
    INTEROP_LIST_PATH,
    METADATA_CONFIG_LIST_PATH,
    GODATA_CONFIG_FORM_PATH,
} from '../'
import s from './Home.module.css'
import HomeCard from './HomeCard'

export const HOME_PATH = '/'
export const HOME_LABEL = 'Overview'

export const Home = () => {
    return (
        <div data-test={dataTest('views-home')} className={s.container}>
            <PageHeadline>
                {i18n.t('Overview: Configure Go.Data-DHIS2 Interoperability App', {
                    nsSeparator: '>',
                })}
            </PageHeadline>
            <p className={s.explanation}>
                {i18n.t(
                    'Configure your settings for sending and receiving data across Go.Data and DHIS2 platforms.'
                )}
            </p>
            <div className={s.grid}>
                <div className={s.gridItem}>
                    <HomeCard
                        titleText={i18n.t('Go.Data Configuration')}
                        bodyText={i18n.t(
                            'Add and manage Go.Data server credentials for sending and receiving to DHIS2.'
                        )}
                        linkText={i18n.t('Set up Go.Data server instance')}
                        to={GODATA_CONFIG_FORM_PATH}
                    />
                </div>
                <div className={s.gridItem}>
                    <HomeCard
                        titleText={i18n.t('DHIS2 Configuration')}
                        bodyText={i18n.t(
                            'Add and manage DHIS2 server credentials for sending and receiving to Go.Data.'
                        )}
                        linkText={i18n.t('Set up DHIS2 server instance')}
                        to={DHIS_CONFIG_FORM_PATH}
                    />
                </div>
                <div className={s.gridItem}>
                    <HomeCard
                        titleText={i18n.t('Metadata Mapping')}
                        bodyText={i18n.t(
                            'Specify granular metadata mappings for your data exchange – i.e. dataElements and Program Attributes that should map to various Go.Data variables and vice versa.'
                        )}
                        linkText={i18n.t('Map Metadata')}
                        to={METADATA_CONFIG_LIST_PATH}
                    />
                </div>
                <div className={s.gridItem}>
                    <HomeCard
                        titleText={i18n.t('Interoperability Tasks')}
                        bodyText={i18n.t(
                            'Add and manage tasks for data exchange, i.e. creating outbreaks, mapping locations, sending and receiving cases, sending and receiving contacts, etc.'
                        )}
                        linkText={i18n.t('Manage Tasks')}
                        to={INTEROP_LIST_PATH}
                    />
                </div>
            </div>
        </div>
    )
}
