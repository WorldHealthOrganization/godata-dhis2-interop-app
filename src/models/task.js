import {
    GODATA_DHIS_OUTBREAK_TASK,
    GODATA_DHIS_LOCATION_TASK,
    GODATA_DHIS_CASE_TASK,
    GODATA_DHIS_CONTACT_TASK,
    GODATA_DHIS_EVENT_TASK,
} from '../constants'
import * as dataStore from '../utils/dataStore.js'

export class Task {
    static editLabel = 'Edit Task'
    static createLabel = 'Add Task'
    static #dataStoreTaskKey = 'tasks'
    static defaultTaskModels = {
        'Default Go.Data DHIS2 Event Task': GODATA_DHIS_EVENT_TASK,
        'Default Go.Data DHIS2 Outbreak Task': GODATA_DHIS_OUTBREAK_TASK,
        'Default Go.Data DHIS2 Location Task': GODATA_DHIS_LOCATION_TASK,
        'Default Go.Data DHIS2 Case Task': GODATA_DHIS_CASE_TASK,
        'Default Go.Data DHIS2 Contact Task': GODATA_DHIS_CONTACT_TASK,
    }

    static bidirectionalTaskType = {
        Outbreak: 'programs',
        Location: 'organisationUnits',
        'Tracked Entity': 'trackedEntityInstances',
        Event: 'events'
    }

    static getColumnsFromTaskType = (taskType) => {
        const elements = {
            programs: ['id', 'name', 'code', 'created'],
            organisationUnits: ['trackedEntityInstance', 'orgUnit', 'created'],
            trackedEntityInstances: ['trackedEntityInstance', 'orgUnit', 'created'],
        }

        return elements[taskType] || elements['Outbreak']
    }

    static getIdFromTaskType = (taskType) => {
        console.log({taskType})
        const elements = {
            programs: ['id', 'name', 'code', 'created'],
            organisationUnits: ['trackedEntityInstance', 'orgUnit', 'created'],
            trackedEntityInstances: ['trackedEntityInstance', 'orgUnit', 'created'],
        }

        return (elements[taskType] || elements['Outbreak'])[0]
    }

    constructor(
        name,
        [
            senderEndpoint,
            receiverEndpoint,
            senderParams,
            payload,
            dhisReceiver,
            converter,
            taskType,
            jsonCollectionName,
            description,
        ]
    ) {
        this.name = name
        this.senderEndpoint = senderEndpoint
        this.receiverEndpoint = receiverEndpoint
        this.senderParams = senderParams
        this.payload = payload
        this.dhisReceiver = dhisReceiver
        this.converter = converter
        this.taskType = taskType
        this.jsonCollectionName = jsonCollectionName
        this.description = description
    }

    getTaskData() {
        return [
            this.senderEndpoint,
            this.receiverEndpoint,
            this.senderParams,
            this.payload,
            this.dhisReceiver,
            this.converter,
            this.taskType,
            this.jsonCollectionName,
            this.description,
        ]
    }

    saveTask() {
        dataStore.appendValue(this.#dataStoreTaskKey, {
            displayName: this.name,
            task: this.getTaskData(),
        })
    }

    /**
     *
     * @param {String} name
     * @param {TaskData} values
     * @returns Promise
     */
    static async saveTask(name, values) {
        return dataStore.appendValue(this.#dataStoreTaskKey, {
            displayName: name,
            task: values,
        })
    }

    static async addDefaultTasks() {
        for (const [key, value] of Object.entries(this.defaultTaskModels))
            await this.saveTask(key, value)
        return this.getAllTasks()
    }

    static getAllTasks() {
        return dataStore.getValue(this.#dataStoreTaskKey)
    }
}
