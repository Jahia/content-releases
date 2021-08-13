import React from 'react';
import {StoreContext} from '../../contexts';
import Table from './Table';
import Help from './Help';

const ContentCmp = () => {
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
        getDisplay()
    );
};

ContentCmp.displayName = 'Content';
export default ContentCmp;
