import { useEffect, useState } from 'react'
import axios from 'axios'

export const useField = name => {
  const [value, setValue] = useState('')

  const onChange = ({ target: { value } }) => {
    setValue(value)
  }

  return { name, value, onChange }
}
export const useResource = name => {
  const [resources, setResources] = useState([])
  const [baseUrl] = useState(`http://localhost:3005/${name}`)

  useEffect(() => {
    axios(baseUrl).then(({ data }) => setResources(data))
  }, [baseUrl])

  const create = resource => {
    axios.post(baseUrl, resource).then(({ data }) => {
      setResources([...resources, data])
    })
  }

  const service = { create }

  return [resources, service]
}