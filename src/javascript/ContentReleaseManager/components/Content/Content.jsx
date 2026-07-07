import React from 'react';
import {StoreContext} from '../../contexts';
import Table from './Table';
import Help from './Help';
import clsx from 'clsx';
import {LayoutContent, Paper} from '@jahia/moonstone';
import styles from './content.module.scss';
import PropTypes from 'prop-types';

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
        <LayoutContent className={clsx(classes)}>
            <Paper hasPadding={false} className={clsx('flexCol_nowrap flexFluid', styles.paper)}>
                {getDisplay()}
            </Paper>
        </LayoutContent>
    );
};

ContentCmp.displayName = 'Content';
ContentCmp.propTypes = {
    classes: PropTypes.object
};

export default ContentCmp;
