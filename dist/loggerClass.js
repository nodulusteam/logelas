"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const logLevel_1 = require("./options/logLevel");
const events_1 = require("events");
const logToConsole = {
    'warning': 'warn',
    'error': 'error',
    'silly': 'log',
    'info': 'info',
    'trace': 'log',
    'log': 'log',
};
class Logger extends events_1.EventEmitter {
    constructor(fileName, debugName, logLevel = logLevel_1.LogLevel.Info, applicationName) {
        super();
        this.fileName = fileName;
        this.debuglog = require('debug')(debugName);
        this._applicationName = applicationName || 'application';
        if (process.env.NODE_LOG_CONSOLE === 'true') {
            this.on(fileName, (data) => {
                const line = Object.keys(data).map((key) => {
                    if (key !== 'level' && key !== 'name') {
                        return data[key];
                    }
                    else {
                        return '';
                    }
                }).join(' ');
                try {
                    console[logToConsole[data.level]](line);
                }
                catch (e) {
                    console.error(e);
                }
            });
        }
        this.level = logLevel;
    }
    close() {
        return true;
    }
    produce(level, ...args) {
        const logargs = args.map(item => arg(item));
        this.debuglog(...logargs);
        const logMessage = Object.assign({ level, system_id: null, name: this._applicationName }, logargs);
        this.emit(this.fileName, logMessage);
    }
    log(...args) {
        this.trace(...args);
    }
    info(...args) {
        if (logLevel_1.LogLevel.Info <= this.level) {
            this.produce('info', ...args);
        }
    }
    warn(...args) {
        if (logLevel_1.LogLevel.Warn <= this.level) {
            this.produce('warning', ...args);
        }
    }
    debug(...args) {
        this.trace(...args);
    }
    error(...args) {
        if (!process.env.NO_CONSOLE) {
            console.error(args);
        }
        this.produce('error', ...args);
    }
    trace(...args) {
        if (logLevel_1.LogLevel.Trace <= this.level) {
            this.produce('trace', ...args);
        }
    }
    silly(...args) {
        this.trace(...args);
    }
}
exports.Logger = Logger;
function arg(singleArg) {
    if (singleArg)
        try {
            if (typeof singleArg === 'function')
                return `func ${singleArg.name}`;
            if (singleArg.stack && singleArg.message) {
                let a = { stack: singleArg.stack, message: singleArg.message };
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
        }
        catch (error) {
            return '[circular]';
        }
    return '';
}
//# sourceMappingURL=loggerClass.js.map