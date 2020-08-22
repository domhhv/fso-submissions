import React, { useState, useEffect } from 'react'

import { withValue, preventify } from './utils'
import {
  fetchAll,
  create,
  update,
  remove,
} from './services/persons'
import PersonsForm from './components/PersonsForm'
import Control from './components/Control'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [criteria, setCriteria] = useState('')

  const clearFields = () => {
    setNewName('')
    setNewNumber('')
  }

  const resolvePersons = items => setPersons(items)

  const fetchPersons = () => {
    fetchAll().then(resolvePersons)
  }

  useEffect(fetchPersons, [])

  const controlsData = [{
    label: 'name',
    value: newName,
    handler: withValue(setNewName),
  }, {
    label: 'number',
    value: newNumber,
    handler: withValue(setNewNumber),
  }]

  const addPerson = () => {
    if (!newName || !newNumber) {
      return window.alert('All fields are required')
    }

    const isExisting = ({ name }) => name === newName
    const existingPerson = persons.find(isExisting)

    if (existingPerson) {
      const shouldReplace = window.confirm(`${newName} has already been added to the phonebook, replace the old number with the new one?`)

      if (shouldReplace) {
        const { id } = existingPerson

        return update(id, { ...existingPerson, number: newNumber }).then(updatedPerson => {
          const accumulatePersons = (acc, person) => {
            if (person.id === updatedPerson.id) {
              return [...acc, updatedPerson]
            }

            return [...acc, person]
          }

          const updatedPersons = persons.reduce(accumulatePersons, [])

          clearFields()
          setPersons(updatedPersons)
        })
      }

      return void clearFields()
    }

    create(newName, newNumber).then(newPerson => {
      clearFields()
      setPersons([...persons, newPerson])
    })
  }

  const deletePerson = (personId, personName) => {
    if (window.confirm(`Delete ${personName}?`)) {
      remove(personId)
        .catch(error => {
          window.alert(`${personName} is already deleted`)
          console.error(error)
        })
        .finally(() => {
          setPersons(persons.filter(({ id }) => id !== personId))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonsForm data={controlsData} handler={preventify(addPerson)} />
      <h2>Numbers</h2>
      <Control label="filter shown with" value={criteria} handler={withValue(setCriteria)} />
      <Persons criteria={criteria.toLowerCase()} persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App