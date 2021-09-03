import {gql} from 'apollo-boost';

// Note : waiting 8.1 -> https://jira.jahia.org/browse/BACKLOG-16351
const RemoveReleaseMutation = gql`
    mutation EditReleaseProperties(
        $uuid:String!,
        $query:String!
    ) {
        jcr {
            updateReferences: mutateNodesByQuery(
                query: $query
                queryLanguage: SQL2
            ){
                mutateProperty(name:"releases") {
                    removeValue(value:$uuid,type:WEAKREFERENCE)
                }
            }
            delete: deleteNode(pathOrId:$uuid)
        }
    }
`;

export {RemoveReleaseMutation};
