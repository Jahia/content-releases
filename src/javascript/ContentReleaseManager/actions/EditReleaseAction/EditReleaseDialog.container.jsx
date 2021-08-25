import React, {useState} from 'react';
import {EditReleaseMutation} from './EditRelease.gql-mutations';
// NOTE reuse the same dialog than the one to create ?
import EditReleaseDialog from './EditReleaseDialog';
import {useApolloClient, useMutation} from '@apollo/react-hooks';
import {StoreContext} from '../../contexts';
// Import get from 'lodash.get';
import {triggerRefetch} from '../../actions/refetch';

const EditReleaseDialogContainer = () => {
    const {state, dispatch} = React.useContext(StoreContext);
    const {
        showDialogEditRelease,
        releaseToUpdate,
        releases,
        refetchers
    } = state;

    const [name, updateName] = useState(releaseToUpdate.name);
    const [isNameValid, updateIsNameValid] = useState(true);
    const [isNameAvailable, updateIsNameAvailable] = useState(true);

    const invalidRegex = /[\\/:*?"<>|]/g;
    const gqlParams = {
        mutation: {
            uuid: releaseToUpdate.id
        }
    };

    const onChangeName = e => {
        // Handle validation for name change
        updateIsNameValid(e.target.value && e.target.value.match(invalidRegex) === null);
        updateIsNameAvailable(releases.find(release => release.name === e.target.value) === undefined);
        updateName(e.target.value);
    };

    const handleCancel = () =>
        dispatch({
            case: 'TOGGLE_SHOW_DIALOG_EDIT',
            payload: {
                release: null
            }
        });

    const handleUpdate = mutation => {
        // Do mutation to update release.
        gqlParams.mutation.releaseName = name;
        gqlParams.mutation.jcrReleaseName = name.toLowerCase().replace(/\s/g, '-').substr(0, 31);
        mutation({variables: gqlParams.mutation});

        dispatch({
            case: 'TOGGLE_SHOW_DIALOG_EDIT',
            payload: {
                release: null
            }
        });
    };

    const client = useApolloClient();
    const [mutation] = useMutation(EditReleaseMutation, {
        onCompleted: () => {
            client.cache.flushNodeEntryById(releaseToUpdate.id);
            triggerRefetch(refetchers, 'GET_RELEASES');
        }
    });

    return (
        <EditReleaseDialog open={showDialogEditRelease}
                           name={name}
                           currentName={releaseToUpdate.name}
                           isNameValid={isNameValid}
                           isNameAvailable={isNameAvailable}
                           handleCancel={handleCancel}
                           handleUpdate={() => handleUpdate(mutation)}
                           onChangeName={onChangeName}/>
    );
};

export default EditReleaseDialogContainer;
