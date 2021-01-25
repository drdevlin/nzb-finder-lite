import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Lookup from './Lookup';
import Results from '../Results/Results';

describe('<Lookup />', () => {

  it('displays form label', async () => {
    await render(<Provider store={store}><Lookup /></Provider>);
    const label = screen.queryByText('What we watchin?');

    expect(label).not.toBeNull();
  });

  it('updates store', async () => {
    await render(<Provider store={store}><Lookup /><Results /></Provider>);
    const button = screen.getByText('Gimme');

    fireEvent.click(button);

    const results = screen.queryByText('submission');

    expect(results).not.toBeNull();
  })

});
