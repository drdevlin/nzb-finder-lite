import { createStore } from 'redux';

const initialState = {
  submission: null,
  results: [],
  fetchStatus: 'idle',
  error: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FETCHSTATUS':
      return { ...state, fetchStatus: action.fetchStatus };
    case 'UPDATE_RESULTS':
      return { ...state, results: action.results };
    case 'UPDATE_ERROR':
      return { ...state, error: action.error };
    case 'UPDATE_DOWNLOADSTATUS':
      const modifiedResults = state.results.map(result => {
        return (result.id === action.resultId) ? { ...result, downloadStatus: action.downloadStatus } : result;
      });
      return { ...state, results: modifiedResults };
    default:
      return state;
  }
};

const store = createStore(reducer, initialState);

export default store;
