import {gql} from 'apollo-boost';

const EditReleaseMutation = gql`
    mutation EditReleaseProperties(
        $uuid:String!,
        $jcrReleaseName: String!,
        $releaseName: String!,
    ) {
        jcr {
            update: mutateNode(pathOrId: $uuid) {
                rename(name: $jcrReleaseName)
                mutateProperty(name: "name") {
                    setValue(value:$releaseName)
                }
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

export {EditReleaseMutation};
