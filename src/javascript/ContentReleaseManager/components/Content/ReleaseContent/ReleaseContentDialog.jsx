import PropTypes from 'prop-types';
import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent, DialogTitle,
    withStyles
} from '@material-ui/core';
import {Button} from '@jahia/moonstone';
import {compose} from '../../../utils';
import {withTranslation} from 'react-i18next';
// Import ReleaseContentDisplay from './ReleaseContentDisplay';
import ReleaseContentIframe from './ReleaseContentIframe';

let styles = theme => ({
    root: {
        minWidth: '80%',
        minHeight: '80%'
        // Width: '60%'
    },
    title: {
        backgroundColor: 'var(--color-gray_light)',
        '& span': {
            fontSize: '1rem'
        }
    },
    content: {
        padding: 0
    },
    error: {
        color: theme.palette.error.main
    }
});

const ReleaseContentDialog = ({classes, t, open, handleClose, release}) => {
    return (
        <Dialog open={open}
                aria-labelledby="releaseContent-dialog-title"
                classes={{paper: classes.root}}
                onClose={handleClose}
        >
            <DialogTitle id="releaseContent-dialog-title" className={classes.title}>
                {t('content-releases:label.layout.header.title')}&nbsp;:
                <span>&nbsp;{release.name}</span>
            </DialogTitle>
            <DialogContent className={classes.content}>
                <ReleaseContentIframe releaseId={release.id}/>
            </DialogContent>
            <DialogActions>
                <Button
                    size="big"
                    data-cm-role="releaseContent-as-close"
                    label={t('content-releases:label.layout.dialog.help.close')}
                    onClick={handleClose}
                />
            </DialogActions>
        </Dialog>
    );
};

ReleaseContentDialog.propTypes = {
    t: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.func.isRequired,
    release: PropTypes.object.isRequired
};

export default compose(
    withTranslation(),
    withStyles(styles)
)(ReleaseContentDialog);
