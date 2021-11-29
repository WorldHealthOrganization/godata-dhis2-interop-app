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
                {i18n.t('Overview: Interoperability Configuration', {
                    nsSeparator: '>',
                })}
            </PageHeadline>
            <p className={s.explanation}>
                {i18n.t(
                    'Configure settings for sending, receiving, data reporting, alerts, registration and more.'
                )}
            </p>
            <div className={s.grid}>
                <div className={s.gridItem}>
                    <HomeCard
                        titleText={i18n.t('Go.Data Configuration')}
                        bodyText={i18n.t(
                            'Add and manage Go.Data server base URI and credntials for sending and receiving to and from DHIS2 Instance.'
                        )}
                        linkText={i18n.t('Set up Go.Data server instance')}
                        to={GODATA_CONFIG_FORM_PATH}
                    />
                </div>
                <div className={s.gridItem}>
                    <HomeCard
                        titleText={i18n.t('DHIS2 Configuration')}
                        bodyText={i18n.t(
                            'Add and manage DHIS2 server base URI and credntials for sending and receiving to and from Go.Data Instance.'
                        )}
                        linkText={i18n.t('Set up DHIS2 server instance')}
                        to={DHIS_CONFIG_FORM_PATH}
                    />
                </div>
                <div className={s.gridItem}>
                    <HomeCard
                        titleText={i18n.t('Metadata Configuration')}
                        bodyText={i18n.t(
                            'Add and manage Go.Data and DHIS2 Metadata for data exchange.'
                        )}
                        linkText={i18n.t('Map Metadata')}
                        to={METADATA_CONFIG_LIST_PATH}
                    />
                </div>
                <div className={s.gridItem}>
                    <HomeCard
                        titleText={i18n.t('Tasks Configuration')}
                        bodyText={i18n.t(
                            'Add and manage Tasks for data exchange.'
                        )}
                        linkText={i18n.t('Manage Tasks')}
                        to={INTEROP_LIST_PATH}
                    />
                </div>
                <div className={s.gridItem}>
                    <HomeCard
                        titleText={i18n.t('Scheduler')}
                        bodyText={i18n.t(
                            'Run scheduled tasks at given intervals.'
                        )}
                        linkText={i18n.t('Scheduler')}
                        to={SCHEDULED_TASK_FORM_PATH}
                    />
                </div>
            </div>
        </div>
    )
}
