import React from 'react'

const Person = ({ id, name, number, deletePerson }) => (
  <p>{name} {number} <button onClick={() => deletePerson(id, name)}>delete</button></p>
)

export default Person
