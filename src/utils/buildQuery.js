import { nzbKey } from './secrets';

// Query config
const proxy = 'https://morning-caverns-71289.herokuapp.com?url=';
const endpoint = 'https://daringfireball.net/';
const tvSearch = 't=tvsearch';
const movieSearch = 't=movie';
const queryParameter = 'q=';
const apiKeyParameter = 'apikey=';

const buildQuery = (searchInput, category) => {
  if (searchInput) {
    const type = (category === 'tv') ? tvSearch : movieSearch;
    return encodeURI(`${proxy}${endpoint}&${type}&${queryParameter}${searchInput}&${apiKeyParameter}${nzbKey}`);
  }
}

export default buildQuery;
