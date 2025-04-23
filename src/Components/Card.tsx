import {useContext} from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { WiDaySunny, WiStrongWind, WiHumidity } from 'react-icons/wi';


function Card() {
  // const { daily } = props;
  const context=useContext(WeatherContext);

  if(!context) return <div>No weather data available.</div>

  const {weather}=context;

  if(!weather) return <div>No weather data available.</div>

  return (
    <div style={{
        padding: '20px',
        borderRadius: '12px',
        background: 'linear-gradient(135deg,rgb(18, 32, 44), #3e5363, #5f7589)',
        textAlign: 'center',
        margin: '20px auto',
        maxWidth: '100%',
        color:'white',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)'
      }}>
        <h2 style={{ marginBottom: '10px' }}>📍 {weather.address}</h2>
  
        <WiDaySunny size={60} color="#f39c12" />
  
        <div style={{ fontSize: '42px', fontWeight: 'bold', margin: '10px 0' }}>
          {weather.currentConditions.temperature}°F
        </div>
  
        <p style={{ margin: '4px 0' }}><strong>Time:</strong> {weather.currentConditions.time}</p>
  
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '15px'
        }}>
          <div>
            <WiStrongWind size={28} />
            <div style={{ fontSize: '14px' }}>{weather.currentConditions.windspeed} km/h</div>
          </div>
          <div>
            <WiHumidity size={28} />
            <div style={{ fontSize: '14px' }}>{weather.currentConditions.humidity}%</div>
          </div>
        </div>
      </div>
  );
}

export default Card;
