import React from 'react'

import { useField, useResource } from './hooks'
import { extractValues, preventify } from './utils'

const App = () => {
  const content = useField('content')
  const name = useField('name')
  const number = useField('number')

  const [notes, noteService] = useResource('notes')
  const [persons, personService] = useResource('persons')

  const handleNoteSubmit = () => {
    noteService.create(extractValues({ content }))
  }

  const handlePersonSubmit = () => {
    personService.create(extractValues({ name, number }))
  }

  const renderNote = ({ id, content }) => <p key={id}>{content}</p>

  const renderPerson = ({ id, name, number }) => <p key={id}>{name} {number}</p>

  return (
    <div>
      <h2>Notes</h2>
      <form onSubmit={preventify(handleNoteSubmit)}>
        <input {...content} />
        <button>Create</button>
      </form>
      {notes.map(renderNote)}

      <h2>Persons</h2>
      <form onSubmit={preventify(handlePersonSubmit)}>
        Name <input {...name} /> <br/>
        Number <input {...number} />
        <button>Create</button>
      </form>
      {persons.map(renderPerson)}
    </div>
  )
}

export default App