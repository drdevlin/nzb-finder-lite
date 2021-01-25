import { fakeResponse } from './fake-response';

const fakeFetch = async () => {
  return {
    ok: true,
    json: async () => {
      return fakeResponse;
    }
  };
};

const fetchResults = async (url) => {
  let data;
  try {
    const response = await fakeFetch(url);
    data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}

export default fetchResults;