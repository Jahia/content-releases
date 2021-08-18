import {gql} from 'apollo-boost';

const DeleteReleaseMutation = gql`
    mutation DeleteReleaseMutation(
        $uuid: String!
    ) {
        jcr {
            done: deleteNode(pathOrId:$uuid)
        }
    }
`;

export {DeleteReleaseMutation};
