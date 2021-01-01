import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementVotes } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const sortAnecdotes = state => state.sort((l, r) => r.votes - l.votes)
  const dispatch = useDispatch()
  const anecdotes = useSelector(sortAnecdotes)

  const vote = (id) => {
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