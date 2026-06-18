import React from 'react';
import PropTypes from 'prop-types';
import {Button, DataTable, Search} from '@jahia/moonstone';
import {TableCellActions, TableRow, stringColumn, numberColumn} from '@jahia/moonstone/DataTable';
import {useTranslation} from 'react-i18next';
import clsx from 'clsx';
import styles from './table.module.scss';
import {StoreContext} from '../../../contexts';
import MenuAction from './Cells/MenuAction';

const handleClick = release => {
    const {urlbase, siteKey, lang} = window.contextJsParameters;
    const searchType = 'releasemix:releaseItem';
    const query = `params=(searchPath:/sites/${siteKey},sql2SearchFrom:'${searchType}',sql2SearchWhere:'releases+=!'${release.id}!'')`;
    const url = `${urlbase}/jcontent/${siteKey}/${lang}/sql2Search/sites/${siteKey}/home?${query}`;
    window.open(url, '_blank');
};

const TableCmp = props => {
    const {classes} = props;
    const {t} = useTranslation('content-releases');
    const {state} = React.useContext(StoreContext);
    const {releases} = state;

    const columns = React.useMemo(() => [
        {
            key: 'name',
            label: t('label.layout.content.table.header.name'),
            ...stringColumn(row => row.name)
        },
        {
            key: 'items',
            label: t('label.layout.content.table.header.items'),
            ...numberColumn(row => row.items?.length || 0),
            isSortable: true,
            align: 'right'
        }
    ], [t]);

    return (
        <DataTable
            enableSorting
            enablePagination
            className={clsx('flexFluid', styles.table, classes)}
            data={releases}
            columns={columns}
            primaryKey="id"
            defaultSortBy="name"
            defaultItemsPerPage={25}
            renderRow={({id, data, render}) => (
                <TableRow
                    key={id}
                    data-cm-role="table-content-list-row"
                    className={clsx(data.items?.length === 0 && styles.disabled)}
                >
                    {render({
                        after: (
                            <TableCellActions
                                actions={
                                    <>
                                        {data.items?.length > 0 && (
                                            <Button variant="ghost" icon={<Search/>} onClick={() => handleClick(data)}/>
                                        )}
                                        <MenuAction release={data}/>
                                    </>
                                }
                            />
                        )
                    })}
                </TableRow>
            )}
        />
    );
};

TableCmp.propTypes = {
    classes: PropTypes.object.isRequired
};

TableCmp.displayName = 'Content';
export default TableCmp;
