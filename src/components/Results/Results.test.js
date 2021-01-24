import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Results from './Results';

describe('<Results />', () => {
  it('displays some feedback', async () => {
    await render(<Provider store={store}><Results /></Provider>);
    const text = screen.getByText(/./g);

    expect(text).toBeTruthy();
  });
});
