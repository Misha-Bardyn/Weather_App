import React, { useEffect, useState } from 'react';
import classes from './App.module.css';
import ForecastDays from './components/ForecastDays/ForecastDays';
import Inputs from './components/Inputs/Inputs';
import TemperatureAndDetails from './components/TemperatureAndDetails/TemperatureAndDetails';
import TimeAndLocation from './components/TimeAndLocation/TimeAndLocation';
import TopButtonsCountry from './components/TopButtonsCountry/TopButtonsCountry';
import { getFormattedWeatherData } from './servicec/WeatherService'

function App() {
  const [query, setGuery] = useState('Kyiv');
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState('metric');

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getFormattedWeatherData(query, units);
        setWeather(data)
      } catch (error) {
        alert('Please enter the city correctly')
      }
    };
    fetchWeatherData();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return { backgroundImage: "linear-gradient(to bottom right, #33ccff 10%, #ff9730 80%)" };
    const threshold = units === 'metric' ? 20 : 50;
    if (weather.temp <= threshold) return { backgroundImage: "linear-gradient(to bottom right, #33ccff 10%, #2948ff 80%)" };
    return { backgroundImage: "linear-gradient(to bottom right, #33ccff 10%, #ff9730 80%)" }
  }

  return (
    <div className={classes.wrapper} style={formatBackground()}>
      <TopButtonsCountry setGuery={setGuery} />
      <Inputs
        setGuery={setGuery}
        setUnits={setUnits}
      />
      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
          <ForecastDays
            tztimemilisek={weather.tztimemilisek}
            arrTempAndIcon={weather.arrTempAndIcon}
          />
        </div>
      )}
    </div>
  )
}
// перевірити назви змвнних та компонентів
export default App;
