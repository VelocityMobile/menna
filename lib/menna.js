const winston = require('winston')
const { Papertrail } = require('winston-papertrail')

const { DEBUG } = process.env
const LOGGING_LEVEL = DEBUG ? 'debug' : 'info'

const transports = []

if (!process.env.HIDE_ALL_LOGS) {
  transports.push(new (winston.transports.Console)({
    level: LOGGING_LEVEL,
    colorize: true,
    prettyPrint: DEBUG === 'debug',
  }))

  if (process.env.PAPERTRAIL_HOST && process.env.PAPERTRAIL_PORT) {
    const papertrail = new Papertrail({
      host: process.env.PAPERTRAIL_HOST,
      port: process.env.PAPERTRAIL_PORT,
      hostname: process.env.PAPERTRAIL_HOSTNAME,
      level: LOGGING_LEVEL,
      colorize: true,
      depth: 1,
    })

    transports.push(papertrail)
  }
}

const logger = new winston.Logger({ transports })

module.exports = logger
