import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from '../components/Weather';
import Spinner from '../components/Spinner';


export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=Delhi&units=metric&cnt=40&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
        );
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div>
      <Head>
        <title>Delhi Weather Forecast</title>
        <meta name="description" content="5-Day Weather Forecast for Delhi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center min-h-screen justify-center ">
        {loading ? (
          <Spinner />
        ) : weatherData ? (
          <Weather data={weatherData} />
        ) : (
          <p className="text-red-500">Failed to fetch weather data for Delhi.</p>
        )}
      </div>
    </div>
  );
}
