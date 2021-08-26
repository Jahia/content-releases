import PropTypes from 'prop-types';
import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    withStyles
} from '@material-ui/core';
import {Button} from '@jahia/moonstone';
import {Typography} from '@material-ui/core';
import {compose} from '../../utils';
import {withTranslation} from 'react-i18next';
import DOMPurify from 'dompurify';

let styles = () => ({
    root: {
        minWidth: '600px'
    },
    typography: {
        '& p': {
            color: 'var(--color-gray_dark)'
            // FontSize: "0.875rem"
        }
    },
    small: {
        fontSize: '0.75rem'
    }
});

const RemoveReleaseDialog = ({classes, t, open, name, handleCancel, handleRemove}) => {
    const content = DOMPurify.sanitize(
        t('content-releases:label.layout.dialog.removeReleaseAction.text'), {ADD_ATTR: ['target']}
    );
    return (
        <Dialog open={open}
                aria-labelledby="form-dialog-title"
                classes={{paper: classes.root}}
                onClose={handleCancel}
        >
            <DialogTitle id="form-dialog-title">{t('content-releases:label.layout.dialog.removeReleaseAction.title')}
                <span className={classes.small}>&nbsp;[{name}]</span>
            </DialogTitle>
            <DialogContent>
                <Typography component="div"
                            className={classes.typography}
                            dangerouslySetInnerHTML={{__html: content}}/>
            </DialogContent>
            <DialogActions>
                <Button
                    size="big"
                    data-cm-role="create-release-as-cancel"
                    label={t('content-releases:label.layout.dialog.removeReleaseAction.cancel')}
                    onClick={handleCancel}/>
                <Button
                    color="danger"
                    size="big"
                    data-cm-role="create-release-as-confirm"
                    label={t('content-releases:label.layout.dialog.removeReleaseAction.ok')}
                    onClick={handleRemove}/>
            </DialogActions>
        </Dialog>
    );
};

RemoveReleaseDialog.propTypes = {
    t: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
    open: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default compose(
    withTranslation(),
    withStyles(styles)
)(RemoveReleaseDialog);
