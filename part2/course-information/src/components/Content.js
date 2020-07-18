import React from 'react'

import Part from "./Part";

const renderContent = ({
	id,
	name,
	exercises,
}) => (
	<Part
		key={id}
		name={name}
		exercises={exercises}
	/>
)

const Content = ({ parts }) => parts.map(renderContent)

export default Content
