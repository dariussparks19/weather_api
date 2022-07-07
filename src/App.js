import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  //setStates
  const [weather, setWeather] = useState(null)
  const [input, setInput] = useState('')

  useEffect(() => {
    axios.get('http://api.weatherapi.com/v1/current.json?key=ea228fdd6fa14e3e9e751324220607&q=London&aqi=no')
    .then(data => {
      setWeather(data.data);
      console.log(data.data);
    })
    .catch(err => console.log(err));
  }, [])

  //Event Handlers
const weatherInput = (e) => {
  setInput(e.target.value);
}
const searchWeather = () => {
  axios
    .get(`http://api.weatherapi.com/v1/current.json?key=ea228fdd6fa14e3e9e751324220607&q=${input}`)
    .then((data) => {
      setWeather(data.data);
    } )
    .catch(err => console.error(err));
}

  return (
    <div className="App">
      {weather && (
        <div>
          <div className='search'>
            <input onChange={weatherInput} type='text'/>
            <button onClick={searchWeather}>Search</button>
          </div>
          <div className='weather-info'>
            <h1>{weather.location.name}</h1>
            <h2>{weather.location.region}</h2>
            <div className='condition'>
              <h3>{weather.current.condition.text}</h3>
              <img src={weather.current.condition.icon} />
              <h3>{weather.current.temp_f} degrees Fahrenheit</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App;
