'use strict';

const winston = require('winston'),
  DEBUG = process.env.DEBUG,
  LOGGING_LEVEL = DEBUG ? 'debug' : 'info',
  transports = [];

require('winston-papertrail').Papertrail;

if (!process.env.HIDE_ALL_LOGS) {
  transports.push(new (winston.transports.Console)({
    level: LOGGING_LEVEL,
    colorize: true,
    prettyPrint: DEBUG === 'debug'
  }));

  if (process.env.PAPERTRAIL_HOST && process.env.PAPERTRAIL_PORT) {
    let hostname = process.env.PAPERTRAIL_HOSTNAME || 'API';
    let deployMode = process.env.DEPLOY_MODE || '';

    let papertrail = new winston.transports.Papertrail({
      host: process.env.PAPERTRAIL_HOST,
      port: process.env.PAPERTRAIL_PORT,
      hostname: `${hostname} ${deployMode}`.toUpperCase(),
      level: LOGGING_LEVEL,
      colorize: true
    });

    transports.push(papertrail);
  }
}

const logger = new (winston.Logger)({transports});

module.exports = logger;
