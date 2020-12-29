const checkEnv = cb => process.env.NODE_ENV !== 'test' && cb()

const info = (...params) => checkEnv(() => console.log(...params))

const error = (...params) => checkEnv(() => console.error(...params))

module.exports = { info, error }
