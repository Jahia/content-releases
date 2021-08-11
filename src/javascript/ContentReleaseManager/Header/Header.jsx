import {Button, Header, HelpOutline, Add} from '@jahia/moonstone';
// Import AddIcon from '@material-ui/icons/Add';
// import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
// Import HelpIcon from '@material-ui/icons/Help';
import React from 'react';
import {useTranslation} from 'react-i18next';

const HeaderCmp = props => {
    console.log('HeaderCmp props:', props);
    const {t} = useTranslation('content-releases');
    const handleCreate = () => {
        console.log('should call content editor UI !');
    };

    const handleHelp = () => {
        console.log('should show the help modal !');
    };

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
