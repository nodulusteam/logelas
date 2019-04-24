



import { ILogger } from './log-interface';
import { MethodName } from './decorators/methodName';
import { LogLevel } from './options/logLevel';
import { EventEmitter } from 'events';




export class Logger extends EventEmitter implements ILogger {
    private debuglog: any;
    private logWriter: any;

    private _applicationName: string;
    constructor(public fileName: string, debugName: string, logLevel: LogLevel = LogLevel.Info, applicationName?: string) {
        super();

        this.debuglog = require('debug')(debugName);
        this._applicationName = applicationName || 'application';
        if (process.env.NODE_LOG_CONSOLE === 'true') {
            this.on(fileName, (data: any) => {
                console.log(data);
            });
        }
        this.logWriter = { level: logLevel };// new ParentLog(logLevel);
    }

    public close() {
        this.logWriter = null;

    }
    public produce(level, ...args: any[]) {
        const logargs = args.map(item => arg(item));
        this.debuglog(...args);
        this.emit(this.fileName, { level, name: this._applicationName, ...logargs });

    }
    @MethodName()
    public log(...args: any[]) {
        this.produce('trace', ...args);
    }

    @MethodName()
    public info(...args: any[]) {
        if (LogLevel.Info <= this.logWriter.level) {
            this.produce('info', ...args);
        }
    }

    @MethodName()
    public warn(...args: any[]) {
        if (LogLevel.Warn <= this.logWriter.level) {
            this.produce('warning', ...args);
        }
    }

    @MethodName()
    public debug(...args: any[]) {
        if (LogLevel.Trace <= this.logWriter.level) {
            this.produce('debug', ...args);
        }
    }

    @MethodName()
    public error(...args: any[]) {
        this.produce('error', ...args);
    }


    @MethodName()
    public trace(...args: any[]) {
        this.produce('trace', ...args);

    }


    @MethodName()
    public silly(...args: any[]) {
        this.trace(...args);
    }
}


function arg(singleArg: any) {


    if (singleArg)
        try {
            if (typeof singleArg === 'function')
                return `func ${singleArg.name}`;

            if (singleArg.stack && singleArg.message) {
                let a = { stack: singleArg.stack, message: singleArg.message }
                return JSON.stringify(a);
            }
            else if (typeof singleArg === 'object') {
                return JSON.stringify(singleArg);
            }
            else {
                // let a = typeof singleArg === 'string' ? singleArg : JSON.stringify(singleArg);
                // if (a.length && a.length > 200)
                //     a = a.substr(0, 200);
                if (typeof singleArg === 'string') {
                    return singleArg.replace(/\r\n/g, '');
                }
                return singleArg;
            }
        } catch (error) {
            return '[circular]';
        }
    return '';
}


