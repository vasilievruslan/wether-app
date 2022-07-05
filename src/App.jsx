import React, { useState, useEffect } from 'react';
import { getForecast } from './api'
import SearchInput from './components/SearchInput';
import Card from './components/Card'
import Forecast from './components/Forecast';

function App() {

  const [state, setState] = useState({
    current: null,
    location: null,
    forecast: []
  })

  const onCityChanged = async (city) => {
    const {current, forecast, location} = await getForecast(city.name);
    setState({
      current, 
      location,
      forecast: forecast.forecastday 
    })
  }

  const getCurrentPosition = () => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((data) => resolve(data), reject)
  })

  useEffect(() => {
    const getCurrentPositionWether = async () => {
      const { coords } = await getCurrentPosition()
      
      const {current, forecast, location} = await getForecast(`${coords.latitude},${coords.longitude}`);
      setState({
        current,
        location,
        forecast: forecast.forecastday
      })

    }
    
    getCurrentPositionWether()
  }, [])


  return (<div className="wether-app">
  <div className="header">
    <SearchInput onChange={onCityChanged}></SearchInput>

    {(state.location && state.current) && <Card location={state.location} current={state.current}></Card>}

    {!!state.forecast.length && <Forecast forecast={state.forecast}></Forecast>}
  </div>
</div>);
}

export default App;
