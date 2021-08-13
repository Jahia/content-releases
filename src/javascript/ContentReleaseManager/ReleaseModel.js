import get from 'lodash.get';

const ReleaseMapper = releaseData => ({
    // NOTE be sure string value like "false" or "true" are boolean I use JSON.parse to cast
    id: get(releaseData, 'id'),
    type: get(releaseData, 'type.value'),
    name: get(releaseData, 'name.value'),
    items: ['toto', 'titi'],
    actions: '...'
});
export default ReleaseMapper;
