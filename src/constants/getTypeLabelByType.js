import i18n from '../locales'

/**
 * @param {string} type
 * @returns {string}
 */
export const getTypeLabelByType = type => {
    if (type === 'GODATA_OUTBREAK') {
        return i18n.t('Go.Data Outbreak')
    }

    if (type === 'GODATA_CASE') {
        return i18n.t('Go.Data Case')
    }

    if (type === 'GODATA_CONTACT' || !type) {
        return i18n.t('Go.Data Contact')
    }

    if (type === 'GODATA_CONTACT_OF_CONTACT' || !type) {
        return i18n.t('Go.Data Contact of Contact')
    }
    
    if (type === 'GODATA_ORG_UNIT' || !type) {
        return i18n.t('Go.Data Organisation Unit')
    }

    return type
}
