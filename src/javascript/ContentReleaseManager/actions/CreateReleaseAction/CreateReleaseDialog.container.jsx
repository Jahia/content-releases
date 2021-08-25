import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useApolloClient, useMutation} from '@apollo/react-hooks';
import {StoreContext} from '../../contexts';
import {triggerRefetch} from '../refetch';
import {CreateReleaseMutation} from './CreateRelease.gql-mutations';
import CreateReleaseDialog from './CreateReleaseDialog';

const CreateReleaseDialogContainer = ({path, contentType}) => {
    const {state, dispatch} = React.useContext(StoreContext);
    const {
        showDialogCreateRelease,
        releases,
        refetchers
    } = state;

    const [name, updateName] = useState('');
    const [isNameValid, updateIsNameValid] = useState(true);
    const [isNameAvailable, updateIsNameAvailable] = useState(true);

    const invalidRegex = /[\\/:*?"<>|]/g;
    const gqlParams = {
        mutation: {
            parentPath: path,
            primaryNodeType: contentType
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
            case: 'TOGGLE_SHOW_DIALOG_CREATE'
        });

    const handleCreate = mutation => {
        // Do mutation to create release.
        gqlParams.mutation.releaseName = name;
        gqlParams.mutation.jcrReleaseName = name.toLowerCase().replace(/\s/g, '-').substr(0, 31);
        mutation({variables: gqlParams.mutation});

        dispatch({
            case: 'TOGGLE_SHOW_DIALOG_CREATE'
        });
    };

    const client = useApolloClient();
    const [mutation] = useMutation(CreateReleaseMutation, {
        onCompleted: () => {
            client.cache.flushNodeEntryByPath(path);
            triggerRefetch(refetchers, 'GET_RELEASES');
        }
    });

    return (
        <CreateReleaseDialog open={showDialogCreateRelease}
                             name={name}
                             isNameValid={isNameValid}
                             isNameAvailable={isNameAvailable}
                             handleCancel={handleCancel}
                             handleCreate={() => handleCreate(mutation)}
                             onChangeName={onChangeName}/>
    );
};

CreateReleaseDialogContainer.propTypes = {
    path: PropTypes.string.isRequired,
    contentType: PropTypes.string.isRequired
};

export default CreateReleaseDialogContainer;
