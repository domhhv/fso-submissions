import React from 'react'

const Total = ({ parts }) => {
	const calculateSum = (sum, { exercises }) => sum + exercises

	const sum = parts.reduce(calculateSum, 0)

	return <h3>total of {sum} exercises</h3>
}

export default Total
