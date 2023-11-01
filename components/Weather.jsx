import Image from 'next/image';
import React from 'react';

const formatForecastDate = (timestamp) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(timestamp).toLocaleDateString(undefined, options);
};

const Weather = ({ data }) => {
  if (!data || !data.list || data.list.length === 0) {
    return <p className="text-red-500">No weather data available.</p>;
  }

 
  const uniqueDays = {};

  const next5DaysData = data.list.reduce((result, forecast) => {
    const date = forecast.dt_txt.split(' ')[0]; // Extract the date
    if (!uniqueDays[date]) {
      uniqueDays[date] = true;
      result.push(forecast);
    }
    return result;
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="m-4 flex flex-col items-center">
      <p className="text-3xl font-semibold mb-4">{data.city.name} Weather</p>

      <div className="flex space-x-4">
        {next5DaysData.map((forecast, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
            <Image
              src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
              alt="Weather Icon"
              width={100}
              height={100}
            />
            <p className="text-2xl">{forecast.weather[0].main}</p>
            <p className="text-2xl">{forecast.main.temp.toFixed(0)}&#176;C</p>
            <p className="text-2xl">{formatForecastDate(forecast.dt_txt)}</p> {/* Display the timestamp */}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Weather;
