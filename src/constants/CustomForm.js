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
    InputField,
    TextAreaField,
} from '@dhis2/ui'
import { useHistory } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import {
    useReadMappingConfigConstantsQueryForConfig,
    useReadProgramsQueryForMappings,
} from '.'
import { METADATA_CONFIG_LIST_PATH } from '../views'
import {
    GODATA_OUTBREAK,
    GODATA_CASE,
    GODATA_CONTACT,
    GODATA_CONTACT_OF_CONTACT,
    GODATA_ORG_UNIT,
    GODATA_CUSTOM,
} from '../constants'
import { JsonEditor as Editor } from 'jsoneditor-react'
import 'jsoneditor-react/es/editor.min.css'
import 'react-responsive-modal/styles.css'
const { Field } = ReactFinalForm
import axios from 'axios'
import 'jsoneditor-react/es/editor.min.css'
import ReactJson from 'react-json-view'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import dot from 'dot-object'
import {
    useCreateCasesConstantMutation,
    useUpdateCasesConstantMutation,
} from '.'
import { FormRow } from '../forms'
import { PageSubHeadline } from '../headline'
import { dataTest } from '../dataTest'
import i18n from '../locales'
const { Form } = ReactFinalForm

var mappings, dhismappings

function iterate(obj) {
    var walked = []
    var stack = [
        {
            obj: obj,
            stack: '',
        },
    ]
    mappings = []
    var i = 0

    while (stack.length > 0) {
        var item = stack.pop()
        var obj = item.obj

        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                if (typeof obj[property] == 'object') {
                    var alreadyFound = false

                    for (var i = 0; i < walked.length; i++) {
                        if (walked[i] === obj[property]) {
                            alreadyFound = true
                            break
                        }
                    }

                    if (!alreadyFound) {
                        walked.push(obj[property])
                        stack.push({
                            obj: obj[property],
                            stack: item.stack + '.' + property,
                        })
                    }
                } else {
                    i++
                    mappings.push({
                        godata: (item.stack + '.' + property).substr(1),
                        dhis2: '',
                        props: {
                            conversion: 'true',
                            values: {},
                        },
                    })
                }
            } //  console.log('mappings length ' + mappings.length)
        }
    }
}

function iterate2(obj) {
    var walked = []
    var stack = [
        {
            obj: obj,
            stack: '',
        },
    ]
    dhismappings = []

    while (stack.length > 0) {
        var item = stack.pop()
        var obj = item.obj

        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                if (typeof obj[property] == 'object') {
                    var alreadyFound = false

                    for (var i = 0; i < walked.length; i++) {
                        if (walked[i] === obj[property]) {
                            alreadyFound = true
                            break
                        }
                    }

                    if (!alreadyFound) {
                        walked.push(obj[property])
                        stack.push({
                            obj: obj[property],
                            stack: item.stack + '.' + property,
                        })
                    }
                } else {
                    dhismappings.push({
                        dhis2: (item.stack + '.' + property).substr(1),
                    }) //mappings.set(item.stack + '.' + property , 'to be other stuff');
                    //console.log(item.stack + '.' + property /*+ "=" + obj[property]*/);
                }
            }
        }
    }

    console.log('dhis2 mappings length ' + dhismappings.length)
}

export const CustomForm = ({
    onCancelClick,
    onSubmit,
    initialValues,
    converterType,
}) => {
    const history = useHistory()
    const [open, setOpen] = useState(false)
    const [openDhisModel, setOpenDhisModel] = useState(false)
    const [openGodataModel, setOpenGodataModel] = useState(false)
    const [valueHolder, setValueHolder] = useState({})
    const [dhisValue, setDhisValue] = useState({})
    const [godataValue, setGodataValue] = useState([])
    const [godataModel, setGodataModel] = useState({})
    const [dhisModel, setDhisModel] = useState({})
    const [objectType, setObjectType] = useState('')
    const [mappingName, setMappingName] = useState('')
    const [nameInput, setNameInput] = useState('')
    const [dhisModelInput, setDhisModelInput] = useState('')
    const [godataModelInput, setGodataModelInput] = useState('')

    const [addCasesConstant] = useCreateCasesConstantMutation()
    const [saveCasesConstant] = useUpdateCasesConstantMutation()
    useEffect(() => {
        console.log('initialValues.name ' + initialValues.name)
        //              iterate(instanceObject.data[0]);

        if (initialValues.name === 'undefined') {
            setGodataValue(JSON.parse(initialValues.description)[0].godataValue)
            setNameInput(initialValues.name)
            setGodataModelInput(
                JSON.stringify(JSON.parse(initialValues.description)[1])
            )
            setDhisModelInput(
                JSON.stringify(JSON.parse(initialValues.description)[2])
            )
        }

        console.log('converterType ' + converterType)

        return () => {
            console.log('This will be logged on unmount')
        }
    }, [])

    const submitText = initialValues.name
        ? i18n.t('Save mappings')
        : i18n.t('Add mappings')

    const editNode = instance => {
        console.log(
            JSON.stringify(
                'inst ns ' + instance.namespace + ' name ' + instance.name
            )
        )
        setGodataValue(godataValue => {
            const Outbreak = [...godataValue]
            var tmp = Outbreak[1][instance.namespace[1]]
            console.log('tmp' + JSON.stringify(tmp))
            var path = ''
            instance.namespace.shift()
            instance.namespace.shift()
            instance.namespace.forEach(element => (path = path + element + '.'))
            path = path + instance.name //for(var p in instance.namespace){path+p+'.'}

            console.log('path' + path)
            dot.str(path, instance.new_value, tmp) //tmp.dhis2 = instance.new_value

            return Outbreak
        })
        return true
    }

    const copyFromPopup = instance => {
        if (instance.name == 'dhis2') {
            console.log(instance.src) //read and replace dhuis2 placeholder and update ui

            var ths = dot.str(
                'dhis2',
                instance.src,
                godataValue[1][valueHolder[2]]
            )
            console.log('str ths: ' + JSON.stringify(ths))
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
        console.log('addjsoneditor')
    }

    const deleteNode = instance => {
        console.log('deletejsoneditor ' + JSON.stringify(instance.namespace))
        const wanted = godataValue[1][instance.namespace[1]]
        console.log('wanted ' + JSON.stringify(wanted))
        const newgodata = godataValue[1].filter(item => item !== wanted)
        let Outbreak = [...godataValue]
        Outbreak[1] = newgodata
        setGodataValue(Outbreak)
        return true
    }

    const onNameInput = ev => {
        setNameInput(ev)
    }

    const saveConstant = async godataValue => {
        const godataModelJson =
            Object.keys(godataModelInput).length != 0
                ? JSON.parse(godataModelInput)
                : {}
        const dhisModelJson =
            Object.keys(dhisModelInput).length != 0
                ? JSON.parse(dhisModelInput)
                : {}
        const allValues = []
        allValues.push(godataValue)
        console.log('allValues godataValue ' + JSON.stringify(allValues))
        allValues.push(godataModelJson)
        console.log('allValues godataModelJson ' + JSON.stringify(allValues))
        allValues.push(dhisModelJson)
        console.log('allValues dhisModelJson ' + JSON.stringify(allValues))

        if (initialValues.name) {
            var id = initialValues.id
            await saveCasesConstant({
                allValues,
                nameInput,
                id,
            })
        } else {
            await addCasesConstant({
                allValues,
                nameInput,
            })
        }

        history.push(METADATA_CONFIG_LIST_PATH)
    }

    const setObjectTypeAndMappingName = selected => {
        setObjectType(selected)
        if (selected == GODATA_OUTBREAK) {
            setMappingName('Outbreak')
        }
        if (selected == GODATA_CASE) {
            setMappingName('Case')
        }
        if (selected == GODATA_CONTACT) {
            setMappingName('Contact')
        }
        if (selected == GODATA_CONTACT_OF_CONTACT) {
            setMappingName('Contact-of-Contact')
        }
        if (selected == GODATA_ORG_UNIT) {
            setMappingName('Location')
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
        iterate2(dhisModel)
        setDhisValue(dhismappings)
    }

    const onCloseGodataModel = ev => {
        setOpenGodataModel(false)
        iterate(godataModel)
        const caseMeta = []
        caseMeta.push([
            {
                conversionType: objectType,
            },
        ])
        caseMeta.push(mappings)
        setGodataValue(caseMeta)
    }

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
                        {i18n.t(objectType + ' mappings setup')}
                    </PageSubHeadline>
                    <FormRow>
                        <SingleSelectField
                            label={i18n.t('Type')}
                            onChange={({ selected }) =>
                                setObjectTypeAndMappingName(selected)
                            }
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
                        </SingleSelectField>
                    </FormRow>
                    <ButtonStrip>
                        <Button onClick={() => getGodataModel()}>
                            {i18n.t('Select Go.Data Model')}
                        </Button>
                        <Button onClick={() => getDhisModel()}>
                            {i18n.t('Select DHIS2 Model')}
                        </Button>
                    </ButtonStrip>

                    <FormRow>
                        <Field
                            required
                            name="name" //value=''
                            //component={InputFieldFF}
                            render={() => (
                                <InputField
                                    id="name"
                                    label={i18n.t('Name')}
                                    className=""
                                    type="text"
                                    value={nameInput} //component={InputField}
                                    onChange={ev => onNameInput(ev.value)}
                                    validate={composeValidators(
                                        string,
                                        hasValue
                                    )}
                                    required
                                />
                            )}
                            validate={composeValidators(string, hasValue)}
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
                                name={mappingName}
                                displayArrayKey={true}
                            />
                        </div>
                    </FormRow>

                    <Modal
                        open={openGodataModel}
                        onClose={onCloseGodataModel}
                        center
                    >
                        <h2>Select Go.Data metadata Model</h2>
                        <div>
                            <Editor
                                mode="text"
                                value={godataModel}
                                onChange={ev => setGodataModel(ev)}
                            />
                        </div>
                    </Modal>
                    <Modal
                        open={openDhisModel}
                        onClose={onCloseDhisModel}
                        center
                    >
                        <h2>Select DHIS2 metadata Model</h2>
                        <div>
                            <Editor
                                mode="text"
                                value={dhisModel}
                                onChange={ev => setDhisModel(ev)}
                            />
                        </div>
                    </Modal>

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
                        <Button
                            primary
                            onClick={() =>
                                saveConstant({
                                    godataValue,
                                })
                            }
                        >
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
CustomForm.defaultProps = {
    initialValues: {
        parameters: [],
    },
    converterType: '',
}
CustomForm.propTypes = {
    onCancelClick: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    converterType: PropTypes.string,
}
