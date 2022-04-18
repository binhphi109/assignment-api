import winston, { Logger } from "winston";
import { consoleFormat } from "winston-console-format";
import util from "util";
import config from "../config";

var logger: Logger;

var options = {
  console: {
    level: "info",
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      winston.format.padLevels(),
      consoleFormat({
        showMeta: true,
        metaStrip: ["timestamp", "service"],
        inspectOptions: {
          depth: Infinity,
          colors: true,
          maxArrayLength: Infinity,
          breakLength: 120,
          compact: Infinity,
        },
      })
    )
  },
};

//Default transports
var transports = [new winston.transports.Console(options.console)];

function init() {
  logger = winston.createLogger({
    transports,
    exitOnError: false,
  });

  console.log = function () {
    logger.info.apply(logger, [Array.prototype.slice.call(arguments)]);
  };
  console.info = function () {
    logger.info.apply(logger, [Array.prototype.slice.call(arguments)]);
  };
  console.warn = function () {
    logger.warn.apply(logger, [Array.prototype.slice.call(arguments)]);
  };
  console.error = function () {
    logger.error.apply(logger, [Array.prototype.slice.call(arguments)]);
  };
  console.debug = function () {
    logger.debug.apply(logger, [Array.prototype.slice.call(arguments)]);
  };

  return logger;
}

export class LoggerStream {
  write(message: string) {
    if (logger) {
      logger.info(message);
    }
  }
}

export default {
  init,
};
