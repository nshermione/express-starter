import dayjs from 'dayjs';
import * as winston from 'winston';

const customLogFormat = winston.format.printf(({ level, message, label, timestamp }) => {
  return `${dayjs(timestamp).format('YYYY-MM-DDTHH:mm:ss')} [${label}] ${level}: ${message}`;
});

export class Logger {
  static get(className) {
    const logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.label({ label: className }),
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