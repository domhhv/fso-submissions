export const withValue = callback => ({ target: { value } }) => callback(value)

export const preventify = callback => event => {
  event.preventDefault()
  callback()
}
