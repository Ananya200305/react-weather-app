import React from 'react';

const CurrentForecast = ({ data }) => {
  return (
    <div className="bg-transparent">
      <h2 className="text-2xl ml-36 font-semibold mb-1">{data.name}</h2>
        <p className="text-lg capitalize ml-36 mb-10">{data.weather_main}</p>
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-9xl ml-36 font-bold">{Math.round(data.main_temp)}°C</h1>
          <p className="text-md text-gray-300 mb-4 ml-36">{new Date(data.timestamp).toLocaleString()}</p>

        </div>

        <div className="flex flex-col items-center">
          <img
            src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
            alt={data.weather_main}
            className="mr-36 size-60"
          />
        </div>
      </div>
    </div>
  );
};

export default CurrentForecast;
