import React from 'react';
import { render, screen } from '@testing-library/react';
import Weather from './components/Weather'; 
import '@testing-library/jest-dom';



test('renders Weather component with city name and weather data', () => {
  const mockData = {
    city: { name: 'Delhi' },
    list: [
      { dt_txt: '2023-10-01 12:00:00', main: { temp: 25 }, weather: [{ icon: '01d', main: 'Clear' }] },
      { dt_txt: '2023-10-02 12:00:00', main: { temp: 20 }, weather: [{ icon: '02d', main: 'Clouds' }] },
      { dt_txt: '2023-10-03 12:00:00', main: { temp: 22 }, weather: [{ icon: '03d', main: 'Partly Cloudy' }] },
      { dt_txt: '2023-10-04 12:00:00', main: { temp: 18 }, weather: [{ icon: '04d', main: 'Cloudy' }] },
      { dt_txt: '2023-10-05 12:00:00', main: { temp: 15 }, weather: [{ icon: '09d', main: 'Rain' }] },
    ],
  };

  render(<Weather data={mockData} />);

 
  const cityNameElement = screen.getByText('Delhi Weather');
  expect(cityNameElement).toBeInTheDocument();

 
  for (const forecast of mockData.list) {
    const weatherDescriptionElement = screen.getByText(forecast.weather[0].main);
    expect(weatherDescriptionElement).toBeInTheDocument();

    const temperatureElement = screen.getByText(`${forecast.main.temp.toFixed(0)}°C`);
    expect(temperatureElement).toBeInTheDocument();

    const timestampElement = screen.getByText(forecast.dt_txt);
    expect(timestampElement).toBeInTheDocument();
  }
});

test('renders no weather data available message when data is missing', () => {
  const mockData = null; // Simulate missing data

  render(<Weather data={mockData} />);

  
  const errorMessageElement = screen.getByText('No weather data available.');
  expect(errorMessageElement).toBeInTheDocument();
});
