import {
    CenteredContent,
    CircularLoader,
    Button,
    Pagination,
    SingleSelectFieldFF,
    ReactFinalForm,
    ButtonStrip,
    Checkbox,
    TableHead,
    MultiSelectField,
    MultiSelectOption,
} from '@dhis2/ui'
import { useHistory } from 'react-router-dom'

import { PageHeadline, PageSubHeadline } from '../../../headline'
import * as dataStore from '../../../utils/dataStore.js'
import {
    DataTable,
    DataTableColumnHeader,
    DataTableRow,
    DataTableCell,
    TableBody,
    TableFoot,
} from '@dhis2-ui/table'
import React, { useState, useEffect } from 'react'

const useLocalMappings = () => {
    const [mappings, setMappings] = useState()

    useEffect(() => {
        dataStore.getValue('mappings').then(setMappings)
    }, [])

    return !mappings
        ? { loading: true, mappings: mappings }
        : { loading: false, mappings: mappings }
}

export const DataTablePreview = ({ columns, data, onSubmit, program, isExport}) => {

    const idString = columns[0]
    const [checkedConstants, setCheckedConstants] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const history = useHistory()

    const attributes = ({ programTrackedEntityAttributes }) =>
        programTrackedEntityAttributes.map(
            ({ trackedEntityAttribute: { id, name } }) =>
                new Object({ label: name, value: id })
        )

    const [selectedAttributes, setSelectedAttributes] = useState([])

    const toggleAll = ({ checked }) =>
        checked
            ? setCheckedConstants(data.map(e => e[idString]))
            : setCheckedConstants([])

    const toggleSelected = ({ value, checked }) =>
        checked
            ? setCheckedConstants([...checkedConstants, value])
            : setCheckedConstants(checkedConstants.filter(e => e != value))

    const { loading: loadingMappings, mappings } = useLocalMappings()

    const getAttrValues = ({ attributes }) =>
        selectedAttributes.map(attrId => {
            if (!attributes) return ''
            const index = attributes.findIndex(({ attribute }) => {
                console.log({ attrId, attribute })
                return attrId === attribute
            })
            if (index >= 0 && !!attributes[index].value)
                return attributes[index].value
            return ''
        })

    const submitMiddleware = ({ mapping: mappingName, ...data }) => {
        let completeMappingObject = mappings.find(
            ({ displayName }) => displayName === mappingName
        )
        onSubmit({ mapping: completeMappingObject, idsToSend: checkedConstants, ...data })
    }
    if (loadingMappings)
        return (
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        )

    return (
        <ReactFinalForm.Form onSubmit={submitMiddleware}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <PageHeadline>Data preview</PageHeadline>
                    <PageSubHeadline>
                        Select the values to use and the parsing data
                    </PageSubHeadline>
                    <div className="mb">
                        <ReactFinalForm.Field
                            name="mapping"
                            label="Mappings"
                            component={SingleSelectFieldFF}
                            initialValue={
                                !loadingMappings && mappings.length > 0
                                    ? mappings[0].displayName
                                    : undefined
                            }
                            options={
                                loadingMappings
                                    ? []
                                    : mappings.map(
                                          ({ displayName }) =>
                                              new Object({
                                                  label: displayName,
                                                  value: displayName,
                                              })
                                      )
                            }
                        />
                    </div>

                    {isExport && <MultiSelectField
                        className="mb"
                        label="Display attributes"
                        onChange={({ selected }) =>
                            setSelectedAttributes(selected)
                        }
                        selected={selectedAttributes}
                    >
                        {attributes(program).map(({ label, value }, i) => (
                            <MultiSelectOption
                                key={i}
                                label={label}
                                value={value}
                            />
                        ))}
                    </MultiSelectField>}
                    <DataTable>
                        <TableHead>
                            <DataTableRow>
                                <DataTableColumnHeader width="48px">
                                    {!!data && (
                                        <Checkbox
                                            onChange={toggleAll}
                                            checked={
                                                !!data &&
                                                data.length ===
                                                    checkedConstants.length
                                            }
                                        />
                                    )}
                                </DataTableColumnHeader>
                                {!!columns &&
                                    columns.map((col, i) => (
                                        <DataTableColumnHeader key={i}>
                                            {col}
                                        </DataTableColumnHeader>
                                    ))}
                                {/* {!!selectedAttributes &&
                                    attributes(program)
                                        .filter(({ value }) =>
                                            selectedAttributes.includes(value)
                                        )
                                        .map(({ label }, i) => (
                                            <DataTableColumnHeader key={i}>
                                                {label}
                                            </DataTableColumnHeader>
                                        ))} */}
                                {!!selectedAttributes &&
                                    selectedAttributes.map((attrId, i) => (
                                        <DataTableColumnHeader key={i}>
                                            {
                                                attributes(program).find(
                                                    ({ value }) =>
                                                        value === attrId
                                                ).label
                                            }
                                        </DataTableColumnHeader>
                                    ))}
                            </DataTableRow>
                        </TableHead>
                        <TableBody>
                            {!!data &&
                                data
                                    .slice(
                                        (pageNumber - 1) * pageSize,
                                        pageNumber * pageSize
                                    )
                                    .map((elem, i) => (
                                        <DataTableRow key={i}>
                                            <DataTableCell width="48px">
                                                <Checkbox
                                                    onChange={toggleSelected}
                                                    value={elem[idString]}
                                                    checked={checkedConstants.includes(
                                                        elem[idString]
                                                    )}
                                                />
                                            </DataTableCell>
                                            {!!columns &&
                                                columns.map((col, j) => (
                                                    <DataTableCell key={j}>
                                                        {elem[col]}
                                                    </DataTableCell>
                                                ))}
                                            {!!selectedAttributes &&
                                                getAttrValues(elem).map(
                                                    (value, j) => (
                                                        <DataTableCell key={j}>
                                                            {/* {console.log({selectedAttributes})}
                                                    {console.log(elem?.attributes.find(({attribute}) => attribute === value))} */}
                                                            {/* {elem?.attributes?.find(({attribute}) => value === attribute)?.value} */}
                                                            {value}
                                                        </DataTableCell>
                                                    )
                                                )}
                                        </DataTableRow>
                                    ))}
                        </TableBody>
                        <TableFoot>
                            <DataTableRow>
                                <DataTableCell colSpan="100">
                                    <Pagination
                                        onPageChange={page =>
                                            setPageNumber(page)
                                        }
                                        onPageSizeChange={size =>
                                            setPageSize(size)
                                        }
                                        page={pageNumber}
                                        pageCount={Math.ceil(
                                            data.length / pageSize
                                        )}
                                        pageSize={pageSize}
                                        total={data.length}
                                    />
                                </DataTableCell>
                            </DataTableRow>
                        </TableFoot>
                    </DataTable>
                    <div style={{ marginTop: '20px' }}>
                        <ButtonStrip>
                            <Button type="submit" primary>
                                {isExport ? "Export" : "Import"}
                            </Button>
                            {/* <Button onClick={() => history.push('/liveTask')}>Cancel</Button> */}
                        </ButtonStrip>
                    </div>
                </form>
            )}
        </ReactFinalForm.Form>
    )
}
