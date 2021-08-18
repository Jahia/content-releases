import React, {useState} from 'react';
import {gql} from 'apollo-boost';
// Import {CreateFolderQuery} from './CreateReleaseDialog.gql-queries';
import {DeleteReleaseMutation} from './DeleteRelease.gql-mutations';
import {EditReferenceMutation} from './EditReference.gql-mutations';
import PropTypes from 'prop-types';
import CreateReleaseDialog from 'src/javascript/ContentReleaseManager/actions/DeleteReleaseAction/RemoveReleaseDialog';
// Import {triggerRefetchAll} from '../../../JContent.refetches';
import {useApolloClient, useMutation} from '@apollo/react-hooks';
import {StoreContext} from '../../contexts';
import get from 'lodash.get';

const getDeleteRefQueryMutation = ({uuid}) => `
    updateRef_${uuid}: mutateNode(pathOrId: ${uuid}) {
        mutateProperty(name: "release") {
            delete(language: ${window.contextJsParameters.lang})
        }
    }`

const getUpadteRefQueryMutation = ({uuid,values}) => `
    updateRef_${uuid}: mutateNode(pathOrId: ${uuid}) {
        mutateProperty(name: "release") {
            setValues (
                language:${window.contextJsParameters.lang},
                type:"WEAKREFERENCE",
                values:${values})
            )
        }
    }`

const getRmoveReleaseQueryMutation = ({uuid}) =>
    `deleteRelease: deleteNode(pathOrId:$uuid)`


const RemoveReleaseDialogContainer = ({path, contentType}) => {
    const {state, dispatch} = React.useContext(StoreContext);
    const {
        showDialogRemoveRelease,
        releaseToRemove,
        releases
    } = state;


    const invalidRegex = /[\\/:*?"<>|]/g;
    const gqlParams = {
        removeMutation:{
            uuid:releaseToRemove.id
        }
    };

    //todo voir si j'ai besoin d'un state pour gerer la query et d'un useEffect dependant de releaseToRemove
    const getQuery = () => {
        let query = `
        mutation RemoveRelease() {
            jcr {
        `;

        releaseToRemove.items.forEach(item => {
            if(item.releases.length>1){
                query += getUpadteRefQueryMutation({
                    uuid:item.id,
                    values:item.releases.filter(id => id !== releaseToRemove.id)
                })
            }else{
                query += getDeleteRefQueryMutation({
                    uuid:item.id
                })
            }
        })
        query += `
                ${getRmoveReleaseQueryMutation({uuid:releaseToRemove.id})}
            }
        }
        `;
        console.log("getQuery query => ",query);
        return gql`${query}`;
    }

    const handleCancel = () =>
        dispatch({
            case: 'TOGGLE_SHOW_DIALOG_REMOVE'
        });

    const handleRemove = mutation => {
        //#1 remove all references do an await function ?

        //#2 (update current release)
        //#3 remove release
        //after await do that
        removeMutation({variables: gqlParams.mutation});
        //#2Bis (refetch)


        dispatch({
            case: 'TOGGLE_SHOW_DIALOG_CREATE'
        });
        // UpdateIsDialogOpen(false);
        // onExit();
    };

    const client = useApolloClient();
    // Const {loading, data} = useQuery(CreateFolderQuery, {variables: gqlParams.query, fetchPolicy: 'network-only'});

    const [mutation]=useMutation(getQuery(), {
        refetchQueries: [
            {
                query: NodeQuery,
                variables: {
                    uuid: nodeData.uuid,
                    language,
                    uilang: uilang,
                    writePermission: `jcr:modifyProperties_default_${language}`,
                    childrenFilterTypes: Constants.childrenFilterTypes
                }
            }
        ],
        onCompleted: () => {
            // client.cache.flushNodeEntryById(releaseToRemove.id);
            // TriggerRefetchAll();
        },
        update(cache, result) {
            console.log('EditReferenceMutation update result :', result);

            dispatch({
                case: 'UPDATE_RELEASE_REFERENCE',
                payload: {
                    uuid: releaseToRemove.id
                }
            });
        }
    });

    const [removeMutation] = useMutation(DeleteReleaseMutation, {
        onCompleted: () => {
            client.cache.flushNodeEntryById(releaseToRemove.id);
            // TriggerRefetchAll();
        },
        update(cache, result) {
            console.log('mutation update result :', result);

            dispatch({
                case: 'DELETE_RELEASE',
                payload: {
                    uuid: releaseToRemove.id
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
                             handleRemove={() => handleRemove(mutation)}
                             onChangeName={onChangeName}/>
    );
};

RemoveReleaseDialogContainer.propTypes = {
    path: PropTypes.string.isRequired,
    contentType: PropTypes.string.isRequired
    // OnExit: PropTypes.func.isRequired
};

export default RemoveReleaseDialogContainer;
