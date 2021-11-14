import { Button, ButtonStrip, ReactFinalForm, CircularLoader } from '@dhis2/ui'
import React from 'react'
import { PropTypes } from '@dhis2/prop-types'

import axios from 'axios'

import { JsonEditor as Editor } from 'jsoneditor-react'
import 'jsoneditor-react/es/editor.min.css'

import {
    FieldGatewayName,
} from '../gateways'
import { FormRow } from '../forms'
import { PageSubHeadline } from '../headline'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Form } = ReactFinalForm

export const GatewayGenericForm = ({
    onCancelClick,
    onSubmit,
    initialValues,
}) => {
    const submitText = initialValues
        ? i18n.t('Save mappings')
        : i18n.t('Add mappings')

        const data = () => {
            axios
            .post("http://localhost:8000/api/users/login", {
              email: 'admin@who.int',
              password: 'Rabota@2021murod',
            }
            )
            .then(response => {
                //https://godata-r5.who.int
              //const data = response.data.results;
              //this.setState({ data });
              axios
              .get("http://localhost:8000/api/locations", {
                headers : {
                    Authorization: response.data.id,
                  }
              }, 
              
              ).then(response => {
               // Editor.set(response.data)  
                  console.log(response.data)
              })
            })
            .catch(error => {
              console.log(error);
            });
            }        

            console.log('data ' + data)

        const handleChange = () => console.log('jsontreechanges')        

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
                    <PageSubHeadline>{i18n.t('Mappings setup')}</PageSubHeadline>

                    <FormRow>
                        <FieldGatewayName />
                    </FormRow>


            <Editor
            value={{}}
            onChange={handleChange}
            />

                    <ButtonStrip>
                        <Button
                            primary
                            type="submit"
                            dataTest={dataTest(
                                'forms-gatewaygenericform-submit'
                            )}
                            disabled={submitting}
                            icon={submitting ? <CircularLoader small /> : null}
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

GatewayGenericForm.defaultProps = {
    initialValues: {
        parameters: [],
    },
}

GatewayGenericForm.propTypes = {
    onCancelClick: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
}
