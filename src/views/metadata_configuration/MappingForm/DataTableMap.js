import React from 'react'

import {
    DataTable,
    DataTableColumnHeader,
    DataTableRow,
    DataTableCell,
    TableBody,
    TableHead,
} from '@dhis2-ui/table'
import { FormRow } from '../../../forms'
import { DeleteIcon } from '../../../svg/delete-16.js'
import styles from '../../../App.module.css'

export const DataTableMap = ({ data, onRowClick }) => {
    const conversionValue = {
        true: 'Property',
        false: 'Constant',
        delm: 'Data Element',
        attr: 'Attribute',
        stage: 'Stage',
        geo: 'Geometry',
    }

    const truncateString = (string, max) =>
        string.length > max ? `${string.slice(0, max)}...` : string

    return (
        <FormRow>
            <DataTable>
                <TableHead>
                    <DataTableRow>
                        <DataTableColumnHeader>Go.Data</DataTableColumnHeader>
                        <DataTableColumnHeader>DHIS2</DataTableColumnHeader>
                        <DataTableColumnHeader>Program</DataTableColumnHeader>
                        <DataTableColumnHeader>
                            Conversion
                        </DataTableColumnHeader>
                        <DataTableColumnHeader>Values</DataTableColumnHeader>
                        <DataTableColumnHeader width="48px">
                            Delete
                        </DataTableColumnHeader>
                    </DataTableRow>
                </TableHead>
                <TableBody>
                    {console.log(data)}
                    {data.map(
                        (
                            {
                                godata,
                                dhis2,
                                programName,
                                props,
                                dhis2Description,
                            },
                            i
                        ) => (
                            <DataTableRow key={i}>
                                <DataTableCell
                                    className={styles.pointer}
                                    onClick={() =>
                                        onRowClick(i, 'godata', godata)
                                    }
                                >
                                    {godata}
                                </DataTableCell>
                                <DataTableCell
                                    className={styles.cell}
                                    onClick={() => {
                                        const value = !!dhis2Description
                                            ? dhis2Description
                                            : dhis2
                                        onRowClick(i, 'dhis2', value)
                                    }}
                                >
                                    {!!dhis2Description
                                        ? dhis2Description
                                        : dhis2}
                                </DataTableCell>
                                <DataTableCell className={styles.pointer}>
                                    {programName}
                                </DataTableCell>
                                <DataTableCell className={styles.cell}>
                                    {conversionValue[props.conversion] || ''}
                                </DataTableCell>
                                <DataTableCell
                                    className={styles.pointer}
                                    onClick={() =>
                                        onRowClick(
                                            i,
                                            'values',
                                            JSON.stringify(props.values)
                                        )
                                    }
                                >
                                    {truncateString(
                                        JSON.stringify(props.values),
                                        27
                                    )}
                                </DataTableCell>
                                <DataTableCell
                                    className={styles.cell}
                                    width="48px"
                                    align="center"
                                    onClick={() => onRowClick(i, 'delete', '')}
                                >
                                    <DeleteIcon />
                                </DataTableCell>
                            </DataTableRow>
                        )
                    )}
                </TableBody>
            </DataTable>
        </FormRow>
    )
}
