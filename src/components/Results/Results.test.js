import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Results from './Results';

//Mock out download
// import download from '../../utils/download';
// jest.mock('../../utils/download', () => {
//   return () => 'dl-success';
// });

describe('<Results />', () => {
  it('shows nothing when idle', async () => {
    store.dispatch({ type: 'UPDATE_FETCHSTATUS', fetchStatus: 'idle'});
    await render(<Provider store={store}><Results /></Provider>);
    const text = screen.queryByText(/./g);

    expect(text).toBeNull();
  });

  it('shows loading status when loading', async () => {
    store.dispatch({ type: 'UPDATE_FETCHSTATUS', fetchStatus: 'loading'});
    await render(<Provider store={store}><Results /></Provider>);
    const text = screen.queryByText('Hold on...');

    expect(text).not.toBeNull();
  });

  it('shows results when search succeeded', async () => {
    store.dispatch({ type: 'UPDATE_RESULTS', results: [{ id: 1, title: 'FindMe' }] });
    store.dispatch({ type: 'UPDATE_FETCHSTATUS', fetchStatus: 'succeeded'});
    await render(<Provider store={store}><Results /></Provider>);
    const text = screen.queryByText('FindMe');

    expect(text).not.toBeNull();
  });

  it('shows error message when search failed', async () => {
    store.dispatch({ type: 'UPDATE_ERROR', error: 'FindMe'});
    store.dispatch({ type: 'UPDATE_FETCHSTATUS', fetchStatus: 'failed'});
    await render(<Provider store={store}><Results /></Provider>);
    const text = screen.queryByText('FindMe');

    expect(text).not.toBeNull();
  });
});
