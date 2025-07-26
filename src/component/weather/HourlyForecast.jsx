import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const HourlyForecast = ({ data }) => {
  if (!data || !Array.isArray(data)) return null;

  // Format data for the chart
  const chartData = data.map((hour) => ({
    time: new Date(hour.dt * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
    temp: Math.round(hour.main.temp),
    description: hour.weather[0].main,
  }));

  return (
    <div className="bg-transparent ml-28 p-6 text-white">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="off"  />
          <XAxis dataKey="time" labelStyle={{color: "#FFFFFF"}} stroke="off" tick={{ fill: '#FFFFFF' }} />
          <YAxis domain={['auto', 'auto']} stroke="off" unit="°C" tick={{ fill: '#FFFFFF' }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#111", borderRadius: "10px", border: "none" }}
            labelStyle={{ color: "#FFFFFF" }}
            itemStyle={{ color: "#FFFFFF" }}
            formatter={(value, name) => [`${value}°C`, 'Temp']}
          />
          <Line type="monotone" dataKey="temp" stroke="#FFFFFF" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HourlyForecast;
