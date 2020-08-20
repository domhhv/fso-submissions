import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { withValue, preventify } from './utils'
import PersonsForm from './components/PersonsForm'
import Control from './components/Control'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Taras Shevchenko', number: '+380 (99) 123 45 67' }])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [criteria, setCriteria] = useState('')

  const resolvePersons = ({ data }) => setPersons(data)

  const fetchPersons = () => {
    axios('http://localhost:3001/persons').then(resolvePersons)
  }

  useEffect(fetchPersons, [])

  const controlsData = [{
    label: 'name',
    value: newName,
    handler: withValue(setNewName),
  },
  {
    label: 'number',
    value: newNumber,
    handler: withValue(setNewNumber),
  }]

  const updatePersons = () => {
    if (!newName || !newNumber) {
      return window.alert('All fields are required')
    }

    const existing = ({ name }) => name === newName

    if (persons.find(existing)) {
      return window.alert(`${newName} has already been added to the phonebook`)
    }

    setNewName('')
    setNewNumber('')
    setPersons([...persons, {
      name: newName,
      number: newNumber
    }])
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonsForm data={controlsData} handler={preventify(updatePersons)} />
      <h2>Numbers</h2>
      <Control label="filter shown with" value={criteria} handler={withValue(setCriteria)} />
      <Persons criteria={criteria.toLowerCase()} persons={persons} />
    </div>
  )
}

export default App