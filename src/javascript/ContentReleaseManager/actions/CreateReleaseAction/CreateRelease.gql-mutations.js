import {gql} from 'apollo-boost';

const CreateReleaseMutation = gql`
    mutation CreateReleaseMutation($parentPath: String!, $releaseName: String!, $primaryNodeType: String!) {
        jcr {
            addNode(parentPathOrId: $parentPath, name: $releaseName, primaryNodeType: $primaryNodeType) {
                node {
                    name
                    path
                    name: property(name:"name"){
                        value:name
                    }
                }
            }
        }
    }
`;

export {CreateReleaseMutation};
