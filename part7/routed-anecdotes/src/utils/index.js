import { fieldsReducer } from './helpers'

export const extractValues = fields => Object.values(fields).reduce(fieldsReducer, {})

export const preventify = callback => event => !(event.preventDefault()) && callback()
