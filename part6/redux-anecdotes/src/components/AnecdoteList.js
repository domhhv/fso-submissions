import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { incrementVotes, initAnecdotes } from '../reducers/anecdotesReducer'

const AnecdoteList = () => {
  const extractAnecdotes = ({ anecdotes, filter }) => anecdotes
    .sort((l, r) => r.votes - l.votes)
    .filter(({ content }) => content.includes(filter))
  const dispatch = useDispatch()
  const anecdotes = useSelector(extractAnecdotes)

  const vote = item => {
    dispatch(incrementVotes(item))
  }

  useEffect(() => {
    dispatch(initAnecdotes())
  }, [dispatch])

  return anecdotes.map(item =>
    <div key={item.id}>
      <div>{item.content}</div>
      <div>
        has {item.votes}
        <button onClick={() => vote(item)}>
          vote
        </button>
      </div>
    </div>
  )
}

export default AnecdoteList