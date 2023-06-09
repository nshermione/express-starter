import dayjs from 'dayjs';
import * as winston from 'winston';

const customLogFormat = winston.format.printf(({ level, message, label, timestamp, stack }) => {
  const errorStack = stack ? `\n${stack.replace(/file:\/\/\//g, '')}`: '';
  return `${dayjs(timestamp).format('YYYY-MM-DDTHH:mm:ss')} [${label}] ${level}: ${message} ${errorStack}`;
});

export class Logger {
  static get(className) {
    const logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.label({ label: className }),
        winston.format.errors({ stack: true }),
        winston.format.timestamp(),
        winston.format.colorize(),
        customLogFormat
      ),
      level: process.env.LOG_LEVEL,
      transports: [
          new winston.transports.Console()
      ],

    });
    
    return logger;
  }
}