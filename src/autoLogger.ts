import { Logger } from './logger'
import { LogLevel, LogLevelStr } from './logLevel'

const logName = process.env.NODE_LOG_NAME || 'general.log';
const debugSymbol = process.env.NODE_LOG_SYMBOL || 'app';
const logLevel = (process.env.NODE_LOG_LEVEL) ? LogLevelStr.indexOf(process.env.NODE_LOG_LEVEL) : LogLevel.Info;
const applicationName = process.env.NODE_LOG_IDENTIFIER || 'application';
export const AutoLogger = new Logger(logName, debugSymbol, logLevel, applicationName);
