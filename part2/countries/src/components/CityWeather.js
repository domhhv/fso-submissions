import React, { useState, useEffect } from 'react'

import axios from 'axios'

const CityWeather = ({ cityName }) => {
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)
  const [weatherData, setWeatherData] = useState(null)

  const generateURL = () => {
    const {
      REACT_APP_WEATHER_API_BASE_URL,
      REACT_APP_WEATHERSTACK_API_KEY,
    } = process.env

    return `${REACT_APP_WEATHER_API_BASE_URL}/current?access_key=${REACT_APP_WEATHERSTACK_API_KEY}&query=${cityName}`
  }

  const resolveWeather = ({ data }) => {
    const { success, error } = data

    if (success === false) return handleError(error)

    setFailed(false)
    setWeatherData(data)
  }

  const handleError = e => {
    setFailed(true)
    console.log('You may need to provide a valid Weatherstack API key in .env.local file at the root of the project')
    console.error(e)
  }

  const fetchWeather = () => {
    setLoading(true)

    axios(
      generateURL()
    )
      .then(resolveWeather)
      .catch(handleError)
      .finally(() => setLoading(false))

    return setWeatherData(null)
  }

  useEffect(fetchWeather, [cityName])

  if (loading) return <p>Loading current weather in {cityName}...</p>

  if (failed) return <p>Oops, something went wrong while fetching the current weather in {cityName}</p>

  if (!weatherData) return null

  const { current } = weatherData

  return (
    <>
      <h2>Weather in {cityName}</h2>
      <p>
        <b>temperature:</b> {current?.temperature} Celcius
      </p>
      <img src={current?.weather_icons[0]} alt="Weather icon" />
      <p>
        <b>wind:</b> {current?.wind_speed} mph direction {current?.wind_dir}
      </p>
    </>
  )
}

export default CityWeather
