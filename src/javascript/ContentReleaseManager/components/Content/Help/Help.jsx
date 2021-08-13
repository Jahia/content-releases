import React from 'react';
import PropTypes from 'prop-types';
import HelpContent from './HelpContent';
import HelpDialogContainer from './HelpDialog.container';

const Help = props => {
    const {display} = props;

    const getDisplay = () => {
        if (display === 'default') {
            return <HelpContent/>;
        }

        if (display === 'dialog') {
            return <HelpDialogContainer/>;
        }
    };

    return (
        getDisplay()
    );
};

Help.propTypes = {
    display: PropTypes.string.isRequired
};

export default Help;
