import React from 'react';
// Import {gql} from 'apollo-boost';
import {RemoveReleaseMutation} from './RemoveRelease.gql-mutations';
// Import PropTypes from 'prop-types';
// Import {triggerRefetchAll} from '../../../JContent.refetches';
import {useApolloClient, useMutation} from '@apollo/react-hooks';
import {StoreContext} from '../../contexts';
// Import get from 'lodash.get';
import {triggerRefetch} from '../../actions/refetch';
import RemoveReleaseDialog from './RemoveReleaseDialog';

// Const getDeleteRefQueryMutation = ({uuid}) => `
//     updateRef_${uuid}: mutateNode(pathOrId: ${uuid}) {
//         mutateProperty(name: "release") {
//             delete(language: ${window.contextJsParameters.lang})
//         }
//     }`;
//
// const getUpadteRefQueryMutation = ({uuid, values}) => `
//     updateRef_${uuid}: mutateNode(pathOrId: ${uuid}) {
//         mutateProperty(name: "release") {
//             setValues (
//                 language:${window.contextJsParameters.lang},
//                 type:"WEAKREFERENCE",
//                 values:${values})
//             )
//         }
//     }`;
//
// const getRmoveReleaseQueryMutation = ({uuid}) =>
//     'deleteRelease: deleteNode(pathOrId:$uuid)';

const RemoveReleaseDialogContainer = () => {
    const {state, dispatch} = React.useContext(StoreContext);
    const {
        showDialogRemoveRelease,
        releaseToRemove,
        refetchers
    } = state;

    // Const getQuery = () => {
    //     let query = `
    //     mutation RemoveRelease() {
    //         jcr {
    //     `;
    //
    //     releaseToRemove.items.forEach(item => {
    //         if (item.releases.length > 1) {
    //             query += getUpadteRefQueryMutation({
    //                 uuid: item.id,
    //                 values: item.releases.filter(id => id !== releaseToRemove.id)
    //             });
    //         } else {
    //             query += getDeleteRefQueryMutation({
    //                 uuid: item.id
    //             });
    //         }
    //     });
    //     query += `
    //             ${getRmoveReleaseQueryMutation({uuid: releaseToRemove.id})}
    //         }
    //     }
    //     `;
    //     console.log('getQuery query => ', query);
    //     return gql`${query}`;
    // };

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
                query: `SELECT * FROM [jmix:releaseItem] where releases = '${releaseToRemove.id}'`
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
        // Update(cache, result) {
        //     console.log('EditReferenceMutation update result :', result);
        //
        //     dispatch({
        //         case: 'UPDATE_RELEASE_REFERENCE',
        //         payload: {
        //             uuid: releaseToRemove.id
        //         }
        //     });
        // }
    });

    // UseEffect(() => {
    //     if (data && data.jcr && data.jcr.nodeByPath) {
    //         updateChildNodes(data.jcr.nodeByPath.children.nodes);
    //     }
    // }, [data, updateChildNodes]);
    return (
        <RemoveReleaseDialog open={showDialogRemoveRelease}
                             name={releaseToRemove.name}
                             handleCancel={handleCancel}
                             handleRemove={() => handleRemove(mutation)}/>
    );
};

// RemoveReleaseDialogContainer.propTypes = {
//     path: PropTypes.string.isRequired,
//     contentType: PropTypes.string.isRequired
//     // OnExit: PropTypes.func.isRequired
// };

export default RemoveReleaseDialogContainer;
