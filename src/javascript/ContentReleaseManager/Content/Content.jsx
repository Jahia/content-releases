import React from 'react';
import {useTable} from 'react-table';
import {Table, TableHead, TableHeadCell, TableRow, TableBody, TableBodyCell, TablePagination, IconTextIcon} from '@jahia/moonstone';
import {tablePaginationDataFlat} from './fakeData';

const columnsWidth = {
    selection: '52px',
    status: '120px',
    type: '120px',
    createdBy: '120px',
    lastModifiedOn: '160px'
};

const ContentCmp = props => {
    console.log('ContentCmp props:', props);

    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [currentPage, setCurrentPage] = React.useState(1);
    const data = React.useMemo(() => tablePaginationDataFlat.slice((currentPage - 1) * rowsPerPage, Math.min(tablePaginationDataFlat.length, currentPage * rowsPerPage)), [currentPage, rowsPerPage]);
    const columns = React.useMemo(() => [
        {
            Header: 'Name',
            id: 'name',
            accessor: row => row.name.value,
            Cell: cellInfo => {
                const {row} = cellInfo;
                return <IconTextIcon iconStart={row.original.name.icon}>{row.values.name}</IconTextIcon>;
            }
        },
        {Header: 'Type', accessor: 'type', customWidth: columnsWidth.type},
        {Header: 'Created By', accessor: 'createdBy', customWidth: columnsWidth.createdBy},
        {Header: 'Last Modified On', accessor: 'lastModifiedOn', customWidth: columnsWidth.lastModifiedOn}
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable(
        {
            data,
            columns
        }
    );

    return (
        <>
            <Table {...getTableProps()}>
                <TableHead>
                    {headerGroups.map(headerGroup => (
                        // A key is included in headerGroup.getHeaderGroupProps
                        // eslint-disable-next-line react/jsx-key
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                // A key is included in column.getHeaderProps
                                // eslint-disable-next-line react/jsx-key
                                <TableHeadCell {...column.getHeaderProps()} width={column.customWidth}>
                                    {column.render('Header')}
                                </TableHeadCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            // A key is included in row.getRowProps
                            // eslint-disable-next-line react/jsx-key
                            <TableRow {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    // A key is included in cell.getCellProps
                                    // eslint-disable-next-line react/jsx-key
                                    <TableBodyCell {...cell.getCellProps()} width={cell.column.customWidth}>
                                        {cell.render('Cell')}
                                    </TableBodyCell>
                                ))}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <TablePagination
                currentPage={currentPage}
                totalNumberOfRows={tablePaginationDataFlat.length}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={rowsPerPage => setRowsPerPage(rowsPerPage)}
                onPageChange={page => setCurrentPage(page)}
            />
        </>
    );
};

ContentCmp.displayName = 'Content';
export default ContentCmp;
