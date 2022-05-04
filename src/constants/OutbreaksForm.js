import {
    Button,
    ButtonStrip,
    ReactFinalForm,
    TextArea,
    CenteredContent,
    CircularLoader,
    composeValidators,
    hasValue,
    string,
    InputField,
    TextAreaField,
} from '@dhis2/ui'
import { useHistory } from 'react-router-dom'
import React, { useEffect, useState, useCallback } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { METADATA_CONFIG_LIST_PATH } from '../views'
import * as dataStore from '../utils/dataStore.js'
import { useParams } from 'react-router-dom'
const { Field } = ReactFinalForm

import { getCredentialsFromUserDataStore } from '../utils/get'

import axios from 'axios'

import 'jsoneditor-react/es/editor.min.css'
import ReactJson from 'react-json-view'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import dot from 'dot-object'

import { FormRow } from '../forms'
import { PageSubHeadline } from '../headline'
import { dataTest } from '../dataTest'
import i18n from '../locales'
import { useReadProgramsQueryForMappings } from '.'
import { GODATA_OUTBREAK_MODEL } from './GodataMetaModels.js'
const { Form } = ReactFinalForm
import { composeJSONFromGodataModel, iterate2 } from '../utils/index.js'

export const OutbreaksForm = ({
    onCancelClick,
    onSubmit,
    initialValues,
    converterType,
}) => {
    const params = useParams()
    const JSON_TITLE = 'Outbreak'
    const CONVERSION_TYPE = 'Go.Data Outbreak'
    const history = useHistory()
    const [open, setOpen] = useState(false)
    const [valueHolder, setValueHolder] = useState({})
    const [dhisValue, setDhisValue] = useState({})
    const [godataValue, setGodataValue] = useState([])

    const [nameInput, setNameInput] = useState(initialValues.displayName)

    var dhisMappings
    const [loading, setLoading] = useState(true)

    const {
        loading: loadingProgramsData,
        data: programs,
        error: error,
    } = useReadProgramsQueryForMappings()

    const processAll = useCallback(async () => {
        console.log({
            loadingProgramsData,
            programs,
            error,
        })
        if (!loadingProgramsData) {
            const programInstance =
                programs && programs.programs.programs.length > 0
                    ? programs.programs.programs[0]
                    : {}
            const caseMeta = []
            caseMeta.push([{ conversionType: CONVERSION_TYPE }])
            caseMeta.push(composeJSONFromGodataModel(GODATA_OUTBREAK_MODEL))
            setGodataValue(caseMeta)

            dhisMappings = iterate2(programInstance)
            setDhisValue(dhisMappings)

            if (!!initialValues.displayName) {
                console.log(initialValues.mapping)
                setGodataValue(initialValues.mapping[0].godataValue)
                setNameInput(initialValues.displayName)
            }
            setLoading(false)
        }
    })

    useEffect(() => {
        processAll()
    }, [loadingProgramsData])

    const submitText = initialValues.displayName
        ? i18n.t('Save mappings')
        : i18n.t('Add mappings')

    const editNode = instance => {
        setGodataValue(instance.updated_src)
        return true
    }

    const copyFromPopup = instance => {
        if (instance.name == 'dhis2') {
            var ths = dot.str(
                'dhis2',
                instance.src,
                godataValue[1][valueHolder[2]]
            )
            setGodataValue(godataValue => {
                const Outbreak = [...godataValue]
                Outbreak[1][valueHolder[2]] = ths
                return Outbreak
            })
            setOpen(false)
        } else {
            console.log('Wrong element selected')
        }

        return true
    }

    const selectedNode = instance => {
        //store initial values into useStore, we need this to replace placeholder next
        setValueHolder(instance.namespace),
            instance.name == 'dhis2'
                ? setOpen(true)
                : console.log('wrong element selected'),
            console.log(
                'select Node with popup:  ' + JSON.stringify(instance.namespace)
            )
        return true
    }

    const onCloseModal = () => {
        setOpen(false)
    }
    const addNode = () => {
        console.log('addJsoneditor')
    }

    const deleteNode = instance => {
        console.log('deleteEsoneditor ' + JSON.stringify(instance.namespace))
        const wanted = godataValue[1][instance.namespace[1]]
        console.log('wanted ' + JSON.stringify(wanted))
        const newGodata = godataValue[1].filter(item => item !== wanted)
        let Outbreak = [...godataValue]
        Outbreak[1] = newGodata
        setGodataValue(Outbreak)

        return true
    }

    const onNameInput = ev => {
        setNameInput(ev)
    }

    //console.log(nameInput)
    const saveConstant = async () => {
        if (initialValues.displayName) {
            await dataStore.editById('mappings', params.id, {
                displayName: nameInput,
                mapping: [{ godataValue: godataValue }, {}, {}],
            })
        } else {
            await dataStore.appendValue('mappings', {
                displayName: nameInput,
                mapping: [{ godataValue: godataValue }, {}, {}],
            })
        }

        history.push(METADATA_CONFIG_LIST_PATH)
    }
    if (loading)
        return (
            <>
                <CenteredContent>
                    <CircularLoader />
                </CenteredContent>
            </>
        )
    return (
        <Form
            keepDirtyOnReinitialize
            onSubmit={onSubmit}
            initialValues={initialValues}
        >
            {({ handleSubmit, values, submitting, pristine }) => (
                <form
                    onSubmit={handleSubmit}
                    data-test={dataTest('gateways-gatewaygenericform')}
                >
                    <PageSubHeadline>
                        {i18n.t('Outbreaks mappings setup')}
                    </PageSubHeadline>

                    <FormRow>
                        <Field
                            required
                            name="name"
                            //value=''
                            //component={InputFieldFF}
                            render={() => (
                                <InputField
                                    id="name"
                                    label={i18n.t('Name')}
                                    type="text"
                                    value={nameInput}
                                    onChange={ev => onNameInput(ev.value)}
                                    required
                                />
                            )}
                        />
                    </FormRow>

                    <FormRow>
                        <div>
                            <ReactJson
                                src={godataValue}
                                onAdd={addNode}
                                onEdit={editNode}
                                onDelete={deleteNode}
                                enableClipboard={selectedNode}
                                theme="apathy:inverted"
                                name={JSON_TITLE}
                                displayArrayKey={true}
                            />
                        </div>
                    </FormRow>

                    <Modal open={open} onClose={onCloseModal} center>
                        <h2>Select DHIS2 metadata</h2>
                        <div>
                            <ReactJson
                                src={dhisValue}
                                enableClipboard={copyFromPopup}
                                theme="apathy:inverted"
                                name={'Program'}
                                displayArrayKey={true}
                            />
                        </div>
                    </Modal>
                    <ButtonStrip>
                        <Button primary onClick={() => saveConstant()}>
                            {submitText}
                        </Button>
                        <Button onClick={() => onCancelClick(pristine)}>
                            {i18n.t('Cancel')}
                        </Button>
                    </ButtonStrip>
                </form>
            )}
        </Form>
    )
}

OutbreaksForm.defaultProps = {
    initialValues: {
        parameters: [],
    },
    converterType: '',
}

OutbreaksForm.propTypes = {
    onCancelClick: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    converterType: PropTypes.string,
}
