import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({
  canReveal,
  good,
  neutral,
  bad,
  all,
  average,
  positive,
}) => (
  <>
    <h1>statistics</h1>
    {
      canReveal
        ? (
          <div>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {all}</p>
            <p>average {average || 0}</p>
            <p>positive {positive || 0}%</p>
          </div>
        )
        : <p>No feedback given</p>
    }
  </>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const isFeedbackGathered = !!(good || neutral || bad);

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
      <Statistics
        canReveal={isFeedbackGathered}
        good={good}
        neutral={neutral}
        bad={bad}
        all={getAll()}
        average={getAverage()}
        positive={getPositive()}
      />
    </>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
