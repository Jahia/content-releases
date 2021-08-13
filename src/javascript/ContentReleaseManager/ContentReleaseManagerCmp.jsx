import React from 'react';
// Import {ContentLayout} from '@jahia/moonstone-alpha';
import Header from './components/Header';
import Content from './components/Content';
import {withStyles} from '@material-ui/core';
import PropTypes from 'prop-types';
import classnames from 'clsx';
import get from 'lodash.get';
import {StoreContext} from './contexts';
import {useQuery} from '@apollo/react-hooks';
import {GET_RELEASES} from './Releases.gql-queries';
import CreateReleaseDialogContainer from './actions/CreateReleaseAction/CreateReleaseDialog.container';
import Help from './components/Content/Help';

const styles = () => ({
    root: {
        flex: '1 1 0',
        width: '100%',
        minHeight: 0,
        backgroundColor: 'var(--color-gray_light)'
    }
});
const contentType = 'jnt:release';
const ContentReleaseManagerCmp = props => {
    console.log('ContentReleaseManagerCmp props:', props);
    const {classes} = props;
    const {dispatch} = React.useContext(StoreContext);

    const gqlParams = {
        workspace: 'EDIT',
        path: `/sites/${window.contextJsParameters.siteKey}/releases-manager/releases`
    };
    const {loading, error, data} = useQuery(GET_RELEASES, {
        variables: gqlParams
    });

    React.useEffect(() => {
        console.debug('App RELEASE MANAGER init !');
        if (loading === false && data) {
            console.debug('App RELEASE MANAGER init Set Data!');

            const releasesData = get(data, 'response.releases', {});

            dispatch({
                case: 'DATA_READY',
                payload: {
                    releasesData
                }
            });
        }
    }, [loading, data, dispatch]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error :(</p>;
    }

    return (
        <main className={classnames(
            classes.root,
            'flexCol'
        )}
        >
            <Header/>
            <Content/>
            <CreateReleaseDialogContainer
                path={gqlParams.path}
                contentType={contentType}
            />
            <Help display="dialog"/>
        </main>

    );

    // Return (
    //     <ContentLayout
    //         header={<Header title={t('label.settings.title')}/>}
    //         content={<div style={{padding: 'var(--spacing-medium)'}}>Super cool ce truc</div>}/>
    // );
};

ContentReleaseManagerCmp.propTypes = {
    classes: PropTypes.object.isRequired
};

ContentReleaseManagerCmp.displayName = 'ContentReleaseManager';
export default withStyles(styles)(ContentReleaseManagerCmp);
