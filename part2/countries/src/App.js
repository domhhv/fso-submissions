import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './components/Countries'

const FIELDS = ['name', 'capital', 'population', 'languages', 'flag']

const App = () => {
  const [name, setName] = useState('')
  const [countries, setCountries] = useState([])
  const [countryDetailsIdx, setCountryDetailsIdx] = useState(null)

  const generateURL = () => `${process.env.REACT_APP_COUNTRIES_API_BASE_URL}/name/${name}?fields=${FIELDS.join(';')}`

  const resolveCountries = ({ data }) => setCountries(data)

  const clearCountries = () => setCountries([])

  const fetchCountries = () => {
    axios(generateURL()).then(resolveCountries).catch(clearCountries)

    return setCountryDetailsIdx(null)
  }

  useEffect(fetchCountries, [name])

  const updateName = ({ target: { value } }) => setName(value)

  return (
    <>
      <label>
        find countries <input value={name} onChange={updateName} />
      </label>
      <Countries items={countries} countryDetailsIdx={countryDetailsIdx} onShowDetails={setCountryDetailsIdx} />
    </>
  )
}

export default App
