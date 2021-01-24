import { createStore } from 'redux';

const initialState = {
  results: [],
  fetchStatus: 'idle',
  error: null
};

const reducer = (state, action) => {
  return state;
};

const store = createStore(reducer, initialState);

export default store;
