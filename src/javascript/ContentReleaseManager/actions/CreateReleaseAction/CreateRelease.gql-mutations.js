import {gql} from 'apollo-boost';

const CreateReleaseMutation = gql`
    mutation CreateReleaseMutation($parentPath: String!,$jcrReleaseName: String!, $releaseName: String!, $primaryNodeType: String!) {
        jcr {
            create: addNode(
                parentPathOrId: $parentPath,
                name: $jcrReleaseName,
                primaryNodeType: $primaryNodeType
                properties:[{
                    name:"name",
                    value:$releaseName
                }]
            ) {
                release: node {
                    id: uuid
                    type: primaryNodeType{
                        value:name
                    }
                    name: property(name:"name"){
                        value
                    }
                }
            }
        }
    }
`;

export {CreateReleaseMutation};
