import React from 'react'

export const NOTIFICATION_STATES = {
  ERROR: 'error',
  SUCCESS: 'success',
}

export const Notification = ({ message, state }) => message && (
  <div className={`notification-box notification-box__${state}`}>
    {message}
  </div>
)
