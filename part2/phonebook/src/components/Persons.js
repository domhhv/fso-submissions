import React from 'react'

import Person from './Person'

const meets = criteria => name => !criteria || name.toLowerCase().includes(criteria)

const renderPerson = criteria => ({ name, number }) => meets(criteria)(name) && <Person key={name} name={name} number={number} />

const Persons = ({ persons, criteria }) => persons.map(renderPerson(criteria))

export default Persons
