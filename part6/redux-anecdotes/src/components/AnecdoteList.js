import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { incrementVotes, initAnecdotes } from '../reducers/anecdotesReducer'

const AnecdoteList = ({ extractedAnecdotes, vote, initItems }) => {
  useEffect(() => {
    initItems()
  }, [initItems])

  return extractedAnecdotes.map(item =>
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

const mapStateToProps = ({ anecdotes, filter }) => ({
  extractedAnecdotes: anecdotes
    .sort((l, r) => r.votes - l.votes)
    .filter(({ content }) => content.toLowerCase().includes(filter))
})

const mapDispatchToProps = {
  vote: incrementVotes,
  initItems: initAnecdotes,
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)