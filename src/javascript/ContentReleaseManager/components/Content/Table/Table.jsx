import React from 'react';
import PropTypes from 'prop-types';
import {DataTable} from '@jahia/moonstone';
import {TableCellActions, stringColumn} from '@jahia/moonstone/DataTable';
import {useTranslation} from 'react-i18next';
import {withStyles} from '@material-ui/core';
import {StoreContext} from '../../../contexts';
import MenuAction from './Cells/MenuAction';
import ReleaseName from './Cells/ReleaseName';

const columnsWidth = {
    actions: '120px',
    items: '200px'
};

const styles = () => ({
    subContainer: {
        flex: '1 1 auto',
        width: '100%',
        display: 'flex',
        minWidth: 0,
        flexDirection: 'column'
    }
});

const TableCmp = props => {
    const {classes} = props;
    const {t} = useTranslation('content-releases');
    const {state} = React.useContext(StoreContext);
    const {releases} = state;

    const columns = React.useMemo(() => [
        {
            key: 'name',
            label: t('label.layout.content.table.header.name'),
            ...stringColumn(row => row.name),
            render: (value, row) => <ReleaseName release={row}/>
        },
        {
            key: 'items',
            label: t('label.layout.content.table.header.items'),
            isSortable: true,
            width: columnsWidth.items,
            render: value => value.length
        },
        {
            key: 'actions',
            label: t('label.layout.content.table.header.actions'),
            isSortable: false,
            width: columnsWidth.actions,
            render: (value, row) => (
                <TableCellActions actions={<MenuAction release={row}/>}/>
            )
        }
    ], [t]);

    return (
        <div className={classes.subContainer}>
            <DataTable
                enableSorting
                enablePagination
                data={releases}
                columns={columns}
                primaryKey="name"
                defaultSortBy="name"
                defaultSortDirection="descending"
                defaultCurrentPage={1}
                defaultItemsPerPage={25}
                rowProps={{'data-cm-role': 'table-content-list-row'}}
            />
        </div>
    );
};

TableCmp.propTypes = {
    classes: PropTypes.object.isRequired
};

TableCmp.displayName = 'Content';
export default withStyles(styles)(TableCmp);
