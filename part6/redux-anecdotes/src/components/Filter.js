import React from 'react'
import { connect } from 'react-redux'

import { updateFilter } from '../reducers/filterReducer'

const Filter = ({ filter }) => {
  const handleChange = ({ target }) => {
    filter(target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  filter: updateFilter
}

export default connect(null, mapDispatchToProps)(Filter)
