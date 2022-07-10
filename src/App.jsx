import React, { useState, useEffect } from 'react';
import { getForecast } from './api'
import SearchInput from './components/SearchInput';
import Card from './components/Card'
import Forecast from './components/Forecast';
import Hours from './components/Hours';

function App() {

  const [state, setState] = useState({
    current: null,
    location: null,
    forecast: [],
    hours: [],
  })

  const onCityChanged = async (city) => {
    const {current, forecast, location} = await getForecast(city.name);
    setState({
      current, 
      location,
      forecast: forecast.forecastday,
      hours: forecast.forecastday[0].hour,
    })
  }

  const getCurrentPosition = () => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((data) => resolve(data), reject)
  })

  useEffect(() => {
    const getCurrentPositionWether = async () => {
      const { coords } = await getCurrentPosition()
      
      const {current, forecast, location} = await getForecast(`${coords.latitude},${coords.longitude}`);
      const removeExpiredHours = () => {
        const currentTime = new Date().getHours() + ':00';
        const hoursArr = forecast.forecastday[0].hour;
        const arrStart = hoursArr.find(el => el.time.split(' ')[1] === currentTime);
        return hoursArr.slice(hoursArr.indexOf(arrStart), hoursArr.length + 1);
      }

      removeExpiredHours()
      setState({
        current,
        location,
        forecast: forecast.forecastday,
        hours: removeExpiredHours(),
      })

    }
    
    getCurrentPositionWether()
  }, [])


  return (<div className="wether-app">
    <SearchInput onChange={onCityChanged}></SearchInput>

    {(state.location && state.current) && <Card location={state.location} current={state.current}></Card>}

    {!!state.forecast.length && <Forecast forecast={state.forecast}></Forecast>}

    {!!state.hours && <Hours hours={state.hours}></Hours>}
</div>);
}

export default App;
