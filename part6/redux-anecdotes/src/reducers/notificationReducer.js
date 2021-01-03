const NOTIFY = 'NOTIFY'

export const setNotification = (content, delay) => dispatch => {
  dispatch({
    type: NOTIFY,
    payload: { content },
  })

  window.setTimeout(() => {
    dispatch({
      type: NOTIFY,
      payload: { content: '' },
    })
  }, delay)
}

const notificationReducer = (state = '', { type, payload }) => {
  switch (type) {
    case NOTIFY:
      return payload.content

    default:
      return state
  }
}

export default notificationReducer
