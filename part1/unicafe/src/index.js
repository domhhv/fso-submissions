import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>
    {text}
  </button>
);

const Statistic = ({ text, value }) => <p>{text} {value}</p>

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
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text="all" value={all} />
            <Statistic text="average" value={average} />
            <Statistic text="positive" value={positive} />
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
        <Button text="good" handleClick={() => setGood(good + 1)} />
        <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
        <Button text="bad" handleClick={() => setBad(bad + 1)} />
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
