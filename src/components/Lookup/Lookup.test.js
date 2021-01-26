import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Lookup from './Lookup';
import Results from '../Results/Results';

// Mock out fetch
import { fakeResponse } from '../../utils/fake-response';
global.fetch = async (url) => {
  try {
    if (url) {
      return {
        ok: true,
        json: async () => {
          return JSON.parse(fakeResponse);
        }
      };
    } else {
      throw new Error('Network Error');
    }
  } catch(error) {
    return Promise.reject(error);
  }
};


describe('<Lookup />', () => {

  it('displays form label', async () => {
    await render(<Provider store={store}><Lookup /></Provider>);
    const label = screen.queryByText('What we watchin?');

    expect(label).not.toBeNull();
  });

  it('displays error when search is empty', async () => {
    await render(<Provider store={store}><Lookup /><Results /></Provider>);
    const button = screen.getByText('Gimme');

    fireEvent.click(button);

    const results = await screen.findByText('Network Error');

    expect(results).not.toBeNull();
  });

  it('displays results when search is not empty', async () => {
    await render(<Provider store={store}><Lookup /><Results /></Provider>);
    const input = screen.getByLabelText('What we watchin?');
    const button = screen.getByText('Gimme');
    
    fireEvent.change(input, { target: { value: 'anything' } });
    fireEvent.click(button);

    const results = await screen.findByText('Law.and.Order.SVU.S22E01.Guardians.and.Gladiators.720p.AMZN.WEBRip.DDP5.1.x264');

    expect(results).not.toBeNull();
  });

});
