import React from 'react';
import PropTypes from 'prop-types';
import {useTable, useSortBy} from 'react-table';
import {SortIndicator, Table, TableHead, TableHeadCell, TableRow, TableBody, TableBodyCell, TablePagination} from '@jahia/moonstone';
// Import {tablePaginationDataFlat} from './fakeData';
// import {ContextualMenu} from '@jahia/ui-extender';
import {useTranslation} from 'react-i18next';
import {withStyles} from '@material-ui/core';
// Import classnames from 'clsx';
import {StoreContext} from '../../../contexts';
import MenuAction from './Cells/MenuAction';
import ReleaseName from './Cells/ReleaseName';

const columnsWidth = {
    actions: '120px',
    items: '160px'
};

const styles = () => ({
    // Root: {
    //     flex: '1 1 0',
    //     width: '100%',
    //     minHeight: 0,
    //     // Padding: theme.spacing.unit
    //     padding: 'var(--spacing-medium)'
    // },
    // main: {
    //     flex: '1 1 0%',
    //     width: '100%',
    //     display: 'flex',
    //     position: 'relative',
    //     overflow: 'hidden',
    //     minHeight: 0,
    //     flexDirection: 'row',
    //     backgroundColor: '#ffffff'
    // },
    // container: {
    //     flex: '1 2 0%',
    //     order: 2,
    //     display: 'flex',
    //     minWidth: 0
    //     // Transition: 'margin-left .25s,margin-right .25s',
    //     // backgroundColor: '#eff2f4'
    // },
    subContainer: {
        flex: '1 1 auto',
        width: '100%',
        display: 'flex',
        minWidth: 0,
        flexDirection: 'column'
    },
    tableContainer: {
        flex: '1 1 0%',
        outline: 'none',
        overflow: 'auto',
        position: 'relative',
        maxWidth: '100%'
    }
});

const TableCmp = props => {
    const {classes} = props;
    console.log('TableCmp props:', props);

    const {t} = useTranslation('content-releases');
    const {state} = React.useContext(StoreContext);
    const {
        releases
    } = state;

    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [currentPage, setCurrentPage] = React.useState(1);
    const data = React.useMemo(() => releases.slice((currentPage - 1) * rowsPerPage, Math.min(releases.length, currentPage * rowsPerPage)), [releases, currentPage, rowsPerPage]);
    // TODO faire un Cell sur le titre pour brancher le onclick dialog au lieu de la row
    const columns = React.useMemo(() => [
        {
            Header: t('label.layout.content.table.header.name'),
            accessor: 'name',
            id: 'name',
            Cell: cellInfo => {
                const release = cellInfo.row.original;
                return <ReleaseName release={release}/>;
            }
        },
        {
            Header: t('label.layout.content.table.header.items'),
            id: 'items',
            accessor: row => row.items.length,
            customWidth: columnsWidth.items
        },
        {
            Header: t('label.layout.content.table.header.actions'),
            accessor: 'actions',
            disableSortBy: true,
            Cell: cellInfo => {
                const release = cellInfo.row.original;
                return <MenuAction release={release}/>;
            },
            customWidth: columnsWidth.actions
        }
    ], [t]);

    // Const columns = React.useMemo(() => [
    //     {
    //         Header: t('label.layout.content.table.header.name'),
    //         id: 'name',
    //         accessor: row => row.name.value,
    //         Cell: cellInfo => {
    //             const {row} = cellInfo;
    //             return <IconTextIcon iconStart={row.original.name.icon}>{row.values.name}</IconTextIcon>;
    //         }
    //     },
    //     {Header: t('label.layout.content.table.header.items'), accessor: 'items', customWidth: columnsWidth.items},
    //     {Header: t('label.layout.content.table.header.actions'), accessor: 'actions', customWidth: columnsWidth.actions}
    // ], [t]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable(
        {
            data,
            columns,
            initialState: {
                sortBy: [
                    {id: 'name', desc: true}
                ]
            },
            disableSortRemove: true
        },
        useSortBy
    );

    const renderSortIndicator = (isSorted, isSortedDesc) => {
        const direction = isSortedDesc ? 'descending' : 'ascending';
        return <SortIndicator isSorted={isSorted} direction={direction}/>;
    };

    return (
    // <div className={classnames(
    //         classes.root,
    //         'flexCol'
    //     )}
    // >
    //     <div className={classes.main}>
    //         <div className={classes.container}>
        <div className={classes.subContainer}>
            <div className={classes.tableContainer}>
                <Table {...getTableProps()}>
                    <TableHead>
                        {headerGroups.map(headerGroup => (
                                        // A key is included in headerGroup.getHeaderGroupProps
                                        // eslint-disable-next-line react/jsx-key
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                                // A key is included in column.getHeaderProps
                                                // eslint-disable-next-line react/jsx-key
                                    <TableHeadCell {...column.getHeaderProps(column.getSortByToggleProps())}
                                                   iconEnd={column.canSort && renderSortIndicator(column.isSorted, column.isSortedDesc)}
                                                   width={column.customWidth}
                                    >
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
                                            <TableRow {...row.getRowProps()}
                                                      isHighlighted={row.values.name === 'Highlight Row'}
                                                      data-cm-role="table-content-list-row"
                                            >

                                                {row.cells.map(cell => (
                                                    // A key is included in cell.getCellProps
                                                    // eslint-disable-next-line react/jsx-key
                                                    <TableBodyCell
                                                        {...cell.getCellProps()}
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
            </div>
            <TablePagination
                            currentPage={currentPage}
                            totalNumberOfRows={releases.length}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={rowsPerPage => setRowsPerPage(rowsPerPage)}
                            onPageChange={page => setCurrentPage(page)}
                        />
        </div>
    //         </div>
    //     </div>
    // </div>
    );
};

TableCmp.propTypes = {
    classes: PropTypes.object.isRequired
};

TableCmp.displayName = 'Content';
export default withStyles(styles)(TableCmp);
