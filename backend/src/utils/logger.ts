import winston from 'winston';
import path from 'path';

let logger: winston.Logger;

export const setupLogger = (): winston.Logger => {
  if (logger) return logger;

  const logDir = process.env.LOG_DIR || 'logs';
  const logLevel = process.env.LOG_LEVEL || 'info';

  logger = winston.createLogger({
    level: logLevel,
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      winston.format.json()
    ),
    defaultMeta: { service: 'school-management-api' },
    transports: [
      new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
      new winston.transports.File({ filename: path.join(logDir, 'combined.log') }),
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.printf(({ level, message, timestamp }) => {
            return `${timestamp} [${level}]: ${message}`;
          })
        )
      })
    ]
  });

  return logger;
};

export default setupLogger;
