import {gql} from 'apollo-boost';

export const GET_RELEASE_ID = gql`
    query getReleaseFolder($workspace: Workspace!, $path: String!) {
        response: jcr(workspace: $workspace) {
            folder: nodeByPath(path: $path) {
                uuid
            }
        }
    }
`;
// ${propsFragment}

