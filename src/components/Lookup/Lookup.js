import React, { useState } from 'react';
import { connect } from 'react-redux';
import './Lookup.css';

function Lookup({ dispatch }) {
  const [ search, setSearch ] = useState('');

  const handleTextInput = event => setSearch(event.target.value);
  const handleSubmit = event => {
    event.preventDefault();
    dispatch({ type: 'UPDATE_SUBMISSION', submission: search });
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

export default connect()(Lookup);
