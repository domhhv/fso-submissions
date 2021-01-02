import React from 'react'
import { useDispatch } from 'react-redux'

import { createAnecdote } from '../reducers/anecdotesReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = event => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(createAnecdote(content))
    dispatch(createNotification(`You created ${content}`))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name="content" /></div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
