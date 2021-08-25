import {gql} from 'apollo-boost';

export const GET_RELEASE_HELP = gql`
    query getReleaseHelpContent($workspace: Workspace!, $path: String!, $language: String!) {
        response: jcr(workspace: $workspace) {
            help: nodeByPath(path: $path) {
                id: uuid
                content: property(language:$language, name:"text"){
                    value
                }
            }
        }
    }
`;

