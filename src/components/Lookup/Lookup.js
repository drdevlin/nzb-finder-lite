import React, { useState } from 'react';
import { connect } from 'react-redux';
import fetchResults from '../../utils/fetchResults';
import './Lookup.css';

function Lookup({ dispatch, fetchStatus }) {
  const [ search, setSearch ] = useState('');

  const handleTextInput = event => setSearch(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (fetchStatus !== 'loading') {
      try {
        dispatch({ type: 'UPDATE_FETCHSTATUS', fetchStatus: 'loading' });
        const results = await fetchResults('url');
        dispatch({ type: 'UPDATE_RESULTS', results });
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
        <button type='submit'>Gimme</button>
      </form>
    </section>
  );
}

const mapState = state => {
  return { fetchStatus: state.fetchStatus };
}
export default connect(mapState)(Lookup);
