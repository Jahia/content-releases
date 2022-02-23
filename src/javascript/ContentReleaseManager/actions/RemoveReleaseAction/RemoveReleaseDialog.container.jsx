import React from 'react';
import {RemoveReleaseMutation} from './RemoveRelease.gql-mutations';
import {useApolloClient, useMutation} from '@apollo/react-hooks';
import {StoreContext} from '../../contexts';
import {triggerRefetch} from '../../actions/refetch';
import RemoveReleaseDialog from './RemoveReleaseDialog';

const RemoveReleaseDialogContainer = () => {
    const {state, dispatch} = React.useContext(StoreContext);
    const {
        showDialogRemoveRelease,
        releaseToRemove,
        refetchers
    } = state;

    const handleCancel = () =>
        dispatch({
            case: 'TOGGLE_SHOW_DIALOG_REMOVE',
            payload: {
                release: null
            }
        });

    const handleRemove = mutation => {
        mutation({
            variables: {
                uuid: releaseToRemove.id,
                query: `SELECT * FROM [releasemix:releaseItem] where releases = '${releaseToRemove.id}'`
            }
        });

        dispatch({
            case: 'TOGGLE_SHOW_DIALOG_REMOVE',
            payload: {
                release: null
            }
        });
    };

    const client = useApolloClient();
    const [mutation] = useMutation(RemoveReleaseMutation, {
        onCompleted: () => {
            client.cache.flushNodeEntryById(releaseToRemove.id);
            triggerRefetch(refetchers, 'GET_RELEASES');
        }
    });
    return (
        <RemoveReleaseDialog open={showDialogRemoveRelease}
                             name={releaseToRemove.name}
                             handleCancel={handleCancel}
                             handleRemove={() => handleRemove(mutation)}/>
    );
};

export default RemoveReleaseDialogContainer;
