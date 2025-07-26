import React from 'react';

const AirConditions = ({ data }) => {
  return (
    <div className="bg-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-sm w-96 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold underline mb-2">Air Conditions</h2>

      <div className="flex flex-col mt-10 gap-4">
            <p className="text-xl font-medium text-white">Feels like : {Math.round(data.feels_like)}°C</p>
            <p className="text-xl font-medium text-white">Humidity: <span className="text-xl text-white">{data.humidity}%</span></p>
            <p className="text-xl font-medium text-white">Wind Speed: <span className="text-xl font-medium text-white">{data.wind} m/s</span></p>
            <p className="text-xl font-medium text-white">Visibility: <span className="text-xl font-medium text-white">{data.visibility / 1000} km</span></p>

        
      </div>
    </div>
  );
};

export default AirConditions;
