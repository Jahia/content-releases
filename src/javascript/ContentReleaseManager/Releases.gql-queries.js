import {gql} from 'apollo-boost';
// Import {PredefinedFragments} from '@jahia/data-helper';

export const GET_RELEASES = gql`
    query getReleaseFolder($workspace: Workspace!, $path: String!) {
        response: jcr(workspace: $workspace) {
            releases: nodeByPath(path: $path) {
                id: uuid
                children{
                    nodes {
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
    }

`;
//    ${PredefinedFragments.nodeCacheRequiredFields.gql}
// ${propsFragment}

