import {
    SingleSelectField,
    SingleSelectOption,
    Button,
    ButtonStrip,
    ReactFinalForm,
    CenteredContent,
    CircularLoader,
    hasValue,
    InputField,
    InputFieldFF,
    TextAreaFieldFF,
    TableHead,
    ModalActions,
    ModalContent,
    ModalTitle,
    AlertBar,
} from '@dhis2/ui'
import styles from '../../../App.module.css'
import {
    DataTable,
    DataTableToolbar,
    DataTableColumnHeader,
    DataTableRow,
    DataTableCell,
    TableBody,
} from '@dhis2-ui/table'
import * as dataStore from '../../../utils/dataStore.js'
import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { METADATA_CONFIG_LIST_PATH } from '../..'
import {
    GODATA_OUTBREAK,
    GODATA_CASE,
    GODATA_CONTACT,
    GODATA_CONTACT_OF_CONTACT,
    GODATA_ORG_UNIT,
    GODATA_EVENT,
} from '../../../constants'
import { JsonEditor as Editor } from 'jsoneditor-react'
import 'jsoneditor-react/es/editor.min.css'
import 'react-responsive-modal/styles.css'
import 'jsoneditor-react/es/editor.min.css'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import { PageHeadline } from '../../../headline'
import { dataTest } from '../../../dataTest'
import i18n from '../../../locales'
import { DeleteModal } from './DeleteModal'
import { DataTableMap } from './DataTableMap'
import { useReadProgramsWithStagesQueryForMappings } from '../../../constants'
import { useCredentials } from '../../../constants/helpers'
import { FormRow } from '../../../forms'
import { Mapping } from '../../../models/mapping'
import { DHIS2EntitiesTable } from './DHIS2EntitiesTable'
import { DHIS2PropertiesTable } from './DHIS2PropertiesTable'

const { Form, Field } = ReactFinalForm

export const MappingForm = () => {
    const history = useHistory()
    const params = useParams()
    const [alertBarMessage, setAlertBarMessage] = useState('')
    const [alertBar, setAlertBar] = useState(false)
    const [clickedRow, setRow] = useState()
    const [open, setOpen] = useState(false)
    const [openDhisModel, setOpenDhisModel] = useState(false)
    const [openGodataModel, setOpenGodataModel] = useState(false)
    const [dhisValue, setDhisValue] = useState([])
    const [godataValue, setGodataValue] = useState([])
    const [godataModel, setGodataModel] = useState({})
    const [dhisModel, setDhisModel] = useState({})
    const [objectType, setObjectType] = useState('')
    const [nameInput, setNameInput] = useState('')
    const [entities, setEntities] = useState({})
    const [attributes, setAttributes] = useState()
    const [inputCellModal, setInputCellModal] = useState(false)
    const [cellModalData, setCellModalData] = useState({})
    const [selectedModal, setSelectedModal] = useState('DHIS2 entities')
    const [deleteModal, setDeleteModal] = useState(false)
    const { loadingCredentials, credentials } = useCredentials()
    const [programIndex, setProgramIndex] = useState(0)
    const [properties, setProperties] = useState([])
    const [errorConstant, setErrorConstant] = useState(false)

    const {
        loading,
        data: progData,
        error,
    } = useReadProgramsWithStagesQueryForMappings()

    const onSubmitDeleteAction = deleteRow => {
        if (deleteRow) {
            console.log({ deleteRow, clickedRow })
            const val = godataValue
            val[1].splice(clickedRow, 1)
            console.log(val[1])
            setGodataValue(val)
            setDeleteModal(false)
        }
    }

    const onRowClick = (rowId, cell, value) => {
        if (cell === 'godata') {
            setInputCellModal(true)
            setCellModalData({
                row: rowId,
                data: value,
                field: 'godata',
                label: 'Godata key',
            })
        } else if (cell === 'dhis2') {
            setRow(rowId)
            setCellModalData({
                row: rowId,
                data: value,
                field: 'dhis2',
                label: 'Constant',
            })
            setOpen(true)
        } else if (cell === 'values') {
            setInputCellModal(true)
            setCellModalData({
                row: rowId,
                data: value,
                field: 'props.values',
                label: 'Transformations',
                jsonEdit: true,
            })
        } else if (cell === 'delete') {
            console.log("delete")
            setRow(rowId)
            setDeleteModal(true)
        }
    }

    const onSelectEntity = selected => {
        const val = godataValue
        let value = val[1][clickedRow]
        value = { ...value, ...selected }
        value.programName = progData.programs.programs[programIndex].shortName

        selected.props = {}
        selected.props.values = {}
        selected.props.conversion = selected.conversion
        delete selected.conversion

        value = { ...value, ...selected }
        val[1][clickedRow] = value
        setGodataValue(val)
        setOpen(false)
    }

    const onSelectProperty = selected => {
        const val = godataValue
        let value = val[1][clickedRow]
        selected.dhis2Description = selected.dhis2
        selected.props = {}
        selected.props.values = {}
        selected.props.conversion = selected.conversion
        delete selected.conversion

        value = { ...value, ...selected }
        val[1][clickedRow] = value
        setGodataValue(val)
        setOpen(false)
    }

    const processAll = useCallback(async () => {
        if (!!params.id) {
            //EDIT
            const mappings = await dataStore.getValue('mappings')

            if (params.id >= mappings.length)
                history.push(METADATA_CONFIG_LIST_PATH)
            const initialValues = mappings[params.id]
            if (!initialValues) history.push(METADATA_CONFIG_LIST_PATH)
            setObjectType(
                initialValues.mapping[0].godataValue[0][0].conversionType
            )
            setNameInput(initialValues.displayName)
            setGodataValue(initialValues.mapping[0].godataValue)
            setGodataModel(initialValues.mapping[1])
            setDhisModel(initialValues.mapping[2])
            const attribs = Mapping.secondIterator(initialValues.mapping[2])
            setAttributes(attribs)
            setProperties(attribs)
        }
        if (!loading) {
            const entitiesLoaded = Mapping.entityIterator(
                progData && progData.programs.programs.length > 0
                    ? progData.programs.programs[programIndex]
                    : {}
            )

            setEntities(entitiesLoaded)

            setDhisValue(entitiesLoaded)
        }
    })

    useEffect(() => {
        processAll()
    }, [loading, loadingCredentials])

    const onSubmit = async values => {
        history.push(METADATA_CONFIG_LIST_PATH)
    }

    const alertValues = (values, row, field, json, isConstant = false) => {
        const breakoutField = field.split('.')
        const val = godataValue
        if (breakoutField.length > 1) {
            try {
                val[1][row][breakoutField[0]][breakoutField[1]] = json
                    ? JSON.parse(values.value)
                    : values.value
            } catch (err) {
                setErrorConstant(true)
                console.log('ERROR:')
                console.log(err.message)
                return
            }
        } else val[1][row][field] = values.value

        if (isConstant) {
            val[1][row].props.conversion = 'false'
            val[1][row].dhis2Description = val[1][row].dhis2
            delete val[1][row].program
        }

        setGodataValue(val)
        setInputCellModal(false)
        setOpen(false)
        setErrorConstant(false)
    }

    const onCloseModal = () => {
        setOpen(false)
    }

    const saveConstant = async godataValue => {
        if (!!params.id)
            await dataStore.editById('mappings', params.id, {
                displayName: nameInput,
                mapping: [godataValue, godataModel, dhisModel],
            })
        else
            await dataStore.appendValue('mappings', {
                displayName: nameInput,
                mapping: [godataValue, godataModel, dhisModel],
            })

        history.push(METADATA_CONFIG_LIST_PATH)
    }

    const setObjectTypeAndMappingName = selected => {
        setObjectType(selected)
        if (!!godataValue) {
            const val = [...godataValue]
            if (val.length > 0 && val[0].length > 0)
                val[0][0].conversionType = selected
            setGodataValue(val)
        }
    }
    const getGodataModel = () => {
        setOpenGodataModel(true)
    }
    const getDhisModel = () => {
        setOpenDhisModel(true)
    }

    const onCloseDhisModel = ev => {
        setOpenDhisModel(false)
        const attributesMapped = Mapping.secondIterator(dhisModel)
        setAttributes(attributesMapped)

        if (selectedModal === 'DHIS2 entities') setDhisValue(entities)
        else if (selectedModal === 'DHIS2 property')
            setDhisValue(attributesMapped)
        else setDhisValue(attributesMapped)
    }

    const onCloseGodataModel = ev => {
        setOpenGodataModel(false)

        const caseMeta = []
        caseMeta.push([
            {
                conversionType: objectType,
            },
        ])
        caseMeta.push(Mapping.mainIterator(godataModel))
        setGodataValue(caseMeta)
    }

    /**
     * @post If
     *          the go.data version is 2.40+
     *          CustomForm is on CreateMode
     *
     */
    const updateGoDataModel = async () => {
        const editMode = !!params.id
        console.log({ editMode, objectType })
        if (editMode) setAlertBarMessage('Not enabled on edit mode')
        if (!objectType)
            setAlertBarMessage(
                'Please select a form type before using "Autogenerate"'
            )
        if (loadingCredentials) setAlertBarMessage('Credentials not loaded')

        if (editMode || !objectType || loadingCredentials) {
            setAlertBar(true)
            return
        }

        const map = await Mapping.autoGenerate(objectType, credentials)
        if (!map) {
            setAlertBarMessage(
                'No sample models sent from the configured Go.Data instance. To activate this functionality, please update the Go.Data instance to version 2.40+.'
            )
            setAlertBar(true)
            return
        }
        setGodataModel(map)

        const caseMeta = []
        caseMeta.push([
            {
                conversionType: objectType,
            },
        ])
        caseMeta.push(Mapping.mainIterator(map))
        setGodataValue(caseMeta)
        setOpenGodataModel(false)
    }

    const addRow = () => {
        let val = []
        if (!!godataValue) val = [...godataValue]
        else
            val = [
                [
                    {
                        conversionType: objectType,
                    },
                ],
            ]
        const newValue = {
            godata: '',
            dhis2: '',
            props: {
                conversion: 'true',
                values: {},
            },
        }
        if (val.length > 1) {
            if (val[1].length > 0) {
                val[1] = [newValue, ...val[1]]
            } else val[1] = [newValue]
        } else {
            val = [
                [
                    {
                        conversionType: '',
                    },
                ],
                [newValue],
            ]
        }
        setGodataValue(val)
    }

    if (loading)
        return (
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        )

    if (error)
        return (
            <>
                <NoticeBox error title={'Error'}>
                    {error}
                </NoticeBox>
            </>
        )

    return (
        <>
            <PageHeadline>
                {i18n.t(
                    objectType
                        ? `${objectType} mappings setup`
                        : 'Mappings setup'
                )}
            </PageHeadline>
            <Form keepDirtyOnReinitialize onSubmit={onSubmit}>
                {({ handleSubmit }) => (
                    <form
                        onSubmit={handleSubmit}
                        data-test={dataTest('gateways-gatewaygenericform')}
                    >
                        <FormRow>
                            <SingleSelectField
                                label={i18n.t('Type')}
                                onChange={({ selected }) => {
                                    setObjectTypeAndMappingName(selected)
                                }}
                                selected={objectType}
                                dataTest={dataTest(
                                    'views-gatewayconfigformnew-gatewaytype'
                                )}
                            >
                                <SingleSelectOption
                                    value={GODATA_OUTBREAK}
                                    label={i18n.t(GODATA_OUTBREAK)}
                                />

                                <SingleSelectOption
                                    value={GODATA_CASE}
                                    label={i18n.t(GODATA_CASE)}
                                />

                                <SingleSelectOption
                                    value={GODATA_CONTACT}
                                    label={i18n.t(GODATA_CONTACT)}
                                />

                                <SingleSelectOption
                                    value={GODATA_CONTACT_OF_CONTACT}
                                    label={i18n.t(GODATA_CONTACT_OF_CONTACT)}
                                />

                                <SingleSelectOption
                                    value={GODATA_ORG_UNIT}
                                    label={i18n.t(GODATA_ORG_UNIT)}
                                />

                                <SingleSelectOption
                                    value={GODATA_EVENT}
                                    label={i18n.t(GODATA_EVENT)}
                                />
                            </SingleSelectField>
                        </FormRow>

                        {!loading &&
                            progData.programs.programs.length >
                                programIndex && (
                                <FormRow>
                                    <SingleSelectField
                                        label={'Program'}
                                        onChange={({ selected }) => {
                                            console.log(
                                                Mapping.entityIterator(
                                                    progData.programs.programs[
                                                        selected
                                                    ]
                                                )
                                            )
                                            setEntities(
                                                Mapping.entityIterator(
                                                    progData.programs.programs[
                                                        selected
                                                    ]
                                                )
                                            )
                                            if (
                                                selectedModal ===
                                                'DHIS2 entities'
                                            )
                                                setDhisValue(
                                                    Mapping.entityIterator(
                                                        progData.programs
                                                            .programs[selected]
                                                    )
                                                )
                                            setProgramIndex(selected)
                                        }}
                                        selected={programIndex.toString()}
                                    >
                                        {progData.programs.programs.map(
                                            ({ shortName }, i) => (
                                                <SingleSelectOption
                                                    key={i}
                                                    value={i.toString()}
                                                    label={shortName}
                                                />
                                            )
                                        )}
                                    </SingleSelectField>
                                </FormRow>
                            )}

                        <FormRow>
                            <InputField
                                required
                                name="name"
                                label="Name"
                                value={nameInput}
                                validate={hasValue}
                                onChange={ev => {
                                    setNameInput(ev.value)
                                }}
                            />
                        </FormRow>
                        <div style={{ marginBottom: 20, marginTop: 30 }}>
                            <ButtonStrip>
                                <Button onClick={() => getGodataModel()}>
                                    {i18n.t('Select Go.Data Model')}
                                </Button>
                                <Button onClick={() => getDhisModel()}>
                                    {i18n.t('Select DHIS2 Model')}
                                </Button>
                                <Button primary onClick={addRow}>
                                    {i18n.t('Add row')}
                                </Button>
                            </ButtonStrip>
                        </div>

                        <DataTableMap
                            data={godataValue.length > 0 ? godataValue[1] : []}
                            onRowClick={onRowClick}
                        />
                        <Modal open={open} onClose={onCloseModal} center>
                            <ModalTitle>Select DHIS2 metadata</ModalTitle>
                            <ModalContent>
                                <SingleSelectField
                                    onChange={({ selected }) => {
                                        setSelectedModal(selected)
                                        if (selected === 'DHIS2 entities')
                                            setDhisValue(entities)
                                        else if (selected === 'DHIS2 property')
                                            setDhisValue(attributes)
                                        else setDhisValue(attributes)
                                    }}
                                    selected={selectedModal}
                                >
                                    <SingleSelectOption
                                        value={'DHIS2 entities'}
                                        label={'DHIS2 entities'}
                                    />
                                    <SingleSelectOption
                                        value={'DHIS2 property'}
                                        label={'DHIS2 property'}
                                    />
                                    <SingleSelectOption
                                        value={'Constant'}
                                        label={'Constant'}
                                    />
                                </SingleSelectField>
                                {selectedModal === 'DHIS2 entities' && (
                                    <DHIS2EntitiesTable
                                        onSelect={onSelectEntity}
                                        entities={dhisValue}
                                        toolbar={
                                            progData.programs.programs[
                                                programIndex
                                            ].shortName
                                        }
                                    />
                                )}

                                {selectedModal === 'Constant' && (
                                    <FormRow>
                                        {console.log('modal render')}
                                        <Form
                                            onSubmit={values =>
                                                alertValues(
                                                    values,
                                                    cellModalData.row,
                                                    'dhis2',
                                                    false,
                                                    true
                                                )
                                            }
                                        >
                                            {({ handleSubmit }) => (
                                                <form onSubmit={handleSubmit}>
                                                    <FormRow>
                                                        <Field
                                                            name="value"
                                                            label="Introduce the constant"
                                                            initialValue={
                                                                cellModalData.data
                                                            }
                                                            component={
                                                                InputFieldFF
                                                            }
                                                        />
                                                    </FormRow>
                                                    <Button
                                                        type="submit"
                                                        primary
                                                    >
                                                        Save
                                                    </Button>
                                                </form>
                                            )}
                                        </Form>
                                    </FormRow>
                                )}
                                {selectedModal === 'DHIS2 property' && (
                                    <DHIS2PropertiesTable
                                        properties={attributes}
                                        onSelect={onSelectProperty}
                                        toolbar={
                                            progData.programs.programs[
                                                programIndex
                                            ].shortName
                                        }
                                    />
                                )}
                            </ModalContent>
                        </Modal>
                        <ButtonStrip>
                            <Button
                                primary
                                onClick={() =>
                                    saveConstant({
                                        godataValue,
                                    })
                                }
                            >
                                Save mappings
                            </Button>
                            <Button
                                onClick={() =>
                                    history.push(METADATA_CONFIG_LIST_PATH)
                                }
                            >
                                {i18n.t('Cancel')}
                            </Button>
                        </ButtonStrip>
                    </form>
                )}
            </Form>
            <Modal
                open={inputCellModal}
                onClose={() => setInputCellModal(false)}
            >
                <ModalTitle>Introduce your value:</ModalTitle>
                <ModalContent>
                    <Form
                        onSubmit={values =>
                            alertValues(
                                values,
                                cellModalData.row,
                                cellModalData.field,
                                cellModalData.jsonEdit
                            )
                        }
                    >
                        {({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                {!cellModalData.jsonEdit ? (
                                    <FormRow>
                                        <Field
                                            name="value"
                                            label={cellModalData.label}
                                            initialValue={cellModalData.data}
                                            component={InputFieldFF}
                                        />
                                    </FormRow>
                                ) : (
                                    <>
                                        <Field
                                            name="value"
                                            label={cellModalData.label}
                                            initialValue={cellModalData.data}
                                            component={TextAreaFieldFF}
                                        />
                                        <p
                                            style={{
                                                color: 'red',
                                                margin: '10px',
                                            }}
                                        >
                                            {errorConstant &&
                                                'Please input a valid json'}
                                        </p>
                                    </>
                                )}
                                <ButtonStrip>
                                    <Button type="submit" primary>
                                        Save
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setInputCellModal(false)
                                            setErrorConstant(false)
                                        }}
                                    >
                                        {i18n.t('Cancel')}
                                    </Button>
                                </ButtonStrip>
                            </form>
                        )}
                    </Form>
                </ModalContent>
            </Modal>
            <Modal
                open={openGodataModel}
                onClose={() => setOpenGodataModel(false)}
                center
            >
                <ModalTitle>Select Go.Data metadata Model</ModalTitle>
                <ModalContent>
                    <Editor
                        mode="text"
                        value={godataModel}
                        onChange={ev => setGodataModel(ev)}
                    />
                </ModalContent>
                <ModalActions>
                    <ButtonStrip>
                        <Button
                            primary
                            onClick={() => onCloseGodataModel()}
                            type="submit"
                        >
                            Submit
                        </Button>
                        <Button
                            primary
                            onClick={() => updateGoDataModel()}
                            type="submit"
                        >
                            Autogenerate model
                        </Button>
                        <Button onClick={() => setOpenGodataModel(false)}>
                            {i18n.t('Cancel')}
                        </Button>
                    </ButtonStrip>
                </ModalActions>
            </Modal>
            <Modal open={openDhisModel} onClose={onCloseDhisModel} center>
                <ModalTitle>Select DHIS2 metadata Model</ModalTitle>
                <ModalContent>
                    <Editor
                        mode="text"
                        value={dhisModel}
                        onChange={ev => setDhisModel(ev)}
                    />
                </ModalContent>
            </Modal>
            {console.log({deleteModal})}
            {deleteModal && <DeleteModal onSubmit={onSubmitDeleteAction} onCancel={() => setDeleteModal(false)} />}
            {alertBar && (
                <div
                    style={{
                        height: '260px',
                    }}
                >
                    <div
                        className="alert-bars"
                        style={{
                            bottom: 0,
                            left: 0,
                            paddingLeft: 16,
                            position: 'fixed',
                            width: '100%',
                        }}
                    >
                        <React.Fragment key=".0">
                            <AlertBar
                                onHidden={() => setAlertBar(false)}
                                warning
                            >
                                {alertBarMessage}
                            </AlertBar>
                        </React.Fragment>
                    </div>
                </div>
            )}
        </>
    )
}
