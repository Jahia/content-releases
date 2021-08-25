import PropTypes from 'prop-types';
import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    withStyles
} from '@material-ui/core';
import {Button} from '@jahia/moonstone';
import {compose} from '../../../utils';
import {withTranslation} from 'react-i18next';
import HelpContent from './HelpContent';

let styles = theme => ({
    root: {
        minWidth: '600px'
    },
    error: {
        color: theme.palette.error.main
    }
});

const HelpDialog = ({classes, t, open, handleClose}) => {
    return (
        <Dialog open={open}
                classes={{paper: classes.root}}
                onClose={handleClose}
        >
            <DialogContent>
                <HelpContent/>
            </DialogContent>
            <DialogActions>
                <Button
                    size="big"
                    data-cm-role="help-as-close"
                    label={t('content-releases:label.layout.dialog.help.close')}
                    onClick={handleClose}
                />
            </DialogActions>
        </Dialog>
    );
};

HelpDialog.propTypes = {
    t: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.func.isRequired
};

export default compose(
    withTranslation(),
    withStyles(styles)
)(HelpDialog);
