const logger = require('./logger')

const requestLogger = ({ method, path, body }, res, next) => {
  logger.info(`Method: ${method}`)
  logger.info(`Path: ${path}`)
  logger.info('Body: ', body)
  logger.info('---')
  next()
}

const tokenExtractor = (req, res, next) => {
  const header = req.get('Authorization')

  if (header && header.toLowerCase().includes('bearer ')) {
    req.token = header.substring(7)
  }

  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  const { message, name } = error

  logger.error(message)

  switch (name) {
    case 'CastError':
      return res.status(400).send({ error: 'Malformatted id' })
    case 'ValidationError':
      return res.status(400).json({ error: message })
    case 'UnauthorizedError':
      return res.status(401).json({ error: message })
    case 'JsonWebTokenError':
      return res.status(401).json({ error: 'Invalid token' })
  }

  next(error)
}

module.exports = {
  requestLogger,
  tokenExtractor,
  unknownEndpoint,
  errorHandler,
}
