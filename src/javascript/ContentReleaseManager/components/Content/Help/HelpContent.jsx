import React from 'react';
import get from 'lodash.get';
import {GET_RELEASE_HELP} from './Help.gql-queries';
import {useQuery} from '@apollo/react-hooks';
import DOMPurify from 'dompurify';
// Import {Typography} from '@jahia/moonstone';
import {Typography} from '@material-ui/core';

const HelpContent = () => {
    const [content, setContent] = React.useState(null);
    const gqlParams = {
        workspace: 'EDIT',
        path: `/sites/${window.contextJsParameters.siteKey}/releases-manager/help`,
        language: window.contextJsParameters.uilang
    };
    const {loading, error, data} = useQuery(GET_RELEASE_HELP, {
        variables: gqlParams
    });

    React.useEffect(() => {
        if (loading === false && data) {
            console.log('data :', data);
            setContent(get(data, 'response.help.content.value', 'Hey ! there is no help... Have fun :) '));
        }
    }, [loading, data]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error :(</p>;
    }

    console.log('content :', content);
    return (
        <>
            {content &&
            <Typography component="div"
                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(content, {ADD_ATTR: ['target']})}}/>}
        </>
    );
};

// HelpContent.propTypes = {
// };

export default HelpContent;
