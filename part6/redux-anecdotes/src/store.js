import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducers/rootReducer'

export default createStore(reducer, composeWithDevTools())
