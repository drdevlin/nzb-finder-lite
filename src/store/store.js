import { createStore } from 'redux';

const initialState = {
  submission: null,
  results: [],
  fetchStatus: 'idle',
  error: null
};

const reducer = (state, action) => {
  if (action.type === 'UPDATE_SUBMISSION') {
    return {
      ...state,
      submission: action.submission,
      fetchStatus: 'submission'
    }
  } else {
    return state;
  }
};

const store = createStore(reducer, initialState);

export default store;
