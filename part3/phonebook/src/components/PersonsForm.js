import React from 'react'

import Control from './Control'

const PersonsForm = ({ data, handler }) => (
  <form onSubmit={handler}>
    {data.map(control => <Control key={control.label} {...control} />)}
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default PersonsForm
