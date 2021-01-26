import fetchResults from './fetchResults';
import { nzbKey, sabKey } from './secrets';

const download = async (id) => {
  try {
    const name = encodeURIComponent(`https://nzbfinder.ws/api/v1/api?t=get&id=${id}&apikey=${nzbKey}`);
    const sabUrl = `http://localhost:8080/api?mode=addurl&name=${name}&apikey=${sabKey}&output=json`;
    const response = await fetchResults(sabUrl);
    return (response.status) ? 'dl-success' : 'dl-fail';
  } catch(error) {
    return 'dl-fail';
  }
}

export default download;