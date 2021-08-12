import {Button, Header, HelpOutline, Add} from '@jahia/moonstone';
import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import get from 'lodash.get';
import {useTranslation} from 'react-i18next';
import {GET_RELEASE_ID} from './ReleaseFolderGraphQL';
import {registry} from '@jahia/ui-extender';

const HeaderCmp = props => {
    console.log('HeaderCmp props:', props);
    const {t} = useTranslation('content-releases');
    const [uuid, setUuid] = React.useState(null);

    const variables = {
        workspace: 'EDIT',
        path: `/sites/${window.contextJsParameters.siteKey}/releases`
    };
    const {loading, error, data} = useQuery(GET_RELEASE_ID, {
        variables
    });

    React.useEffect(() => {
        if (loading === false && data) {
            setUuid(get(data, 'response.folder.uuid', null));
        }
    }, [loading, data]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error :(</p>;
    }

    const createBtn = registry.get('action', 'createButton');
    console.log('createBtn :', createBtn);

    const path = `${window.contextJsParameters.urlbase}/content-editor/${lang}/create/${uuid}/jnt:release`;
    const disabled= false;
    const handleCreate = () => {
        const lang = window.contextJsParameters.lang;
        const uilang = window.contextJsParameters.uilang;
        const url = `${window.contextJsParameters.urlbase}/content-editor/${lang}/create/${uuid}/jnt:release`;
        window.open(url, '_blank');
        // Window.location = url;
        console.log('call CE_API.create with ', uuid, variables.path, lang, uilang, '[\'jnt:release\']');
        // Window.CE_API.create(uuid, variables.path, lang, uilang, ['jnt:release']);
        // http://mySite.com/sampleContext/jahia/content-editor/en/create/6e85d4f9-7d98-4045-aad7-c4abca9c6664/jnt:text
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
                <DisplayAction actionKey={editActionKey}
                               path={path}
                               disabled={disabled}
                               render={ButtonRenderer}
                               buttonProps={{size: 'big',label:t('label.layout.header.btn.create')}}/>,
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
