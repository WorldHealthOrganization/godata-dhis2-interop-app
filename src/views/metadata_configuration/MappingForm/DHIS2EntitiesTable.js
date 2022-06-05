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

export const DHIS2EntitiesTable = ({toolbar, entities, onSelect}) => {
    const [dhis2ModalFilter, setDHIS2ModalFilter] = useState('true')

    return (
        <>
            <SingleSelectField
                onChange={({ selected }) => setDHIS2ModalFilter(selected)}
                selected={dhis2ModalFilter}
            >
                <SingleSelectOption
                    value={'true'}
                    label={'Metadata properties'}
                />
                <SingleSelectOption value={'delm'} label={'Data elements'} />
                <SingleSelectOption value={'attr'} label={'Attributes'} />
            </SingleSelectField>
            <div style={{ marginTop: 30 }}>
                <DataTableToolbar>
                    <p>{toolbar}</p>
                </DataTableToolbar>
                <DataTable>
                    <TableHead>
                        <DataTableRow>
                            <DataTableColumnHeader>Name</DataTableColumnHeader>
                            {dhis2ModalFilter === 'delm' && (
                                <DataTableColumnHeader>
                                    Program Stage
                                </DataTableColumnHeader>
                            )}
                        </DataTableRow>
                    </TableHead>
                    <TableBody>
                        {entities
                                .filter(
                                    ({ conversion }) =>
                                        conversion === dhis2ModalFilter
                                )
                                .map((dhisValueElem, i) => (
                                    <DataTableRow key={i}>
                                        <DataTableCell
                                            className={styles.pointer}
                                            onClick={() =>
                                                onSelect(dhisValueElem)
                                            }
                                        >
                                            {dhisValueElem.dhis2Description ||
                                                dhisValueElem.dhis2 ||
                                                ''}
                                        </DataTableCell>
                                        {dhis2ModalFilter === 'delm' && (
                                            <DataTableCell
                                                className={styles.cell}
                                            >
                                                {dhisValueElem.programStageName ||
                                                    ''}
                                            </DataTableCell>
                                        )}
                                    </DataTableRow>
                                ))}
                    </TableBody>
                </DataTable>
            </div>
        </>
    )
}
