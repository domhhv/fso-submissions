import React from 'react'

const Countries = ({ items }) => {
  if (!items.length) {
    return <p>No countries ¯\_(ツ)_/¯</p>
  }

  const displayItem = ({ name }) => <li key={name}>{name}</li>

  if (items.length === 1) {
    const {
      name,
      capital,
      population,
      languages,
      flag,
    } = items[0]

    return (
      <>
        <h1>{name}</h1>
        <p>capital {capital}</p>
        <p>population {population}</p>
        <h3>languages</h3>
        <ul>
          {languages.map(displayItem)}
        </ul>
        <img src={flag} alt={`${name}'s flag`} width={200} />
      </>
    )
  }

  if (items.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  return (
    <ul>
      {items.map(displayItem)}
    </ul>
  )
}

export default Countries
