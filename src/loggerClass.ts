import { ILogger } from './log-interface';
import { LogLevel } from './options/logLevel';
import { EventEmitter } from 'events';

const logToConsole = {
    'warning': 'warn',
    'error': 'error',
    'silly': 'log',
    'info': 'info',
    'trace': 'log',
    'log': 'log',
}


export class Logger extends EventEmitter implements ILogger {
    private debuglog: any;
    level: any;

    private _applicationName: string;
    constructor(public fileName: string, debugName: string, logLevel: LogLevel = LogLevel.Info, applicationName?: string) {
        super();

        this.debuglog = require('debug')(debugName);
        this._applicationName = applicationName || 'application';
        if (process.env.NODE_LOG_CONSOLE === 'true') {
            this.on(fileName, (data: any) => {
                const line = Object.keys(data).map((key) => {
                    if (key !== 'level' && key !== 'name') {
                        return data[key];
                    } else {
                        return '';
                    }
                }).reverse().join(' ');
                try {
                    console[logToConsole[data.level]](line);
                } catch (e) {
                    console.error(e);
                    console.log(line);
                }

            });
        }
        this.level = logLevel;
    }

    public close() {
        return true;

    }
    public produce(level: any, ...args: any[]) {
        const logargs = args.map(item => arg(item));
        this.debuglog(...args);
        this.emit(this.fileName, { level, name: this._applicationName, ...logargs });

    }

    public log(...args: any[]) {
        this.trace(...args);
    }


    public info(...args: any[]) {
        if (LogLevel.Info <= this.level) {
            this.produce('info', ...args);
        }
    }


    public warn(...args: any[]) {
        if (LogLevel.Warn <= this.level) {
            this.produce('warning', ...args);
        }
    }


    public debug(...args: any[]) {
        this.trace(...args);
    }


    public error(...args: any[]) {
        console.error(JSON.stringify(args));
        this.produce('error', ...args);
    }



    public trace(...args: any[]) {
        if (LogLevel.Trace <= this.level) {
            this.produce('trace', ...args);
        }
    }


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


