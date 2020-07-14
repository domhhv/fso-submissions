import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const getAll = () => good + neutral + bad;

  const getAverage = () => (good - bad) / getAll();

  const getPositive = () => good * 100 / getAll();

  return (
    <>
      <h1>give feedback</h1>
      <div>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {getAll()}</p>
      <p>average {getAverage() || 0}</p>
      <p>positive {getPositive() || 0}%</p>
    </>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
