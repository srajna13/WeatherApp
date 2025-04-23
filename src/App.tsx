// key: 42e0359ba3d996611ef0ab4a4b37341f

// url1=https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true

// url2=https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=42e0359ba3d996611ef0ab4a4b37341f

// url3=https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[location]/[date1]/[date2]?key=LX4MDQG2VJ9MEBM8JWH8AQ8EM


import { useState, useContext} from 'react'
import axios from "axios"
import './App.css'
// import DayForecast from './Components/DayCarousel'
import { WeatherContext } from './context/WeatherContext';
import DayCarousel from './Components/DayCarousel';
import Card from './Components/Card';

function App() {
  
  const [location,setLocation]=useState<string>('');
  // const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const context=useContext(WeatherContext);

  if(!context) throw new Error('Weather Context not avilabale!');

  const {weather,setWeather}=context;

  const fetchWeather=async()=>{
    if(!location){
      setError('Please enter location!');
      return;
    }

    // setLoading(true);
    setError(null);
    setWeather(null);

    try{
      const apiKey=import.meta.env.VITE_api_key;
      // console.log(apiKey)
      const response=await axios.get<any>(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=us&key=${apiKey}&contentType=json`)
      // console.log(response)

      if(response.status!==200){
        throw new Error('Failed to fetch weather data')
      }

      const data = response.data;
      console.log(data);
      const current = data.currentConditions;

      const weatherData= {
        address:data.resolvedAddress,
        currentConditions:{
            temperature: current.temp,
            windspeed: current.windspeed,
            humidity: current.humidity,
            dew:current.dew,
            time: current.datetime,

        },
        daily: data.days.slice(1,8).map((day:any) => ({
          date: day.datetime,
          temp:day.temp,
          temp_max: day.tempmax,
          temp_min: day.tempmin,
          icon:day.icon,
        })),
      };

      setWeather(weatherData);
      // console.log(weatherData);
    }

    catch(err:any){
      setError('Failed to fetch weather data');
    }
    finally{
      // setLoading(false)
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>🌤️ Weather Checker</h1>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '10px',
        marginBottom: '30px'
      }}>
        <input
          type="string"
          placeholder='Enter a location..'
          value={location}
          onChange={(e)=>setLocation(e.target.value)}
          style={{
            padding: '10px 16px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            fontSize: '16px',
            outline: 'none',
            width: '220px',
            color:'#3b4a5c'
          }}
        />

        <button onClick={fetchWeather}
        style={{
          padding: '10px 20px',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer',
        }}>Get Weather</button>
      </div>

      {/* {location && loading && <p>Loading weather data...</p>} */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

          { weather && (
              <div>
                <Card/>
                <h3>Next 7 days forecast:</h3>
                <div style={{ overflowX: 'auto',
                  width:'100%',
                  padding:'0',
                  margin:'0',
                }}>
                <DayCarousel/>
                </div>
              </div>
            )}
    </div>
  );
}
export default App
