import { ILogger, Logger } from '../';
import { LogLevel } from '../options/logLevel';

export class logger extends Logger implements ILogger {
    public static logArray: string[] = [];
    static innerLogger: Logger;

    public static log(...args) {
        logger.act(this.innerLogger.info, args);
    }
    public static trace(...args) {
        logger.act(this.innerLogger.trace, args);
    }

    public static info(...args) {
        logger.act(this.innerLogger.info, args);
    }
    public static debug(...args) {
        logger.act(this.innerLogger.debug, args);
    }
    public static warn(...args) {
        logger.act(this.innerLogger.warn, args);
    }
    public static silly(...args) {
        logger.act(this.innerLogger.silly, args);
    }
    public static error(...args) {
        logger.act(this.innerLogger.error, args);
    }
    public static defineLogger(logFile, debugSymbol) {
        this.innerLogger = new Logger(logFile, debugSymbol);
    }
    public static act(func, args) {
        func(...args);
        this.logArray.push(args.join(' '));
    }

}

logger.innerLogger = new Logger('test.log', 'test', LogLevel.Trace);