import { useEffect, useState } from 'react'

import { fetchCountries } from '../services/countries'

export const useField = type => {
  const [value, setValue] = useState('')

  const onChange = ({ target: { value } }) => {
    setValue(value)
  }

  return { type, value, onChange }
}

export const useCountry = name => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      fetchCountries({ query: name })
        .then(([response]) => {
          setCountry({
            data: response,
            found: true,
          })
        })
        .catch(exception => {
          console.error(exception)
          setCountry({ found: false })
        })
    }
  }, [name])

  return country
}
