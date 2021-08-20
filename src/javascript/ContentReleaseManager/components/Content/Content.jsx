import React from 'react';
import {StoreContext} from '../../contexts';
import Table from './Table';
import Help from './Help';
import classnames from 'clsx';
import {withStyles} from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = () => ({
    root: {
        flex: '1 1 0',
        width: '100%',
        minHeight: 0,
        // Padding: theme.spacing.unit
        padding: 'var(--spacing-medium)'
    },
    main: {
        flex: '1 1 0%',
        width: '100%',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 0,
        flexDirection: 'row',
        backgroundColor: '#ffffff'
    },
    container: {
        flex: '1 2 0%',
        order: 2,
        display: 'flex',
        minWidth: 0
        // Transition: 'margin-left .25s,margin-right .25s',
        // backgroundColor: '#eff2f4'
    }
});

const ContentCmp = ({classes}) => {
    const {state} = React.useContext(StoreContext);
    const {
        releases
    } = state;

    const getDisplay = () => {
        if (releases.length > 0) {
            return <Table/>;
        }

        return <Help display="default"/>;
    };

    return (
        <div className={classnames(
            classes.root,
            'flexCol'
        )}
        >
            <div className={classes.main}>
                <div className={classes.container}>
                    {getDisplay()}
                </div>
            </div>
        </div>
    );
};

ContentCmp.displayName = 'Content';
ContentCmp.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContentCmp);
