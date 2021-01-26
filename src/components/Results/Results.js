import React from 'react';
import { connect } from 'react-redux';
import download from '../../utils/download';
import './Results.css';

function Results(props) {
  const handleResultClick = async (event) => {
    const resultId = event.target.id;
    const downloadStatus = await download(resultId);
    props.dispatch({ type: 'UPDATE_DOWNLOADSTATUS', resultId, downloadStatus });
  }

  const modes = {
    idle: null,
    loading: <p role='status'>Hold on...</p>,
    succeeded: (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          {props.results.map(result => (
            <tr key={ result.id }>
              <td><span className={`dl-link ${ result.downloadStatus }`} id={ result.id } onClick={ handleResultClick }>{ result.title }</span></td>
              <td>{ result.size }MB</td>
            </tr>
          ))}
        </tbody>
      </table>
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
