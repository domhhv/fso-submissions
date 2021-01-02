import { combineReducers } from 'redux'

import anecdotes from './anecdotesReducer'
import notification from './notificationReducer'
import filter from './filterReducer'

export default combineReducers({ anecdotes, notification, filter })
