const FILTER = 'FILTER'

export const updateFilter = criteria => ({
  type: FILTER,
  payload: { criteria },
})

const filterReducer = (state = '', { type, payload }) => {
  switch (type) {
    case FILTER:
      return payload.criteria
    default:
      return state
  }
}

export default filterReducer
