import React from 'react';
import get from 'lodash.get';
import {GET_RELEASE_HELP} from './Help.gql-queries';
import {useQuery} from '@apollo/react-hooks';
import DOMPurify from 'dompurify';
import {Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = () => ({
    root: {
        margin: 'auto',
        maxWidth: '600px',
        '& h1': {
            fontSize: '1.25rem',
            color: 'var(--color-gray_dark)'
        },
        '& h2': {
            fontSize: '1rem',
            fontWeight: 400,
            color: 'var(--color-accent)',
            marginTop: '1rem'
        },
        '& p': {
            color: 'var(--color-gray_dark)'
            // FontSize: "0.875rem"
        },
        '& ol': {
            listStyle: 'decimal',
            color: 'var(--color-gray_dark)',
            marginLeft: '24px'
        }
    }
});

const HelpContent = ({classes}) => {
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
            setContent(get(
                data,
                'response.help.content.value',
                'Hey ! there is no help... Et voila '
            ));
        }
    }, [loading, data]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error :(</p>;
    }

    return (
        <>
            {content &&
            <Typography component="div"
                        className={classes.root}
                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(content, {ADD_ATTR: ['target']})}}/>}

        </>
    );
};

HelpContent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HelpContent);
