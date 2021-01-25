import React from 'react';
import { connect } from 'react-redux';
import './Results.css';

function Results(props) {
  
  const modes = {
    idle: null,
    loading: <p role='status'>Hold on...</p>,
    succeeded: (
      <ul>
        {props.results.map(el => <li key={el.id}>{el.title}</li>)}
      </ul>
    ),
    failed: <p role='status'>{props.error}</p>
  }

  let content;
  switch (props.fetchStatus) {
    case 'idle':
      content = modes.idle;
      break;
    case 'loading':
      content = modes.loading;
      break;
    case 'succeeded':
      content = modes.succeeded;
      break;
    case 'failed':
      content = modes.failed;
      break;
    default:
      content = null;
  }

  return (
    <section className="Results" aria-label='Results'>
      {content}
    </section>
  );
}

const mapState = state => state;
export default connect(mapState)(Results);
