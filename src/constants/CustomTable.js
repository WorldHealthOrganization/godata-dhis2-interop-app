import { ReactFinalForm, InputField, InputFieldFF, TableHead } from '@dhis2/ui'
import {
    DataTable,
    DataTableColumnHeader,
    DataTableRow,
    DataTableCell,
    TableBody,
} from '@dhis2-ui/table'
import React, { useState } from 'react'
const { Field } = ReactFinalForm
export const CustomTable = ({ godataValue }) => {
    console.log(godataValue)
    if (!godataValue) return <></>

    return (
        <DataTable>
            <TableHead>
                <DataTableRow>
                    <DataTableColumnHeader>Godata</DataTableColumnHeader>
                    <DataTableColumnHeader>Dhis</DataTableColumnHeader>
                    <DataTableColumnHeader>Conversion</DataTableColumnHeader>
                    <DataTableColumnHeader>Values</DataTableColumnHeader>
                </DataTableRow>
            </TableHead>
            <TableBody>
                {console.log(godataValue[1])}
                {godataValue.length >= 1 &&
                    godataValue[1].map(({ godata, dhis, props }, i) => (
                        <DataTableRow key={i}>
                            {console.log(godata)}
                            <DataTableCell>
                                <InputField value={godata} />
                            </DataTableCell>
                            <DataTableCell>{dhis}</DataTableCell>
                            <DataTableCell>{props.conversion}</DataTableCell>
                            <DataTableCell>
                                <InputField
                                    value={JSON.stringify(props.values)}
                                />
                            </DataTableCell>
                        </DataTableRow>
                    ))}
            </TableBody>
        </DataTable>
    )
}
