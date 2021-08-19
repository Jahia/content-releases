import PropTypes from 'prop-types';
import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    withStyles
} from '@material-ui/core';
import {Button} from '@jahia/moonstone';
import {compose} from '../../utils';
import {withTranslation} from 'react-i18next';

let styles = theme => ({
    root: {
        minWidth: '600px'
    },
    error: {
        color: theme.palette.error.main
    }
});

const CreateReleaseDialog = ({classes, t, open, name, isNameValid, isNameAvailable, handleCancel, handleCreate, onChangeName}) => {
    return (
        <Dialog open={open}
                aria-labelledby="form-dialog-title"
                classes={{paper: classes.root}}
                onClose={handleCancel}
        >
            <DialogTitle id="form-dialog-title">{t('content-releases:label.layout.dialog.createReleaseAction.title')}</DialogTitle>
            <DialogContent>
                <DialogContentText className={!isNameValid || !isNameAvailable ? classes.error : null}>
                    {t('content-releases:label.layout.dialog.createReleaseAction.text')}
                </DialogContentText>
                <TextField
                    fullWidth
                    autoFocus
                    error={!isNameValid || !isNameAvailable}
                    value={name}
                    // Label={t('content-releases:label.layout.dialog.createReleaseAction.fieldName')}
                    id="release-name"
                    aria-describedby="release-name-error-text"
                    margin="dense"
                    helperText={isNameAvailable ? '' : t('content-releases:label.layout.dialog.createReleaseAction.exists')}
                    onChange={onChangeName}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    size="big"
                    data-cm-role="create-release-as-cancel"
                    label={t('content-releases:label.layout.dialog.createReleaseAction.cancel')}
                    onClick={handleCancel}
                />
                <Button
                    color="accent"
                    size="big"
                    data-cm-role="create-release-as-confirm"
                    isDisabled={!name || !isNameValid || !isNameAvailable}
                    label={t('content-releases:label.layout.dialog.createReleaseAction.ok')}
                    onClick={handleCreate}
                />
            </DialogActions>
        </Dialog>
    );
};

CreateReleaseDialog.propTypes = {
    t: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleCreate: PropTypes.func.isRequired,
    open: PropTypes.string.isRequired,
    isNameValid: PropTypes.bool.isRequired,
    isNameAvailable: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    onChangeName: PropTypes.func.isRequired
};

export default compose(
    withTranslation(),
    withStyles(styles)
)(CreateReleaseDialog);
