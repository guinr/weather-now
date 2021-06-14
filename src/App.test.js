import { act, render, screen } from '@testing-library/react';
import App from './App';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

test('renders App', async () => {
  const mock = new MockAdapter(axios);

  await act(async () => {
    const axiosResponse = {
      temp: 298,
      humidity: 74,
      pressure: 1023
    };

    await mock
      .onAny()
      .reply(200, { main: axiosResponse });

    render(<App />);
  });
  
  
  expect(screen.getByText('Nuuk, GL')).toBeInTheDocument();
  expect(screen.getByText('Urubici, BR')).toBeInTheDocument();
  expect(screen.getByText('Nairobi, KE')).toBeInTheDocument();
});
