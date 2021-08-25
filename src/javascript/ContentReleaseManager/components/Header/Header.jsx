import React from 'react';
import {useTranslation} from 'react-i18next';
import {StoreContext} from '../../contexts';
import {Button, Header, HelpOutline, Add, Reload} from '@jahia/moonstone';
import {triggerRefetch} from '../../actions/refetch';

const HeaderCmp = () => {
    const {state, dispatch} = React.useContext(StoreContext);
    const {refetchers} = state;
    const {t} = useTranslation('content-releases');

    const handleCreate = () =>
        dispatch({
            case: 'TOGGLE_SHOW_DIALOG_CREATE'
        });

    const handleHelp = () =>
        dispatch({
            case: 'TOGGLE_SHOW_DIALOG_HELP'
        });

    const handleRefresh = () => triggerRefetch(refetchers, 'GET_RELEASES');

    return (
        <Header
            title={t('label.layout.header.title')}
            mainActions={[
                <Button key="b1"
                        icon={<HelpOutline fontSize="large"/>}
                        size="big"
                        color="default"
                        variant="ghost"
                        onClick={handleHelp}/>,
                <Button key="b2"
                        color="accent"
                        label={t('label.layout.header.btn.create')}
                        size="big"
                        icon={<Add/>}
                        onClick={handleCreate}/>
            ]}
            toolbarLeft={[
                <Button key="tl1"
                        label={t('label.layout.header.btn.refresh')}
                        icon={<Reload/>}
                        variant="ghost"
                        onClick={handleRefresh}/>
            ]}
        />
    );
};

HeaderCmp.displayName = 'Header';
export default HeaderCmp;
