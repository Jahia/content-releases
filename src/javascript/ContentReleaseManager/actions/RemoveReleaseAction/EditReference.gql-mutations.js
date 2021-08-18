import {gql} from 'apollo-boost';

const EditReferenceMutation = gql`
    mutation EditReleaseProperties(
        $uuid:String!,
        $query:String!,
        $language:String!
    ) {
        jcr {
            updateReferences: mutateNodesByQuery(
                query: $query
                queryLanguage: SQL2
            ){
                mutateProperty(name: "releases") {
                    removeValue(value: $uuid,type:WEAKREFERENCE)
                }
                release: node {
                    id: uuid
                    path
                    type: primaryNodeType{
                        value:name
                    }
                    name:displayName(language: $language)
                    releases: property(name:"releases"){
                        release : refNodes{
                            id:uuid
                        }
                    }
                }
            }
            delete: deleteNode(pathOrId:$uuid)
        }
    }
`;

export {EditReferenceMutation};
