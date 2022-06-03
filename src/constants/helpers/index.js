import dot from 'dot-object'
import centroid from 'turf-centroid'
import axios from 'axios'
import { getCredentialsFromUserDataStore } from '../../utils/get'
import { useState, useEffect } from 'react'

export const createAuthenticationHeader = (username, password) =>
    'Basic ' + new Buffer.from(username + ':' + password).toString('base64')

export const dhis2Headers = (credentials) => new Object({
    headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: createAuthenticationHeader(
            credentials.dhis.username,
            credentials.dhis.password
        ),
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Content-Type': 'application/json',
        crossDomain: true,
    },
})

const removeLastSlash = str =>
    str.charAt(str.length - 1) === '/' ? str.slice(0, -1) : str

export const buildUrl = (url, path, extraParams = []) => {
    const ret = new URL(removeLastSlash(new URL(url).pathname) + path, url)
    extraParams.forEach(({key, value}) => {
        ret.searchParams.append(key, value)
    })
    return ret.href
}

export const getDotNotationByValue = (
    dotnot,
    mappingModel,
    stmp,
    isDhis = false
) => {
    //set dotnot to string if its number
    if (typeof dotnot === 'number') {
        dotnot = dotnot.toString()
    }

    //GET MAPPING MODEL
    var dataArray = mappingModel[0].godataValue[1]

    if (isDhis) {
        //IF DHIS2 IS RCEIVING END
        let tmp = dataArray.find(x => x.godata === dotnot)
        if (tmp) {
            //IF MAPPING FOUND AND HAS CONVERSION. THIS MEANS VALUE SHOULD BE FETCHED FROM OTHER
            // PARTY OBJECT AND IF THERE IS CONVERSION OF VALUES TO PROCESS CONVERSION
            if (tmp.props.conversion === 'true') {
                stmp = senderData[0] //TO BE DYNAMIC

                let val = dot.pick(tmp.dhis2, stmp) //IN CASE OF GO.DATA, PROPERTY IS USED FOR SEARCHING CONVERSION VALUE

                var stringBoolean = ''

                if (typeof val == 'boolean') {
                    stringBoolean = val ? 'true' : 'false'
                } else {
                    stringBoolean = val
                }

                if (tmp.props.values[stringBoolean]) {
                    //RETURN CONVERTED VALUE
                    return tmp.props.values[stringBoolean]
                } else {
                    //RETURN RAW VALUE IF NOT FOUND IN CONVERSION TABLE
                    return val
                }
            } else if (tmp.props.conversion === 'geo') {
                console.log('call a method here for geometry')
            } else {
                return tmp.dhis2
            }
        } else {
            return 'NO VALUE SET'
        }
    } else {
        //DHIS2 IS SENDER

        let tmp = dataArray.find(x => x.godata === dotnot)

        if (tmp) {
            //IF MAPPING FOUND HAS CONVERSION. THIS MEANS VALUE SHOULD BE FETCHED FROM OTHER
            // PARTY OBJECT AND IF THERE IS CONVERSION OF VALUES TO PROCESS CONVERSION
            if (
                tmp.props.conversion === 'true' ||
                typeof tmp.props.conversion == 'boolean'
            ) {
                let val = dot.pick(tmp.dhis2, stmp)
                //set val to string if its number
                if (typeof val === 'number') {
                    val = val.toString()
                }

                var stringBoolean = ''

                if (typeof val == 'boolean') {
                    stringBoolean = val ? 'true' : 'false'
                } else {
                    stringBoolean = val
                } //IN CASE OF DHIS2 PROPERTY VALUE IS USED FOR SEARCHING CONVERSION VALUE
                //UNCOMMENT THIS:
                // if (tmp.dhis2 === 'id') {
                //     thisId = val
                //     setExistingId(val)
                // }

                let keys = Object.keys(tmp.props.values)
                for (let i = 0; i < keys.length; i++) {
                    if (stringBoolean == tmp.props.values[keys[i]]) {
                        return keys[i]
                    }
                }
                //RETURN RAW VALUE IF NOT FOUND IN CONVERSION TABLE
                return val
            } else if (tmp.props.conversion === 'geo') {
                const geom = dot.pick('geometry', stmp)

                if (geom) {
                    if ((geom.type = 'Polygon')) {
                        //get centroid
                        var centroidPoint = centroid(dot.pick('geometry', stmp))
                        var lon = centroidPoint.geometry.coordinates[0]
                        var lat = centroidPoint.geometry.coordinates[1]
                        if (Number.isNaN(centroidPoint)) {
                            //try to get Point instead
                            var point = dot.pick('geometry.coordinates', stmp)
                            if (tmp.godata === 'geoLocation.lat') {
                                return point[0]
                            } else if (tmp.godata === 'geoLocation.lng') {
                                return point[1]
                            } else {
                                return 0
                            }
                        } else {
                            if (tmp.godata === 'geoLocation.lat') {
                                return lat
                            } else if (tmp.godata === 'geoLocation.lng') {
                                return lon
                            } else {
                                return 0
                            }
                        }
                    } else if ((geom.type = 'Point')) {
                        var point = dot.pick('geometry.coordinates', stmp)
                        if (tmp.godata === 'geoLocation.lat') {
                            return point[0]
                        } else if (tmp.godata === 'geoLocation.lng') {
                            return point[1]
                        }
                    } else {
                        return 0
                    }
                }
                //none of tries are successful, simply return 0
                return 0
            } else if (tmp.props.conversion === 'delm') {
                if (!!stmp.enrollments && stmp.enrollments.length > 0) {
                    for (
                        var i = 0;
                        i < stmp.enrollments[0].events.length;
                        i++
                    ) {
                        for (
                            var y = 0;
                            y < stmp.enrollments[0].events[i].dataValues.length;
                            y++
                        ) {
                            if (
                                stmp.enrollments[0].events[i].dataValues[y]
                                    .dataElement == tmp.dhis2
                            ) {
                                return stmp.enrollments[0].events[i].dataValues[
                                    y
                                ].value
                            }
                        }
                    }
                } else return tmp.dhis2
            } else if (tmp.props.conversion === 'attr') {
                if (!!stmp.attributes) {
                    for (var i = 0; i < stmp.attributes.length; i++) {
                        if (stmp.attributes[i].attribute == tmp.dhis2) {
                            return stmp.attributes[i].value
                        }
                    }
                } else return tmp.dhis2
            } else {
                //nothing could help, simply return what was given
                return tmp.dhis2
            }
        }
    }
} //end of getTaskDone()


export const sendPayloadTo = (receiver, payload, credentials) =>
    axios({
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Content-Type': 'application/json',
            crossDomain: true,
        },
        data: {
            email: credentials.godata.username,
            password: credentials.godata.password,
        },
        url: credentials.godata.url + '/api/users/login',
    })
        .then(res =>
            axios({
                method: 'post',
                url: receiver + '?access_token=' + res.data.id,
                data: payload,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods':
                        'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                },
            })
        )
        .catch(error => error?.response?.data)

export const useCredentials = () => {
    const [status, setStatus] = useState({
        loading: true,
    })

    const fetchNow = () => {
        setStatus({ loading: true })
        getCredentialsFromUserDataStore().then(res => {
            setStatus({ credentials: res, loading: false })
        })
    }

    useEffect(() => {
        fetchNow()
    }, [])
    
    return { ...status }
}
