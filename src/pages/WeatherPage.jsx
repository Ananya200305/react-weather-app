import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeather } from '../feature/weatherSlice'
import { useParams, useLocation } from 'react-router-dom'
import authservice from '../appwrite/auth'
import { getBackgroundImg } from '../utils/getBackgroundImg'
import CurrentForecast from '../component/weather/CurrentForecast'
import HourlyForecast from '../component/weather/HourlyForecast'
import AirConditions from '../component/weather/AirConditions'

function WeatherPage() {
  const dispatch = useDispatch()
  const { city } = useParams()
  const { state } = useLocation(); // get location state from navigation

  const [userId, setUserId] = useState(undefined); // undefined initially
  const [location, setLocation] = useState(null);

  const weather = useSelector((state) => state.weather.data);
  const loading = useSelector((state) => state.weather.loading);
  const error = useSelector((state) => state.weather.error);

  // 1. Fetch current user
  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await authservice.getCurrentUser()
        setUserId(user?.$id || null); // set null if not found
      } catch (error) {
        console.warn('Guest mode (not logged in)');
        setUserId(null); // guest
      }
    }
    getUser()
  }, [])

  // 2. Set location from router state
  useEffect(() => {
    if (state?.location) {
      setLocation(state.location);
    }
  }, [state]);

  // 3. Fetch weather only when both userId and location are ready
  useEffect(() => {
    if (userId !== undefined && location) {
      dispatch(fetchWeather({ location, userId }));
    }
  }, [userId, location, dispatch]);

  // Optional: set background
  const bgImage = weather ? getBackgroundImg(weather.weather_main) : null;

  if (loading) return <div className="text-white text-center mt-10">Loading weather...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  if (!weather) return null;

  return (
    <div className="min-h-screen px-4 py-8 text-white bg-cover bg-center bg-no-repeat relative transition-all duration-700"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundColor: 'rgba(0,0,0,0.3)',
        backgroundBlendMode: 'overlay',
      }}>

        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="relative z-10 space-y-8">
        <CurrentForecast data={weather} />
        <div className='grid grid-cols-2'>
          <HourlyForecast data={JSON.parse(weather.forecast)} />
          <AirConditions data={weather} />
        </div>
        {/* <NearbyActivities city={weather.name} /> */}
    </div>
    </div>
  )
}

export default WeatherPage;
