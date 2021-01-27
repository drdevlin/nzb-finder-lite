import { nzbKey } from './secrets';

// Query config
const proxy = 'http://localhost:4444?url=';
export const endpoint = 'https://nzbfinder.ws/api/v1/api';
const tvSearch = 't=tvsearch';
const movieSearch = 't=movie';
const queryParameter = 'q=';
const asJson = 'o=json';
const apiKeyParameter = 'apikey=';

const buildQuery = (searchInput, category) => {
  if (searchInput) {
    const type = (category === 'tv') ? tvSearch : movieSearch;
    return encodeURI(`${proxy}${endpoint}&${type}&${queryParameter}${searchInput}&${asJson}&${apiKeyParameter}${nzbKey}`);
  }
}

export default buildQuery;
