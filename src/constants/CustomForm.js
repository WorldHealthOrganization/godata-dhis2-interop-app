import {
    SingleSelectField,
    SingleSelectOption,
    Button,
    ButtonStrip,
    ReactFinalForm,
    TextArea,
    CenteredContent,
    CircularLoader,
    composeValidators,
    hasValue,
    string,
    Input,
    InputField,
    InputFieldFF,
    TextAreaFieldFF,
    CheckboxField,
    TableHead,
    ModalActions,
    ModalContent,
    ModalTitle,
    AlertBar,
} from '@dhis2/ui'
import styles from '../App.module.css'
import {
    DataTable,
    DataTableColumnHeader,
    DataTableRow,
    DataTableCell,
    TableBody,
} from '@dhis2-ui/table'
import { DeleteIcon } from '../svg/delete-16.js'
import * as dataStore from '../utils/dataStore.js'
import { useHistory } from 'react-router-dom'
import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'

import { METADATA_CONFIG_LIST_PATH } from '../views'
import {
    GODATA_OUTBREAK,
    GODATA_CASE,
    GODATA_CONTACT,
    GODATA_CONTACT_OF_CONTACT,
    GODATA_ORG_UNIT,
    GODATA_EVENT,
    mappingNames,
} from '../constants'
import { JsonEditor as Editor } from 'jsoneditor-react'
import 'jsoneditor-react/es/editor.min.css'
import 'react-responsive-modal/styles.css'
const { Field } = ReactFinalForm
import 'jsoneditor-react/es/editor.min.css'
import ReactJson from 'react-json-view'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import dot from 'dot-object'
import { FormRow } from '../forms'
import { PageHeadline } from '../headline'
import { dataTest } from '../dataTest'
import i18n from '../locales'
import { useReadProgramsWithStagesQueryForMappings } from '.'
import { Mapping } from '../models/mapping.js'
import { useCredentials } from './helpers'

const { Form } = ReactFinalForm

export const CustomForm = () => {
    const history = useHistory()
    const params = useParams()
    const [alertBarMessage, setAlertBarMessage] = useState('')
    const [alertBar, setAlertBar] = useState(false)
    const [clickedRow, setRow] = useState()
    const [open, setOpen] = useState(false)
    const [openDhisModel, setOpenDhisModel] = useState(false)
    const [openGodataModel, setOpenGodataModel] = useState(false)
    const [dhisValue, setDhisValue] = useState({})
    const [godataValue, setGodataValue] = useState([])
    const [godataModel, setGodataModel] = useState({})
    const [dhisModel, setDhisModel] = useState({})
    const [objectType, setObjectType] = useState('')
    const [mappingName, setMappingName] = useState('')
    const [nameInput, setNameInput] = useState('')
    const [entities, setEntities] = useState({})
    const [attributes, setAttributes] = useState()
    const [inputCellModal, setInputCellModal] = useState(false)
    const [cellModalData, setCellModalData] = useState({})
    const [selectedModal, setSelectedModal] = useState('DHIS2 entities')
    const [deleteModal, setDeleteModal] = useState(false)
    const { loadingCredentials, credentials } = useCredentials()

    const {
        loading,
        data: progData,
        error,
    } = useReadProgramsWithStagesQueryForMappings()

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
        }
        if (!loading) {
            const entitiesLoaded = Mapping.entityIterator(
                progData && progData.programs.programs.length > 0
                    ? progData.programs.programs[0]
                    : {}
            )
            const attribs = Mapping.secondIterator(dhisModel)
            setEntities(entitiesLoaded)
            setAttributes(attribs)
            if (selectedModal === 'DHIS2 entities') setDhisValue(entitiesLoaded)
            else setDhisValue(attribs)
        }
    })

    useEffect(() => {
        processAll()
    }, [loading, progData])

    const onSubmit = async values => {
        history.push(METADATA_CONFIG_LIST_PATH)
    }

    const alertValues = (values, row, field, json) => {
        const breakoutField = field.split('.')
        const val = godataValue
        if (breakoutField.length > 1)
            val[1][row][breakoutField[0]][breakoutField[1]] = json
                ? JSON.parse(values.value)
                : values.value
        else val[1][row][field] = values.value

        setGodataValue(val)
        setInputCellModal(false)
        setOpen(false)
    }

    const truncateString = (string, max) =>
        string.length > max ? `${string.slice(0, max)}...` : string

    const copyFromPopup = instance => {
        const value = dot.str('dhis2', instance.src, godataValue[1][clickedRow])
        if (selectedModal === 'DHIS2 entities') {
            if (!!instance?.namespace && instance.namespace.length > 1) {
                const selectedEntity = entities[instance.namespace[1]]
                if (!!selectedEntity && !!selectedEntity['description: name']) {
                    value.dhis2Description = selectedEntity['description: name']
                }
            }
            let dhis2 = value.dhis2.split(' ')
            if (dhis2.length > 1) {
                value.props.conversion = dhis2[0]
                value.dhis2 = dhis2[1]
            } else value.dhis2 = dhis2[0]
        }
        const val = godataValue
        val[1][clickedRow] = value
        setGodataValue(val)
        setOpen(false)
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
        if (selected == GODATA_OUTBREAK) {
            setMappingName('Outbreak')
        } else if (selected == GODATA_CASE) {
            setMappingName('Case')
        } else if (selected == GODATA_CONTACT) {
            setMappingName('Contact')
        } else if (selected == GODATA_CONTACT_OF_CONTACT) {
            setMappingName('Contact-of-Contact')
        } else if (selected == GODATA_ORG_UNIT) {
            setMappingName('Location')
        } else if (selected == GODATA_EVENT) {
            setMappingName('Event')
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
        setAttributes(Mapping.secondIterator(dhisModel))
        if (selectedModal === 'DHIS2 entities') setDhisValue(entities)
        else setDhisValue(attributes)
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
            setAlertBarMessage('No sample models sent from the configured Go.Data instance. To activate this functionality, please update the Go.Data instance to version 2.40+.')
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
        //setOpenGodataModel(false)
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

                        <FormRow>
                            <DataTable>
                                <TableHead>
                                    <DataTableRow>
                                        <DataTableColumnHeader>
                                            Go.Data
                                        </DataTableColumnHeader>
                                        <DataTableColumnHeader>
                                            DHIS2
                                        </DataTableColumnHeader>
                                        <DataTableColumnHeader>
                                            Conversion
                                        </DataTableColumnHeader>
                                        <DataTableColumnHeader>
                                            Values
                                        </DataTableColumnHeader>
                                        <DataTableColumnHeader>
                                            Delete
                                        </DataTableColumnHeader>
                                    </DataTableRow>
                                </TableHead>
                                <TableBody>
                                    {console.log(godataValue)}
                                    {godataValue.length >= 1 &&
                                        godataValue[1].map(
                                            (
                                                {
                                                    godata,
                                                    dhis2,
                                                    props,
                                                    dhis2Description,
                                                },
                                                i
                                            ) => (
                                                <DataTableRow key={i}>
                                                    <DataTableCell
                                                        className={
                                                            styles.pointer
                                                        }
                                                        onClick={() => {
                                                            setInputCellModal(
                                                                true
                                                            )
                                                            setCellModalData({
                                                                row: i,
                                                                data: godata,
                                                                field: 'godata',
                                                                label: 'Godata key',
                                                            })
                                                        }}
                                                    >
                                                        {godata}
                                                    </DataTableCell>
                                                    <DataTableCell
                                                        className={styles.cell}
                                                        onClick={() => {
                                                            setRow(i)
                                                            setCellModalData({
                                                                row: i,
                                                                data: dhis2,
                                                                field: 'dhis2',
                                                                label: 'Constant',
                                                            })
                                                            setOpen(true)
                                                        }}
                                                    >
                                                        {!!dhis2Description
                                                            ? dhis2Description
                                                            : dhis2}
                                                    </DataTableCell>
                                                    <DataTableCell
                                                        className={
                                                            styles.pointer
                                                        }
                                                        onClick={() => {
                                                            setInputCellModal(
                                                                true
                                                            )
                                                            setCellModalData({
                                                                row: i,
                                                                data: props.conversion,
                                                                field: 'props.conversion',
                                                                label: 'Conversion Type',
                                                            })
                                                        }}
                                                    >
                                                        {truncateString(
                                                            props.conversion,
                                                            27
                                                        )}
                                                    </DataTableCell>
                                                    <DataTableCell
                                                        className={styles.cell}
                                                        onClick={() => {
                                                            setInputCellModal(
                                                                true
                                                            )
                                                            setCellModalData({
                                                                row: i,
                                                                data: JSON.stringify(
                                                                    props.values
                                                                ),
                                                                field: 'props.values',
                                                                label: 'Transformations',
                                                                jsonEdit: true,
                                                            })
                                                        }}
                                                    >
                                                        {truncateString(
                                                            JSON.stringify(
                                                                props.values
                                                            ),
                                                            27
                                                        )}
                                                    </DataTableCell>
                                                    <DataTableCell
                                                        className={
                                                            styles.pointer
                                                        }
                                                        onClick={() => {
                                                            setRow(i)
                                                            setDeleteModal(true)
                                                        }}
                                                    >
                                                        <DeleteIcon />
                                                    </DataTableCell>
                                                </DataTableRow>
                                            )
                                        )}
                                </TableBody>
                            </DataTable>
                        </FormRow>

                        <Modal open={open} onClose={onCloseModal} center>
                            <ModalTitle>Select DHIS2 metadata</ModalTitle>
                            <ModalContent>
                                <SingleSelectField
                                    onChange={({ selected }) => {
                                        setSelectedModal(selected)
                                        if (selected === 'DHIS2 entities')
                                            setDhisValue(entities)
                                        else setDhisValue(attributes)
                                    }}
                                    selected={selectedModal}
                                >
                                    <SingleSelectOption
                                        value={'DHIS2 entities'}
                                        label={'DHIS2 entities'}
                                    />
                                    <SingleSelectOption
                                        value={'DHIS2 modal keys'}
                                        label={'DHIS2 modal keys'}
                                    />
                                    <SingleSelectOption
                                        value={'Constant'}
                                        label={'Constant'}
                                    />
                                </SingleSelectField>

                                {selectedModal === 'Constant' ? (
                                    <FormRow>
                                        <Form
                                            onSubmit={values =>
                                                alertValues(
                                                    values,
                                                    cellModalData.row,
                                                    'dhis2',
                                                    false
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
                                ) : (
                                    <ReactJson
                                        src={dhisValue}
                                        enableClipboard={copyFromPopup}
                                        theme="apathy:inverted"
                                        name={'Options'}
                                        displayArrayKey={true}
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
                                    <Field
                                        name="value"
                                        label={cellModalData.label}
                                        initialValue={cellModalData.data}
                                        component={TextAreaFieldFF}
                                    />
                                )}
                                <ButtonStrip>
                                    <Button type="submit" primary>
                                        Save
                                    </Button>
                                    <Button
                                        onClick={() => setInputCellModal(false)}
                                    >
                                        {i18n.t('Cancel')}
                                    </Button>{' '}
                                </ButtonStrip>
                            </form>
                        )}
                    </Form>
                </ModalContent>
            </Modal>
            <Modal open={openGodataModel} onClose={() => setOpenGodataModel(false)} center>
                <ModalTitle>Select Go.Data metadata Model </ModalTitle>
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
            <Modal
                open={deleteModal}
                onClose={() => setDeleteModal(false)}
                center
            >
                <Form onSubmit={() => setDeleteModal(false)}>
                    {({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <ModalTitle>
                                {i18n.t('Confirm deletion')}
                            </ModalTitle>
                            <ModalContent>
                                {i18n.t(
                                    'Are you sure you want to delete the selected row?'
                                )}
                            </ModalContent>
                            <ModalActions>
                                <ButtonStrip>
                                    <Button
                                        destructive
                                        onClick={() => {
                                            const val = godataValue
                                            val[1].splice(clickedRow, 1)
                                            setGodataValue(val)
                                            setInputCellModal(false)
                                        }}
                                        type="submit"
                                    >
                                        {'Delete'}
                                    </Button>
                                    <Button
                                        onClick={() => setDeleteModal(false)}
                                    >
                                        {i18n.t('Cancel')}
                                    </Button>
                                </ButtonStrip>
                            </ModalActions>
                        </form>
                    )}
                </Form>
            </Modal>
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
