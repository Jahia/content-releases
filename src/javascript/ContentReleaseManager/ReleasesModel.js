import get from 'lodash.get';

const ReleasesMapper = releasesData => ({
    // NOTE be sure string value like "false" or "true" are boolean I use JSON.parse to cast
    id: get(releasesData, 'id'),
    releases: get(releasesData, 'children.nodes', []).map(node => {
        return {
            id: get(node, 'id'),
            type: get(node, 'type.value'),
            name: get(node, 'name.value')
        };
    })
});
export default ReleasesMapper;
