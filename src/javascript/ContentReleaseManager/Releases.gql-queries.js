import {gql} from 'apollo-boost';
import {PredefinedFragments} from '@jahia/data-helper';

export const GET_RELEASES = gql`
    query getReleaseFolder($workspace: Workspace!, $path: String!,$language: String!) {
        response: jcr(workspace: $workspace) {
            releases: nodeByPath(path: $path) {
                id: uuid
                ...NodeCacheRequiredFields
                children{
                    nodes {
                        id: uuid
                        ...NodeCacheRequiredFields
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
                                    ...NodeCacheRequiredFields
                                    path
                                    type: primaryNodeType{
                                        value:name
                                    }
                                    name:displayName(language: $language)
                                    releases: property(name:"releases"){
                                        release : refNodes{
                                            id:uuid
                                            ...NodeCacheRequiredFields
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
    ${PredefinedFragments.nodeCacheRequiredFields.gql}
`;
// ${propsFragment}
