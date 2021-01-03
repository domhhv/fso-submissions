const NOTIFY = 'NOTIFY'
const DELAY = 'DELAY'

const notify = content => ({
  type: NOTIFY,
  payload: { content },
})

const setTimeoutId = timeoutId => ({
  type: DELAY,
  payload: { timeoutId }
})

export const setNotification = (content, delay) => (dispatch, getState) => {
  dispatch(notify(content))

  const { timeoutId } = getState().notification

  if (timeoutId) {
    window.clearTimeout(timeoutId)
  }

  const clearNotification = () => {
    dispatch(notify(''))
  }

  dispatch(
    setTimeoutId(
      window.setTimeout(clearNotification, delay)
    )
  )
}

const notificationReducer = (state = {}, { type, payload }) => {
  const { content, timeoutId } = payload || {}

  switch (type) {
    case NOTIFY:
      return { ...state, content }

    case DELAY:
      return { ...state, timeoutId }

    default:
      return state
  }
}

export default notificationReducer
