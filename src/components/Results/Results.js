import React from 'react';
import { connect } from 'react-redux';
import './Results.css';

function Results(props) {
  return (
    <section className="Results" aria-label='Results'>
      <p>{props.fetchStatus}</p>
    </section>
  );
}

const mapState = state => state;
export default connect(mapState)(Results);
