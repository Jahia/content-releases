import get from 'lodash.get';

const getItems = nodes => nodes.map(_node_ => {
    const node = _node_.node;
    return {
        ...node,
        type: get(node, 'type.value'),
        releases: get(node, 'releases.release', []).map(release => release.id)
    };
});

const ReleaseMapper = releaseData => {
    // NOTE be sure string value like "false" or "true" are boolean I use JSON.parse to cast
    return {
        id: get(releaseData, 'id'),
        path: get(releaseData, 'path'),
        type: get(releaseData, 'type.value'),
        name: get(releaseData, 'name.value'),
        items: getItems(get(releaseData, 'items.nodes', [])),
        actions: ''// Is it needed ?
    };
};

export default ReleaseMapper;
