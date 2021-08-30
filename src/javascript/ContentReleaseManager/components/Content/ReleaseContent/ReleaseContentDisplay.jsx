import React from 'react';
import PropTypes from 'prop-types';
import {useTable} from 'react-table';
import {Table, TableHead, TableHeadCell, TableRow, TableBody, TableBodyCell, TablePagination} from '@jahia/moonstone';

// Import {withStyles} from '@material-ui/core';
import {ContextualMenu} from '@jahia/ui-extender';

const columnsWidth = {
    type: '160px'
};

// Const styles = () => ({
//     root: {
//         flex: '1 1 0',
//         width: '100%',
//         minHeight: 0,
//         // Padding: theme.spacing.unit
//         padding: 'var(--spacing-medium)'
//     },
//     main: {
//         flex: '1 1 0%',
//         width: '100%',
//         display: 'flex',
//         position: 'relative',
//         overflow: 'hidden',
//         minHeight: 0,
//         flexDirection: 'row',
//         backgroundColor: '#ffffff'
//     },
//     container: {
//         flex: '1 2 0%',
//         order: 2,
//         display: 'flex',
//         minWidth: 0
//         // Transition: 'margin-left .25s,margin-right .25s',
//         // backgroundColor: '#eff2f4'
//     },
//     subContainer: {
//         flex: '1 1 auto',
//         width: '100%',
//         display: 'flex',
//         minWidth: 0,
//         flexDirection: 'column'
//     },
//     tableContainer: {
//         flex: '1 1 0%',
//         outline: 'none',
//         overflow: 'auto',
//         position: 'relative',
//         maxWidth: '100%'
//     }
// });

const ReleaseContentDisplay = props => {
    console.log('ReleaseContentDisplay props :', props);
    const {items} = props;
    console.log('ReleaseContentDisplay items :', items);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [currentPage, setCurrentPage] = React.useState(1);
    const data = React.useMemo(() => items.slice((currentPage - 1) * rowsPerPage, Math.min(items.length, currentPage * rowsPerPage)), [currentPage, rowsPerPage, items]);
    const columns = React.useMemo(() => [
        // {
        //     Header: 'Name',
        //     id: 'name',
        //     accessor: row => row.name.value,
        //     Cell: cellInfo => {
        //         const {row} = cellInfo;
        //         return <IconTextIcon iconStart={row.original.name.icon}>{row.values.name}</IconTextIcon>;
        //     }
        // },
        {Header: 'Name', accessor: 'name'},
        {Header: 'Type', accessor: 'type', customWidth: columnsWidth.type}
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

    const contextualMenus = React.useRef({});

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
                        const node = row.original;

                        contextualMenus.current[node.path] = contextualMenus.current[node.path] || React.createRef();
                        const openContextualMenu = event => {
                            contextualMenus.current[node.path].current(event);
                        };

                        return (
                            // A key is included in row.getRowProps
                            // eslint-disable-next-line react/jsx-key
                            <TableRow {...row.getRowProps()}
                                      isSelected={row.isSelected}
                                      data-cm-role="table-content-list-row"
                                      onContextMenu={event => {
                                    event.stopPropagation();
                                    openContextualMenu(event);
                                }}
                            >
                                <ContextualMenu
                                    setOpenRef={contextualMenus.current[node.path]}
                                    actionKey="contentMenu"
                                    path={node.path}
                                    paths={null}
                                    // ActionKey={selection.length === 0 || selection.indexOf(node.path) === -1 ? 'contentMenu' : 'selectedContentMenu'}
                                    // path={selection.length === 0 || selection.indexOf(node.path) === -1 ? node.path : null}
                                    // paths={selection.length === 0 || selection.indexOf(node.path) === -1 ? null : selection}
                                />
                                {row.cells.map(cell => (
                                    // A key is included in cell.getCellProps
                                    // eslint-disable-next-line react/jsx-key
                                    <TableBodyCell {
                                        ...cell.getCellProps()}
                                                   width={cell.column.customWidth}
                                    >
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
                totalNumberOfRows={items.length}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={rowsPerPage => setRowsPerPage(rowsPerPage)}
                onPageChange={page => setCurrentPage(page)}
            />
        </>
    );
};

ReleaseContentDisplay.propTypes = {
    items: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};
export default ReleaseContentDisplay;
// Export default withStyles(styles)(ReleaseContentDisplay);

