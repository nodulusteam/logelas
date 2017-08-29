import { ILogger, Logger } from '../index';

export class logger extends Logger implements ILogger {
    public static logArray: string[] = [];
    static innerLogger: Logger;
    public static log(...args) {

        if (typeof (args[0]) === 'function') {
            args[0] = args[0].name;
        }else if (typeof (args[0]) === 'object') {
            args[0] = args[0].constructor.__methodname;

        }
        this.log(...args);

        this.innerLogger.info(...args);
        this.logArray.push(args.join(' '));
    }
    public static info(...args) {
        this.logArray.push(args.join(' '));
        this.innerLogger.info(...args);
    }
    public static debug(...args) {
        this.logArray.push(args.join(' '));
        this.innerLogger.debug(...args);
    }
    public static warn(...args) {
        this.logArray.push(args.join(' '));
        this.innerLogger.warn(...args);
    }
    public static error(...args) {
        this.logArray.push(args.join(' '));
        this.innerLogger.error(...args);
    }
    public static defineLogger(logFile, debugSymbol) {
        this.innerLogger = new Logger(logFile, debugSymbol);
    }

}

logger.innerLogger = new Logger('alog.log', 'test').truncate();