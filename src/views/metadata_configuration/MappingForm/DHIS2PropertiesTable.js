import React, {useState} from 'react'
import {
    SingleSelectField,
    SingleSelectOption,
    TableHead,
} from '@dhis2/ui'

import {
    DataTable,
    DataTableToolbar,
    DataTableColumnHeader,
    DataTableRow,
    DataTableCell,
    TableBody,
} from '@dhis2-ui/table'

import styles from '../../../App.module.css'

export const DHIS2PropertiesTable = ({toolbar, properties, onSelect}) => {

    return (
        <div style={{ marginTop: 30 }}>
        {console.log({ properties })}
        <DataTableToolbar>
            <p>
                {
                   toolbar
                }
            </p>
        </DataTableToolbar>
        <DataTable>
            <TableHead>
                <DataTableRow>
                    <DataTableColumnHeader>
                        Property
                    </DataTableColumnHeader>
                </DataTableRow>
            </TableHead>
            <TableBody>
                {properties.map(
                        ({ dhis2 }, i) => (
                            <DataTableRow
                                key={i}
                            >
                                <DataTableCell
                                    className={
                                        styles.pointer
                                    }
                                    onClick={() => {
                                        // setRow(
                                        //     i
                                        // )
                                        onSelect(
                                            {
                                                dhis2: dhis2,
                                                conversion:
                                                    'true',
                                            }
                                        )
                                    }}
                                >
                                    {dhis2}
                                </DataTableCell>
                            </DataTableRow>
                        )
                    )}
            </TableBody>
        </DataTable>
    </div>
    )
}
