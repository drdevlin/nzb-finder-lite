import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Lookup from './Lookup';

describe('<Lookup />', () => {
  it('displays some feedback', async () => {
    await render(<Provider store={store}><Lookup /></Provider>);
    const text = screen.getByText(/./g);

    expect(text).toBeTruthy();
  });
});
