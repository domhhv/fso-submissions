const NOTIFY = 'NOTIFY'

export const createNotification = content => ({
  type: NOTIFY,
  payload: { content },
})

const notificationReducer = (state = '', { type, payload }) => {
  switch (type) {
    case NOTIFY:
      return payload.content
    default:
      return state
  }
}

export default notificationReducer
