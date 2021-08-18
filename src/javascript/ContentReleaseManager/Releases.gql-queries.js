import {gql} from 'apollo-boost';
// Import {PredefinedFragments} from '@jahia/data-helper';

export const GET_RELEASES = gql`
    query getReleaseFolder($workspace: Workspace!, $path: String!,$language: String!) {
        response: jcr(workspace: $workspace) {
            releases: nodeByPath(path: $path) {
                id: uuid
                children{
                    nodes {
                        id: uuid
                        path
                        type: primaryNodeType{
                            value:name
                        }
                        name: property(name:"name"){
                            value
                        }
                        items:references{
                            nodes{
                                node{
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
                        }
                    }
                }
            }
        }
    }
`;
//    ${PredefinedFragments.nodeCacheRequiredFields.gql}
// ${propsFragment}

