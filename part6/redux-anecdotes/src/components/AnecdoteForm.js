import React from 'react'
import { connect } from 'react-redux'

import { createAnecdote } from '../reducers/anecdotesReducer'

const AnecdoteForm = ({ addItem }) => {
  const add = async event => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    addItem(content)
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

const mapDispatchToProps = ({
  addItem: createAnecdote
})

export default connect(null, mapDispatchToProps)(AnecdoteForm)
