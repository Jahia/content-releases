import React from 'react';
import ContentReleaseManagerCmp from './ContentReleaseManagerCmp';
import {Store} from './store';

const App = () => {
    return (
        <Store>
            <ContentReleaseManagerCmp/>
        </Store>
    );
};

export default App;
