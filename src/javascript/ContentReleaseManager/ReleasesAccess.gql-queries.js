import {gql} from 'apollo-boost';
// Import {PredefinedFragments} from '@jahia/data-helper';

export const GET_RELEASES_ACCESS = gql`
    query currentUserHasPermission($permissionName:String!){
        currentUser {
            node{
                hasPermission(permissionName:$permissionName)
            }
        }
    }
`;
//    ${PredefinedFragments.nodeCacheRequiredFields.gql}
// ${propsFragment}

