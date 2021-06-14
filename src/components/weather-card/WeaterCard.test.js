import { act, render, screen } from '@testing-library/react';
import WeatherCard from './WeatherCard';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import userEvent from '@testing-library/user-event';

test('renders WeatherCard', () => {
  render(<WeatherCard />);

  expect(screen.queryByRole('section')).not.toBeInTheDocument();
});

test('render city name in h3', () => {
  const city = { name: 'Nuuk', country: 'GL' };
  render(<WeatherCard city={city} />);

  const cityName = screen.getByRole('heading', { level: 3 });
  expect(cityName).toBeInTheDocument();
  expect(cityName.innerHTML).toEqual('Nuuk, GL');
});

test('render loader', () => {
  const city = { name: 'Nuuk', country: 'GL' };
  render(<WeatherCard city={city} />);

  const figure = screen.getByRole('figure');
  expect(figure).toHaveClass('loader');

  const loader = screen.getByRole('img');
  expect(loader).toHaveAttribute('src', 'loader.svg');
  expect(loader).toHaveAttribute('alt', 'Loader');
});

test('test render more info', async () => {
  const mock = new MockAdapter(axios);

  const apiKey = process.env.REACT_APP_API_KEY;
  const city = { name: 'Nuuk', country: 'GL', moreInfo: true };

  render(<WeatherCard city={city} />);

  await act(async () => {
    const axiosResponse = {
      temp: 289.91,
      humidity: 74,
      pressure: 1023
    };

    await mock.onGet(`https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.country}&APPID=${apiKey}`).reply(200, { main: axiosResponse });
  });
  
  expect(screen.queryByText('HUMIDITY')).toBeInTheDocument();
  expect(screen.queryByText('PRESSURE')).toBeInTheDocument();
  expect(screen.queryByText('74%')).toBeInTheDocument();
  expect(screen.queryByText('1023hPa')).toBeInTheDocument();
});


test('test render basic info', async () => {
  const mock = new MockAdapter(axios);

  const apiKey = process.env.REACT_APP_API_KEY;
  const city = { name: 'Nuuk', country: 'GL' };

  render(<WeatherCard city={city} />);

  await act(async () => {
    const axiosResponse = {
      temp: 289.91,
      humidity: 74,
      pressure: 1023
    };

    await mock.onGet(`https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.country}&APPID=${apiKey}`).reply(200, { main: axiosResponse });
  });

  expect(screen.getByText('17°')).toBeInTheDocument();
  expect(screen.getByText('Updated at', { exact: false })).toBeInTheDocument();
});

test('test class cold by temperature', async () => {
  localStorage.clear();
  const mock = new MockAdapter(axios);

  const apiKey = process.env.REACT_APP_API_KEY;
  const city = { name: 'Nuuk', country: 'GL' };

  render(<WeatherCard city={city} />);

  await act(async () => {
    const axiosResponse = {
      temp: 276,
      humidity: 74,
      pressure: 1023
    };

    await mock.onGet(`https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.country}&APPID=${apiKey}`).reply(200, { main: axiosResponse });
  });

  const element = screen.getByText('3°');
  expect(element).toHaveClass('cold');
});

test('test class warm by temperature', async () => {
  localStorage.clear();
  const mock = new MockAdapter(axios);

  const apiKey = process.env.REACT_APP_API_KEY;
  const city = { name: 'Nuuk', country: 'GL' };

  render(<WeatherCard city={city} />);

  await act(async () => {
    const axiosResponse = {
      temp: 289,
      humidity: 74,
      pressure: 1023
    };

    await mock.onGet(`https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.country}&APPID=${apiKey}`).reply(200, { main: axiosResponse });
  });

  const element = screen.getByText('16°');
  expect(element).toHaveClass('warm');
});

test('test class hot by temperature', async () => {
  localStorage.clear();
  const mock = new MockAdapter(axios);

  const apiKey = process.env.REACT_APP_API_KEY;
  const city = { name: 'Nuuk', country: 'GL' };

  render(<WeatherCard city={city} />);

  await act(async () => {
    const axiosResponse = {
      temp: 298,
      humidity: 74,
      pressure: 1023
    };

    await mock.onGet(`https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.country}&APPID=${apiKey}`).reply(200, { main: axiosResponse });
  });

  const element = screen.getByText('25°');
  expect(element).toHaveClass('hot');
});

test('test something went wrong', async () => {
  localStorage.clear();
  const mock = new MockAdapter(axios);

  const apiKey = process.env.REACT_APP_API_KEY;
  const city = { name: 'Nuuk', country: 'GL' };

  render(<WeatherCard city={city} />);

  await act(async () => {
    const axiosResponse = {
      temp: 298,
      humidity: 74,
      pressure: 1023
    };

    await mock.onGet(`https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.country}&APPID=${apiKey}`).networkErrorOnce();
  });

  expect(screen.getByText('Something went wrong')).toBeInTheDocument();

  await act(async () => {
    const axiosResponse = {
      temp: 298,
      humidity: 74,
      pressure: 1023
    };

    await mock.onGet(`https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.country}&APPID=${apiKey}`).reply(200, { main: axiosResponse });

    const button = screen.getByRole('button');
    userEvent.click(button);
  });

  expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
});
