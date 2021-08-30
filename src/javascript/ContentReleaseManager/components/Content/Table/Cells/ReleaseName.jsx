import React from 'react';
import PropTypes from 'prop-types';
import {IconTextIcon, Rocket} from '@jahia/moonstone';
import {withStyles} from '@material-ui/core';
import {StoreContext} from '../../../../contexts';

const styles = () => ({
    clickable: {
        cursor: 'pointer'
    },
    disabled: {
        color: 'var(--color-gray)'
    }
});

const ReleaseName = props => {
    const {classes, release} = props;
    const {dispatch} = React.useContext(StoreContext);

    const handleClick = () => {
        // Const {urlbase, siteKey, lang} = window.contextJsParameters;
        // const searchType = 'jmix:releaseItem';
        // const query = `params=(searchPath:/sites/${siteKey},sql2SearchFrom:'${searchType}',sql2SearchWhere:'releases+=!'${release.id}!'')`;
        // const url = `${urlbase}/jcontent/${siteKey}/${lang}/sql2Search/sites/${siteKey}/home?${query}`;
        // window.open(url, '_blank');

        dispatch({
            case: 'TOGGLE_SHOW_DIALOG_RELEASE_CONTENT',
            payload: {
                release
            }
        });
    };

    const getDisplay = () => {
        if (release.items.length > 0) {
            return (
                <IconTextIcon className={classes.clickable}
                              iconStart={<Rocket/>}
                              onClick={handleClick}
                >
                    {release.name}
                </IconTextIcon>
            );
        }

        return (
            <IconTextIcon iconStart={<Rocket/>}
                          className={classes.disabled}
            >
                {release.name}
            </IconTextIcon>
        );
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
