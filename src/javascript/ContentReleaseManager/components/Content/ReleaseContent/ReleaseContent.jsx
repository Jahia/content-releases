import React from 'react';
// Import PropTypes from 'prop-types';
import ReleaseContentDialog from './ReleaseContentDialog';
import {StoreContext} from '../../../contexts';

const ReleaseContent = () => {
    const {state, dispatch} = React.useContext(StoreContext);
    const {
        showDialogReleaseContent,
        releaseToShow
    } = state;

    const handleClose = () =>
        dispatch({
            case: 'TOGGLE_SHOW_DIALOG_RELEASE_CONTENT'
        });

    return (
        <>
            {releaseToShow &&
                <ReleaseContentDialog open={showDialogReleaseContent}
                                      handleClose={handleClose}
                                      release={releaseToShow}
                />}
        </>
    );
};

// ReleaseContent.propTypes = {
//     release: PropTypes.object.isRequired
// };

export default ReleaseContent;
