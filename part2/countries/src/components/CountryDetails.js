import React from 'react'

import CityWeather from './CityWeather'

const CountryDetails = ({
  name,
  capital,
  population,
  languages,
  flag,
}) => (
  <>
    <h1>{name}</h1>
    <p>capital {capital}</p>
    <p>population {population}</p>
    <h3>languages</h3>
    <ul>
      {languages.map(({ name }) => <li key={name}>{name}</li>)}
    </ul>
    <img src={flag} alt={`${name}'s flag`} width={200} />
    <CityWeather cityName={capital} />
  </>
)

export default CountryDetails
