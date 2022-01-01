import React, { useState, useEffect } from "react"
import axios from 'axios'

const Weather = ({ city }) => {
    const [weather, setWeather] = useState('')
  
    useEffect(() => {
      const api_key = process.env.REACT_APP_API_KEY
      if (city) {
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
          .then(response =>
            setWeather(response.data)
          )
          .catch(error =>
            setWeather('')
          )
      }
    }, [city])
  
    if (weather) {
      return (
        <>
          <h3>Weather in {city}</h3>
          <div>temperature: {weather.main.temp} Celsius</div>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={`${weather.weather[0].description}`}
          />
          <div>wind: {weather.wind.speed} m/s direction {weather.wind.deg} degrees</div>
        </>
      )
    } else {
      return (
      <div>No weather info found for {city}</div>
      )
    }
  }

  export default Weather