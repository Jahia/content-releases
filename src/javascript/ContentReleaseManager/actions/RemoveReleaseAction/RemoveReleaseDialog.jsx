import PropTypes from 'prop-types';
import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    // DialogContentText,
    DialogTitle,
    withStyles
} from '@material-ui/core';
import {Button} from '@jahia/moonstone';
import {Typography} from '@material-ui/core';
import {compose} from '../../utils';
import {withTranslation} from 'react-i18next';
import DOMPurify from 'dompurify';

let styles = theme => ({
    root: {
        minWidth: '600px'
    },
    error: {
        color: theme.palette.error.main
    }
});

const RemoveReleaseDialog = ({classes, t, open, name, handleCancel, handleRemove}) => {
    let content = `
        <p>Remove a content release will only remove it from the list.</p>
        <p>Content associated to this release will not be deleted.
        However, their last modification date and publication status will be updated</p>`;
    content = DOMPurify.sanitize(content, {ADD_ATTR: ['target']});
    console.log('RemoveReleaseDialog content: ', content);

    return (
        <Dialog open={open}
                aria-labelledby="form-dialog-title"
                classes={{paper: classes.root}}
                onClose={handleCancel}
        >
            <DialogTitle id="form-dialog-title">{t('content-releases:label.layout.dialog.removeReleaseAction.title') + ': ' + name}</DialogTitle>
            <DialogContent>
                {/* <DialogContentText/> */}

                <Typography component="div"
                            dangerouslySetInnerHTML={{__html: content}}/>

            </DialogContent>
            <DialogActions>
                <Button
                    size="big"
                    data-cm-role="create-release-as-cancel"
                    label={t('content-releases:label.layout.dialog.removeReleaseAction.cancel')}
                    onClick={handleCancel}
                />
                <Button
                    color="danger"
                    size="big"
                    data-cm-role="create-release-as-confirm"
                    label={t('content-releases:label.layout.dialog.removeReleaseAction.ok')}
                    onClick={handleRemove}
                />
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
