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
import { Notification, NOTIFICATION_STATES } from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [criteria, setCriteria] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationState, setNotificationState] = useState('')
  const [cleanUpMessageTimeoutId, setCleanUpMessageTimeoutId] = useState(null)

  const clearFields = () => {
    setNewName('')
    setNewNumber('')
  }

  const clearMessage = () => {
    setNotificationMessage('')
    setNotificationState('')
  }

  const scheduleMessageCleanUp = delay => window.setTimeout(clearMessage, delay)

  const notify = ({ message, state }) => {
    window.clearTimeout(cleanUpMessageTimeoutId)
    setNotificationMessage(message)
    setNotificationState(state)
    setCleanUpMessageTimeoutId(
      scheduleMessageCleanUp(5000)
    )
  }
  const resolvePersons = items => setPersons(items)

  const fetchPersons = () => {
    fetchAll().then(resolvePersons)

    return window.clearTimeout(cleanUpMessageTimeoutId)
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
        const { id, name } = existingPerson

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
          setNotificationMessage(`Updated ${updatedPerson.name}'s number`)
          setNotificationState(NOTIFICATION_STATES.SUCCESS)
          scheduleMessageCleanUp(5000)
        }).catch(error => {
          console.error(error)
          notify({
            message: `Data of ${name} has already been deleted from the server`,
            state: NOTIFICATION_STATES.ERROR,
          })
          const matchId = person => person.id !== id
          const filteredPersons = persons.filter(matchId)
          setPersons(filteredPersons)
        })
      }

      return void clearFields()
    }

    create(newName, newNumber).then(newPerson => {
      clearFields()
      setPersons([...persons, newPerson])
      notify({
        message: `Added ${newPerson.name}`,
        state: NOTIFICATION_STATES.SUCCESS,
      })
    })
  }

  const deletePerson = (personId, personName) => {
    if (window.confirm(`Delete ${personName}?`)) {
      remove(personId)
        .then(() => {
          notify({
            message: `${personName} has been deleted`,
            state: NOTIFICATION_STATES.SUCCESS,
          })
        })
        .catch(error => {
          console.error(error)
          notify({
            message: `${personName} is already deleted`,
            state: NOTIFICATION_STATES.ERROR,
          })
        })
        .finally(() => {
          const matchId = ({ id }) => id !== personId
          const filteredPersons = persons.filter(matchId)
          setPersons(filteredPersons)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} state={notificationState} />
      <PersonsForm data={controlsData} handler={preventify(addPerson)} />
      <h2>Numbers</h2>
      <Control label="filter shown with" value={criteria} handler={withValue(setCriteria)} />
      <Persons criteria={criteria.toLowerCase()} persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App