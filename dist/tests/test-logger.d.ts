import { ILogger, Logger } from "../";
export declare class logger extends Logger implements ILogger {
    static logArray: string[];
    static innerLogger: Logger;
    static log(...args: any): void;
    static trace(...args: any): void;
    static info(...args: any): void;
    static debug(...args: any): void;
    static warn(...args: any): void;
    static silly(...args: any): void;
    static error(...args: any): void;
    static defineLogger(logFile: string, debugSymbol: string): void;
    static act(func: any, args: any): void;
}
