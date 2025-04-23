import {useContext} from 'react';
import { WeatherContext } from '../context/WeatherContext';


function DayCarousel() {
  // const { daily } = props;
  const context=useContext(WeatherContext);

  if(!context) return <div>No weather data available.</div>

  const {weather}=context;

  if(!weather) return <div>No weather data available.</div>

  return (
    
    <div style={{
      display: 'flex',
      gap: '12px',
      padding: '10px 0',
      // backgroundColor: '#f1f1f1',
      margin: '0 auto',
      width: 'max-content',
    }}>
      {/* <h3>Next 7 days forecast:</h3> */}
      {weather.daily.map((day) => (
        <div
          key={day.date}
          style={{
            flex: '0 0 auto',
            padding: '12px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #1d2b37, #3b4a5c, #506c84)',
            minWidth: '180px',
            textAlign: 'center',
            scrollSnapAlign: 'start',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            color:'white'
          }}
        >
          <p style={{ fontWeight: 'bold' }}>{day.date}</p>
          <img
            src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/${day.icon}.png`}
            alt={day.icon}
            style={{ width: '50px', height: '50px' }}
          />
          <p>{day.temp_min}°F - {day.temp_max}°F</p>
        </div>
      ))}
    </div>
  );
}

export default DayCarousel;
