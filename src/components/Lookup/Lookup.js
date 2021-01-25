import React, { useState } from 'react';
import { connect } from 'react-redux';
import extractData from '../../utils/extractData';
import fetchResults from '../../utils/fetchResults';
import buildQuery from '../../utils/buildQuery';
import './Lookup.css';

function Lookup({ dispatch, fetchStatus }) {
  const [ search, setSearch ] = useState('');
  const [ category, setCategory ] = useState('tv');

  const handleTextInput = event => setSearch(event.target.value);
  const handleCategorySelect = event => setCategory(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (fetchStatus !== 'loading') {
      try {
        dispatch({ type: 'UPDATE_FETCHSTATUS', fetchStatus: 'loading' });
        const query = buildQuery(search, category);
        const results = await fetchResults(query);
        const tidyResults = extractData(results);
        dispatch({ type: 'UPDATE_RESULTS', results: tidyResults });
        dispatch({ type: 'UPDATE_FETCHSTATUS', fetchStatus: 'succeeded'});
      } catch(error) {
        dispatch({ type: 'UPDATE_ERROR', error });
        dispatch({ type: 'UPDATE_FETCHSTATUS', fetchStatus: 'failed'});
      } 
    }
  };

  return (
    <section className="Lookup" aria-label='Look up'>
      <form onSubmit={event => handleSubmit(event)}>
        <label htmlFor='search'>What we watchin?</label>
        <input id="search" name="search" value={search} onChange={handleTextInput} />
        <input type="radio" name="category" id="tv" value="tv" checked onChange={handleCategorySelect} />
        <label htmlFor="tv">TV</label>
        <input type="radio" name="category" id="movie" value="movie" onChange={handleCategorySelect} />
        <label htmlFor="movie">Movies</label>
        <button type='submit'>Gimme</button>
      </form>
    </section>
  );
}

const mapState = state => {
  return { fetchStatus: state.fetchStatus };
}
export default connect(mapState)(Lookup);
