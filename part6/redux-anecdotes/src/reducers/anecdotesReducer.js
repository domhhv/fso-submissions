import { setNotification } from './notificationReducer'

import { createOne, getAll, updateOne } from '../services/anecdotes'

const VOTE = 'VOTE'
const ADD = 'ADD'
const INIT_ANECDOTES = 'INIT_ANECDOTES'

export const initAnecdotes = () => async dispatch => {
  const items = await getAll()
  dispatch({
    type: INIT_ANECDOTES,
    payload: { items }
  })
}

export const incrementVotes = item => async dispatch => {
  await updateOne({
    ...item,
    votes: item.votes + 1,
  })

  dispatch({
    type: VOTE,
    payload: { anecdoteId: item.id }
  })

  dispatch(setNotification(`You voted ${item.content}`, 5000))
}

export const createAnecdote = content => async dispatch => {
  const item = await createOne({
    content,
    votes: 0,
  })

  dispatch({
    type: ADD,
    payload: { item }
  })

  dispatch(setNotification(`You created ${content}`, 5000))
}

const anecdotesReducer = (state = [], { type, payload }) => {
  switch (type) {
    case INIT_ANECDOTES:
      return payload.items

    case ADD:
      return [...state, payload.item]

    case VOTE:
      const { anecdoteId } = payload

      return state.reduce((anecdotes, current) => {
        if (current.id === anecdoteId) {
          return [...anecdotes, { ...current, votes: current.votes + 1}]
        }

        return [...anecdotes, current]
      }, [])

    default:
      return state
  }
}

export default anecdotesReducer