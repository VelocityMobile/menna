const winston = require('winston')

const DEBUG = process.env.DEBUG
const LOGGING_LEVEL = DEBUG ? 'debug' : 'info'
const transports = []

// expose`winston.transports.Papertrail`
require('winston-papertrail').Papertrail // eslint-disable-line no-unused-expressions

if (!process.env.HIDE_ALL_LOGS) {
  transports.push(new (winston.transports.Console)({
    level: LOGGING_LEVEL,
    colorize: true,
    prettyPrint: DEBUG === 'debug',
  }))

  if (process.env.PAPERTRAIL_HOST && process.env.PAPERTRAIL_PORT) {
    const papertrail = new winston.transports.Papertrail({
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

const logger = new (winston.Logger)({ transports })

module.exports = logger
