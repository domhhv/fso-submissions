import React from 'react'

import CountryDetails from './CountryDetails'

const Countries = ({ items, countryDetailsIdx, onShowDetails }) => {
  if (!items.length) {
    return <p>No countries ¯\_(ツ)_/¯</p>
  }

  if (items.length === 1) {
    return <CountryDetails {...items[0]} />
  }

  if (items.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  const displayCountry = ({ name }, idx) => (
    <li key={name}>
      {name} <button onClick={() => onShowDetails(idx)}>show</button>
    </li>
  )

  return (
    <>
      <ul>
        {items.map(displayCountry)}
      </ul>
      {typeof countryDetailsIdx === 'number' && <CountryDetails {...items[countryDetailsIdx]} />}
    </>
  )
}

export default Countries
