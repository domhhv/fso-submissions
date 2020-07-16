import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const getRandomIndex = length => Math.floor(
  Math.random() * length,
);

const Anecdote = ({ title, anecdote, point }) => (
  <>
    <h1>{title}</h1>
    <p>{anecdote}</p>
    <p>Has {point} votes</p>
  </>
);

const App = ({ anecdotes }) => {
  const { length } = anecdotes;
  const initialPoints = Array(length).fill(0);

  const [selectedAnecdoteIndex, setSelectedAnecdoteIndex] = useState(0);
  const [points, setPoints] = useState(initialPoints);

  const selectRandomAnecdote = () => setSelectedAnecdoteIndex(getRandomIndex(length));

  const vote = () => {
    const tryToIncrease = (point, index) => point + Number(index === selectedAnecdoteIndex);

    setPoints(points.map(tryToIncrease));
  };

  const topRatedAnecdoteIndex = points.indexOf(Math.max(...points));

  return (
    <>
      <Anecdote
        title="Anecdote of the day"
        anecdote={anecdotes[selectedAnecdoteIndex]}
        point={points[selectedAnecdoteIndex]}
      />

      <div>
        <button onClick={vote}>Vote</button>
        <button onClick={selectRandomAnecdote}>Next anecdote</button>
      </div>

      <Anecdote
        title="Anecdote with most votes"
        anecdote={anecdotes[topRatedAnecdoteIndex]}
        point={points[topRatedAnecdoteIndex]}
      />
    </>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root'),
);
