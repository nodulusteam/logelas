/// <reference types="node" />
import { ILogger } from './log-interface';
import { LogLevel } from './options/logLevel';
import { EventEmitter } from 'events';
export declare class Logger extends EventEmitter implements ILogger {
    fileName: string;
    private debuglog;
    level: any;
    private _applicationName;
    constructor(fileName: string, debugName: string, logLevel?: LogLevel, applicationName?: string);
    close(): boolean;
    produce(level: any, ...args: any[]): void;
    log(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    debug(...args: any[]): void;
    error(...args: any[]): void;
    trace(...args: any[]): void;
    silly(...args: any[]): void;
}
