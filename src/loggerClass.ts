
const Log = require('../npm/log');
const logSymbols = require('log-symbols');
const fs = require('fs'), path = require('path'), mkdirp = require('mkdirp');
const logrotate = require('logrotator');


export enum debugLevel {
    debug = 1,
    info = 2,
    warn = 3,
    error = 4
}
export interface ILogger {
    log(...args)
    info(...args)
    debug(...args)
    warn(...args)
    error(...args)
}
export class Logger implements ILogger {
    private debuglog: any;
    private logWriter: any;
    constructor(fileName, debugName, debugLevel?: debugLevel) {
        this.debuglog = require('debug')(debugName);

        var log;
        var log_dir_file = '';
        const rotator = logrotate.rotator;
        if (process.env.NODE_LOG_DIR) {
            log_dir_file = path.normalize(process.env.NODE_LOG_DIR);
        }
        else
            log_dir_file = './logs';
        if (!fs.existsSync(log_dir_file)) {
            // Create the directory if it does not exist
            mkdirp(log_dir_file, function (err) {
                if (err) console.error(err)
                else {
                }
            });
        }
        this.logWriter = new Log(debugLevel, fs.createWriteStream(path.join(log_dir_file, fileName), { flags: 'a' }));
        // check file rotation every 5 minutes, and rotate the file if its size exceeds 10 mb. 
        // keep only 3 rotated files and compress (gzip) them. 
        rotator.register(path.join(log_dir_file, fileName), { schedule: '5m', size: '1m', compress: true, count: 3 });

        rotator.on('error', function (err) {
            console.log('oops, an error occured!');
        });

        // 'rotate' event is invoked whenever a registered file gets rotated 
        rotator.on('rotate', function (file) {
            console.log('file ' + file + ' was rotated!');
        });


    }
    private handleMethodName(informationElement) {
        if (typeof (informationElement) === 'function') {
            informationElement = informationElement.name;
        } else if (informationElement.constructor && informationElement.constructor.logelas) {
            informationElement = informationElement.constructor.logelas.__methodname;

        }
    }


    @MethodName()
    public log(...args) {
        this.debuglog(...args);
        let logargs = args.map(item => arg(item));
        this.logWriter.info(logSymbols.success, ...logargs);
    }

    @MethodName()
    public info(...args) {
        let level = 2;
        if (level >= debugLevel.info) {
            let logargs = args.map(item => arg(item));
            this.debuglog(...args);
            this.logWriter.info(logSymbols.success, ...logargs);
        }

    }

    @MethodName()
    public warn(...args) {
        let level = 3;
        if (level >= debugLevel.warn) {
            let logargs = args.map(item => arg(item));
            this.debuglog(...args);
            this.logWriter.warning(logSymbols.warning, ...logargs);
        }

    }

    @MethodName()
    public debug(...args) {
        let level = 1;
        if (level >= debugLevel.debug) {
            let logargs = args.map(item => arg(item));
            this.debuglog(...args);
            this.logWriter.debug(logSymbols.info, ...logargs);
        }
    }

    @MethodName()
    public error(...args) {
        let level = 4;
        if (level >= debugLevel.error) {
            let logargs = args.map(item => arg(item));
            this.debuglog(...args);
            this.logWriter.error(logSymbols.error, ...logargs);
        }
    }

}

function arg(item: any) {

    let arr: any = [];
    if (Array.isArray(item))
        arr = arr.concat(item);
    else
        arr.push(item);

    return arr.map(singleArg => {
        if (singleArg)
            try {
                if (typeof singleArg === 'function')
                    return `func ${singleArg.name}`;
                let a = typeof singleArg === 'string' ? singleArg : JSON.stringify(singleArg);
                if (a)
                    return a.replace(/\r\n/g, '');

            } catch (error) {
                return '[circular]';
            }
    }).join(',')
}



export function MethodName(logger?: ILogger) {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        let originalMethod = descriptor.value;
        descriptor.value =

            function (...args: any[]) {
                let informationElement = args[0];
                if (typeof (informationElement) === 'function') {
                    informationElement = informationElement.name + '  ';
                    args[0] = informationElement;
                } else if (informationElement.constructor && informationElement.constructor.logelas) {
                    informationElement = informationElement.constructor.logelas.__methodname;
                    args[0] = informationElement + '  ';
                }

                let result = originalMethod.call(this, ...args);
            }

        return descriptor;
    }
}
