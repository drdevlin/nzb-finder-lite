import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import App from './App';

describe('<App />', () => {
  it('provides some feedback', async () => {
    await render(<Provider store={store}><App /></Provider>);
    const text = screen.queryAllByText(/./g).length;

    expect(text).toBeTruthy();
  });
});
