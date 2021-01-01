const VOTE = 'VOTE'
const ADD = 'ADD'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const incrementVotes = anecdoteId => ({
  type: VOTE,
  payload: { anecdoteId }
})

export const createAnecdote = content => ({
  type: ADD,
  payload: { content }
})

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case VOTE:
      const { anecdoteId } = payload

      return state.reduce((anecdotes, current) => {
        if (current.id === anecdoteId) {
          return [...anecdotes, { ...current, votes: current.votes + 1}]
        }

        return [...anecdotes, current]
      }, [])
    case ADD:
      return [...state, asObject(payload.content)]
    default:
      return state
  }
}

export default reducer