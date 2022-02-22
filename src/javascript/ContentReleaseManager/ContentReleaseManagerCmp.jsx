import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core';
import classnames from 'clsx';
import get from 'lodash.get';
import {StoreContext} from './contexts';
import {useQuery} from '@apollo/react-hooks';
import {GET_RELEASES} from './Releases.gql-queries';
import CreateReleaseDialogContainer from './actions/CreateReleaseAction/CreateReleaseDialog.container';
import EditReleaseDialogContainer from './actions/EditReleaseAction/EditReleaseDialog.container';
import RemoveReleaseDialogContainer from './actions/RemoveReleaseAction/RemoveReleaseDialog.container';
import Header from './components/Header';
import Content from './components/Content';
import Help from './components/Content/Help';
// Import ReleaseContent from './components/Content/ReleaseContent';

const styles = () => ({
    root: {
        flex: '1 1 0',
        width: '100%',
        minHeight: 0,
        backgroundColor: 'var(--color-gray_light)'
    }
});
const contentType = 'releasent:release';
const ContentReleaseManagerCmp = props => {
    const {classes} = props;
    const {state, dispatch} = React.useContext(StoreContext);

    const {
        releaseToUpdate,
        releaseToRemove
    } = state;

    const gqlParams = {
        workspace: 'EDIT',
        path: `/sites/${window.contextJsParameters.siteKey}/releases-manager/releases`,
        language: window.contextJsParameters.lang
    };
    const {loading, error, data, refetch} = useQuery(GET_RELEASES, {
        variables: gqlParams,
        fetchPolicy: 'network-only'
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
            dispatch({
                case: 'ADD_REFETCHER',
                payload: {
                    key: 'GET_RELEASES',
                    refetch,
                    queryParams: {variables: gqlParams}
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

    // Note : I tried <ContentLayout/> from moonstone alpha but the layout was not convenient
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
            {releaseToUpdate &&
                <EditReleaseDialogContainer/>}
            {releaseToRemove &&
                <RemoveReleaseDialogContainer/>}
            <Help display="dialog"/>
            {/* <ReleaseContent/> */}
        </main>

    );
};

ContentReleaseManagerCmp.propTypes = {
    classes: PropTypes.object.isRequired
};

ContentReleaseManagerCmp.displayName = 'ContentReleaseManager';
export default withStyles(styles)(ContentReleaseManagerCmp);
