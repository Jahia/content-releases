import React from 'react';
import HelpDialog from './HelpDialog';
import {StoreContext} from '../../../contexts';

const HelpDialogContainer = () => {
    const {state, dispatch} = React.useContext(StoreContext);
    const {
        showDialogHelp
    } = state;

    const handleClose = () =>
        dispatch({
            case: 'TOGGLE_SHOW_DIALOG_HELP'
        });

    return (
        <HelpDialog open={showDialogHelp}
                    handleClose={handleClose}/>
    );
};

export default HelpDialogContainer;
