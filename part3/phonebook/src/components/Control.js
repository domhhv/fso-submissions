import React from 'react'

const Control = ({
  label,
  value,
  handler,
}) => (
  <div>
    {label}: <input value={value} onChange={handler} />
  </div>
)

export default Control
