import {Button, Header, HelpOutline, Add} from '@jahia/moonstone';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StoreContext} from '../../contexts';

const HeaderCmp = props => {
    console.log('HeaderCmp props:', props);
    const {dispatch} = React.useContext(StoreContext);
    const {t} = useTranslation('content-releases');

    const handleCreate = () =>
        dispatch({
            case: 'TOGGLE_SHOW_DIALOG_CREATE'
        });

    const handleHelp = () =>
        dispatch({
            case: 'TOGGLE_SHOW_DIALOG_HELP'
        });
    // TODO mettre un refresh button
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
        />
    );
};

HeaderCmp.displayName = 'Header';
export default HeaderCmp;
