// src/context/WeatherContext.tsx

import React, { createContext, useState, ReactNode } from 'react';

interface WeatherData {
  address: string;
  currentConditions:{
    temperature: number;
    windspeed: number;
    humidity: number;
    dew: number;
    time: string;
  }
  daily: {
    date: string;
    temp: number;
    temp_max: number;
    temp_min: number;
    icon: string;
  }[];
}

interface WeatherContextType {
  weather: WeatherData | null;
  setWeather: React.Dispatch<React.SetStateAction<WeatherData | null>>;
}
  
export const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

// WeatherProvider component that holds the state
export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  return (
    <WeatherContext.Provider value={{ weather, setWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};