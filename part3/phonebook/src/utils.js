const isFunction = arg => typeof arg === 'function'

export const withValue = callback => ({ target: { value } }) => isFunction(callback) && callback(value)

export const preventify = callback => event => {
  event.preventDefault()

  if (!isFunction(callback)) {
    throw new Error('Callback is not valid')
  }

  callback()
}
