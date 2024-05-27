const winston = require("winston");
const morgan = require("morgan");

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

const logger = winston.createLogger({
  levels: logLevels,
  transports: [new winston.transports.Console()],
});

const customMorgan = morgan("dev", {
  stream: {
    write: (message) => logger.info(message.replace(/\u001b\[[0-9]{1,2}m/g, "")),
  },
});

module.exports = { logger, customMorgan };
