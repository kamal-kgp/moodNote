"use client"; 
import React from 'react';


export default function WeatherDisplay({ weather, isLoading, error }) {
  if (isLoading) {
    return <div className="text-center text-gray-500 p-2 text-sm">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-2 text-xs max-w-[100px]">{error}</div>;
  }

  console.log("we", weather)

  if (weather && weather.temperature !== null) {
    return (
      <div className="flex items-center justify-end space-x-2 p-2 bg-white/50 rounded-lg shadow-sm text-sm text-gray-700 min-w-[80px]">
        <span className="text-2xl" aria-label={weather.description || 'Weather icon'}>
          <img src={weather.icon} alt="" />
        </span>
        <span className="font-medium">
          {Math.round(weather.temperature)}°C
        </span>
      </div>
    );
  }
  return <div className="text-center text-gray-400 p-2 text-sm">N/A</div>;
}