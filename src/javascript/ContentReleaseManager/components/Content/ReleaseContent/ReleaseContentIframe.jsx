import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core';

let styles = theme => ({
    iframe: {
        width: '100%',
        height: '100%'
    },
    error: {
        color: theme.palette.error.main
    }
});

const iStyle = `
    div.moonstone-layoutApp div.moonstone-secondaryNav {
        display:none;
    }
    div.moonstone-layoutApp main main header {
        display:none;
    }
`;

const ReleaseContentIframe = props => {
    console.log('ReleaseContentDisplay props :', props);
    const {releaseId, classes} = props;
    const {urlbase, siteKey, lang} = window.contextJsParameters;
    const searchType = 'jmix:releaseItem';
    const query = `params=(searchPath:/sites/${siteKey},sql2SearchFrom:'${searchType}',sql2SearchWhere:'releases+=!'${releaseId}!'')`;
    const url = `${urlbase}/jcontent/${siteKey}/${lang}/sql2Search/sites/${siteKey}/home?${query}`;

    const handleIframe = iframe => {
        const cleanIframe = () => {
            const iDocument = iframe.contentWindow.document;
            const head = iDocument.head;
            const slotNavigation = iDocument.querySelector('div.moonstone-slotNavigation');

            if (!slotNavigation) {
                return setTimeout(cleanIframe, 100);
            }

            slotNavigation.style.display = 'none';

            const style = document.createElement('style');
            style.setAttribute('type', 'text/css');
            style.innerText = iStyle;
            head.appendChild(style);
        };

        cleanIframe();
    };

    return (
        <>
            {releaseId &&
                <iframe src={url} className={classes.iframe} onLoad={e => handleIframe(e.target)}/>}
        </>

    );
};

ReleaseContentIframe.propTypes = {
    releaseId: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};
// Export default ReleaseContentIframe;
export default withStyles(styles)(ReleaseContentIframe);

