import React   from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notificationContent = useSelector(state => state.notification.content)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notificationContent) {
    return (
      <div style={style}>
        {notificationContent}
      </div>
    )
  }

  return null
}

export default Notification
