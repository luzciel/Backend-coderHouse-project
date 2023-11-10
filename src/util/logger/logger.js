const winston = require('winston');
const config = require("../../config/config.js");
const customLevelsOptions = require("./customLevelsOptions.js");

const addLogger = (req, res, next) => {
  if(config.NODE_ENV === 'produccion') {
    req.logger = prodLogger;
  } else {
    req.logger = devLogger;
  }
  next();

}

const prodLogger = winston.createLogger({
  level:customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize({colors: customLevelsOptions.colors}),
        winston.format.simple()
      )
    }),
    new winston.transports.File({
      filename: './errors.log',
      level: 'warn',
      format: winston.format.simple()
    })
  ]
})

const devLogger = winston.createLogger({
  level:customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize({colors: customLevelsOptions.colors}),
        winston.format.simple()
      )
    })
  ]
})



module.exports = addLogger
