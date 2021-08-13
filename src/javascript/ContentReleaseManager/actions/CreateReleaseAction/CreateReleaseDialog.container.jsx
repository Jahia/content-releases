import React, {useState} from 'react';
// Import {CreateFolderQuery} from './CreateReleaseDialog.gql-queries';
import {CreateReleaseMutation} from './CreateRelease.gql-mutations';
import PropTypes from 'prop-types';
import CreateReleaseDialog from './CreateReleaseDialog';
// Import {triggerRefetchAll} from '../../../JContent.refetches';
import {useApolloClient, useMutation} from '@apollo/react-hooks';
import {StoreContext} from '../../contexts';
import get from 'lodash.get';

const CreateReleaseDialogContainer = ({path, contentType}) => {
    const {state, dispatch} = React.useContext(StoreContext);
    const {
        showDialogCreateRelease,
        releases
    } = state;

    // Const [open, updateIsDialogOpen] = useState(true);
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
        // Do mutation to create folder.
        gqlParams.mutation.releaseName = name;
        gqlParams.mutation.jcrReleaseName = name.toLowerCase().replace(/\s/g, '-').substr(0, 31);
        mutation({variables: gqlParams.mutation});
        // TODO voir ce que la mutation retourne, update de la liste des release?
        dispatch({
            case: 'TOGGLE_SHOW_DIALOG_CREATE'
        });
        // UpdateIsDialogOpen(false);
        // onExit();
    };

    const client = useApolloClient();
    // Const {loading, data} = useQuery(CreateFolderQuery, {variables: gqlParams.query, fetchPolicy: 'network-only'});
    const [mutation] = useMutation(CreateReleaseMutation, {
        onCompleted: () => {
            client.cache.flushNodeEntryByPath(path);
            // TriggerRefetchAll();
        },
        update(cache, result) {
            console.log('mutation update result :', result);

            dispatch({
                case: 'ADD_NEW_RELEASE',
                payload: {
                    releaseData: get(result, 'data.jcr.create.release', {})
                }
            });
        }
    });

    // UseEffect(() => {
    //     if (data && data.jcr && data.jcr.nodeByPath) {
    //         updateChildNodes(data.jcr.nodeByPath.children.nodes);
    //     }
    // }, [data, updateChildNodes]);
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
    // OnExit: PropTypes.func.isRequired
};

export default CreateReleaseDialogContainer;
