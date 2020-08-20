import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './components/Countries'

const API_DOMAIN = 'https://restcountries.eu/rest/v2/name'

const FIELDS = ['name', 'capital', 'population', 'languages', 'flag']

const App = () => {
  const [name, setName] = useState('')
  const [countries, setCountries] = useState([])

  const generateURL = () => `${API_DOMAIN}/${name}?fields=${FIELDS.join(';')}`

  const resolveCountries = ({ data }) => setCountries(data)

  const clearCountries = () => setCountries([])

  const fetchCountries = () => {
    axios(generateURL()).then(resolveCountries).catch(clearCountries)
  }

  useEffect(fetchCountries, [name])

  const updateName = ({ target: { value } }) => setName(value)

  return (
    <>
      <label>
        find countries <input value={name} onChange={updateName} />
      </label>
      <Countries items={countries} />
    </>
  )
}

export default App;
