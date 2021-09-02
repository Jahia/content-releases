import {gql} from 'apollo-boost';
// Import {PredefinedFragments} from '@jahia/data-helper';

export const GET_RELEASES_ACCESS = gql`
    query getSiteNodeHasPermission($workspace: Workspace!, $id: String!, $permissionName:String!) {
        response: jcr(workspace: $workspace) {
            siteNode: nodeById(uuid: $id) {
                uuid
                name
                hasPermission(permissionName:$permissionName)
            }

        }
    }
`;
//    ${PredefinedFragments.nodeCacheRequiredFields.gql}
// ${propsFragment}

