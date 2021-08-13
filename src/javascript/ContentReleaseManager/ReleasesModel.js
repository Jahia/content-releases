import get from 'lodash.get';
import releaseMapper from './ReleaseModel';

const ReleasesMapper = releasesData => ({
    // NOTE be sure string value like "false" or "true" are boolean I use JSON.parse to cast
    id: get(releasesData, 'id'),
    releases: get(releasesData, 'children.nodes', []).map(node => releaseMapper(node))
});
export default ReleasesMapper;
