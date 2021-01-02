import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementVotes } from '../reducers/anecdotesReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const extractAnecdotes = ({ anecdotes, filter }) => anecdotes
    .sort((l, r) => r.votes - l.votes)
    .filter(({ content }) => content.includes(filter))
  const dispatch = useDispatch()
  const anecdotes = useSelector(extractAnecdotes)

  const vote = id => {
    const { content } = anecdotes.find(a => a.id === id)
    dispatch(createNotification(`You voted ${content}`))
    dispatch(incrementVotes(id))
  }

  return anecdotes.map(({ id, content, votes }) =>
    <div key={id}>
      <div>{content}</div>
      <div>
        has {votes}
        <button onClick={() => vote(id)}>
          vote
        </button>
      </div>
    </div>
  )
}

export default AnecdoteList