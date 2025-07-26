import React from 'react'
import { useSelector } from 'react-redux'
import { ResponsiveContainer, Line, LineChart, XAxis, Tooltip, CartesianGrid } from 'recharts'

function CurrentForecast() {
    const weatherData = useSelector((state) => state.weather.data)
  return (
    <div>
      
    </div>
  )
}

export default CurrentForecast
