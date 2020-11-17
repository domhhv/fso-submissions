import React from 'react'

import Person from './Person'

const meets = criteria => name => !criteria || name.toLowerCase().includes(criteria)

const renderPerson = (criteria, deletePerson) => person => meets(criteria)(person.name) && (
  <Person
    key={person.id}
    deletePerson={deletePerson}
    {...person}
  />
)

const Persons = ({ persons, criteria, deletePerson }) => persons.map(renderPerson(criteria, deletePerson))

export default Persons
