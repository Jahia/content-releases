import React from 'react';
import PropTypes from 'prop-types';
import {IconTextIcon, Not, File} from '@jahia/moonstone';
import {withStyles} from '@material-ui/core';

const styles = () => ({
    clickable: {
        cursor: 'pointer'
    }
});

const ReleaseName = props => {
    const {classes, release} = props;
    console.log('ReleaseName release ->', release);

    const handleClick = () => {
        const urlbase = window.contextJsParameters.urlbase;
        const siteKey = window.contextJsParameters.siteKey;
        const lang = window.contextJsParameters.lang;
        const searchType = 'jmix:releaseItem';
        const query = `params=(searchPath:/sites/${siteKey},sql2SearchFrom:'${searchType}',sql2SearchWhere:'releases+=!'${release.id}!'')`;
        // Const encodedQuery = encodeURIComponent(query);
        const url = `${urlbase}/jcontent/${siteKey}/${lang}/sql2Search/sites/${siteKey}/home?${query}`;
        window.open(url, '_blank');
        // Console.log('handleClick table release : ', release);
        // dispatch({
        //     case: 'TOGGLE_SHOW_DIALOG_RELEASE_CONTENT',
        //     payload: {
        //         release
        //     }
        // });
    };

    const getDisplay = () => {
        if (release.items.length > 0) {
            return (
                <IconTextIcon className={classes.clickable}
                              iconStart={<File/>}
                              onClick={handleClick}
                >
                    {release.name}
                </IconTextIcon>
            );
        }

        return <IconTextIcon iconStart={<Not/>}>{release.name}</IconTextIcon>;
    };

    return (
        <>{getDisplay()}</>
    );
};

ReleaseName.propTypes = {
    classes: PropTypes.object.isRequired,
    release: PropTypes.object.isRequired
};

export default withStyles(styles)(ReleaseName);
