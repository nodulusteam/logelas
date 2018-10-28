
const Log = require('../npm/log');
const ParentLog = require('../npm/parentlog');
const ConsoleLog = require('../npm/consolelog');
const SilentLog = require('../npm/silentlog');



const fs = require('fs'), path = require('path'), mkdirp = require('mkdirp');
const logrotate = require('logrotator');
import { ILogger } from './log-interface';
import { MethodName } from './decorators/methodName';
import { LogLevel, LogLevelStr } from './logLevel';
import { EventEmitter } from 'events';




export class Logger extends EventEmitter implements ILogger {
    private debuglog: any;
    private logWriter: any;
    private _fileName: string;
    private _applicationName: string;
    constructor(fileName: string, debugName: string, logLevel: LogLevel = LogLevel.Info, applicationName?: string) {
        super();

        this.debuglog = require('debug')(debugName);
        this._applicationName = applicationName || 'application';
        var log;
        var log_dir_file = '';
        const rotator = logrotate.rotator;





        var outputDevice = null;
        // if (process.env.NODE_LOG_CONSOLE === 'true') {

        //     this.on('logEvent1', (data: any) => {
        //         console.log(data);
        //     })

        // }
        if (process.env.NODE_LOG_DIR) {
            log_dir_file = path.normalize(process.env.NODE_LOG_DIR);

        }
        else
            log_dir_file = './logs';


        if (process.env.NODE_LOG_CONSOLE !== 'true' && process.env.NODE_LOG_SILENT !== 'true') {
            if (!fs.existsSync(log_dir_file)) {
                // Create the directory if it does not exist
                mkdirp(log_dir_file, function (err: any) {
                    if (err) console.error(err)

                });
            }
        }


        (global as any).tmla = (global as any).tmla || {};
        (global as any).tmla.globalLoggers = (global as any).tmla.globalLoggers || {};
        let globalLoggers = (global as any).tmla.globalLoggers;
        this._fileName = path.join(log_dir_file, fileName);






        if (!globalLoggers[this._fileName]) {
            globalLoggers[this._fileName] = [];
            if (process.env.NODE_LOG_SILENT) {
                globalLoggers[this._fileName].push(new SilentLog(logLevel));
            } else {
                globalLoggers[this._fileName].push(new Log(logLevel, fs.createWriteStream(this._fileName, { flags: 'a' })));


                // keep only 3 rotated files and compress (gzip) them.
                rotator.register(this._fileName, { schedule: '5m', size: '1m', compress: false, count: 10 });

                rotator.on('error', function (err: any) {
                    console.log('oops, an error occured!', err);
                });

                // 'rotate' event is invoked whenever a registered file gets rotated
                rotator.on('rotate', function (file: string) {
                    //console.log('file ' + file + ' was rotated!');
                });
            }


            if (process.env.NODE_LOG_CONSOLE === 'true') {
                globalLoggers[this._fileName].push(new ConsoleLog(logLevel));
            }

            //globalLoggers[this._fileName] = this.logWriter;
            this.logWriter = new ParentLog(globalLoggers[this._fileName], logLevel);

        }
        else {
            this.logWriter = new ParentLog(globalLoggers[this._fileName], logLevel);
        }





    }


    //  @MethodName()
    public log(...args: any[]) {
        this.debuglog(...args);
        let logargs = args.map(item => arg(item));
        this.emit('logEvent1', { level: 'trace', name: this._applicationName, ...logargs });
        this.logWriter.trace(this._applicationName, ...logargs);
    }

    // @MethodName()
    public info(...args: any[]) {
        if (LogLevel.Info <= this.logWriter.level) {
            let logargs = args.map(item => arg(item));
            this.debuglog(...args);
            this.emit('logEvent1', { level: 'info', name: this._applicationName, ...logargs });
            this.logWriter.info(this._applicationName, ...logargs);
        }

    }

    // @MethodName()
    public warn(...args: any[]) {
        if (LogLevel.Warn <= this.logWriter.level) {
            let logargs = args.map(item => arg(item));
            this.debuglog(...args);
            this.emit('logEvent1', { level: 'warning', name: this._applicationName, ...logargs });
            this.logWriter.warning(this._applicationName, ...logargs);
        }

    }

    //@MethodName()
    public debug(...args: any[]) {
        if (LogLevel.Info <= this.logWriter.level) {
            let logargs = args.map(item => arg(item));
            this.debuglog(...args);
            this.emit('logEvent1', { level: 'debug', name: this._applicationName, ...logargs });
            this.logWriter.debug(this._applicationName, ...logargs);
        }
    }

    //@MethodName()
    public error(...args: any[]) {

        let logargs = args.map(item => arg(item));
        this.debuglog(...args);
        this.emit('logEvent1', { level: 'error', name: this._applicationName, ...logargs });
        this.logWriter.error(this._applicationName, ...logargs);

        //output the error the the console too.
        console.error(...logargs)
    }


    //@MethodName()
    public trace(...args: any[]) {
        if (LogLevel.Trace <= this.logWriter.level) {
            let logargs = args.map(item => arg(item));
            this.debuglog(...args);
            this.emit('logEvent1', { level: 'trace', name: this._applicationName, ...logargs });
            this.logWriter.trace(this._applicationName, ...logargs);
        }
    }


    // @MethodName()
    public silly(...args: any[]) {
        if (LogLevel.Trace <= this.logWriter.level) {
            let logargs = args.map(item => arg(item));
            this.debuglog(...args);
            this.emit('logEvent1', { level: 'silly', name: this._applicationName, ...logargs });
            this.logWriter.silly(this._applicationName, ...logargs);
        }
    }

    public truncate() {
        fs.truncateSync(this._fileName, 0);
        return this;
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


