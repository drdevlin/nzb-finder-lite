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
        <div className='lookup-top'>
          <label htmlFor='search'>What we watchin?</label>
        </div>
        <div className='lookup-middle'>
          <input id="search" name="search" value={search} autoFocus onChange={handleTextInput} />
          <button type='submit'>Gimme</button>
        </div>
        <div className='lookup-bottom'>
          <input type="radio" name="category" id="tv" value="tv" defaultChecked onChange={handleCategorySelect} />
          <label htmlFor="tv">TV</label>
          <input type="radio" name="category" id="movie" value="movie" onChange={handleCategorySelect} />
          <label htmlFor="movie">Movies</label>
        </div>
      </form>
    </section>
  );
}

const mapState = state => {
  return { fetchStatus: state.fetchStatus };
}
export default connect(mapState)(Lookup);
