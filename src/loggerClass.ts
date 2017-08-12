
const Log = require('log');
const logSymbols = require('log-symbols');
const fs = require('fs'), path = require('path'), mkdirp = require('mkdirp');
const logrotate = require('logrotator');
export interface ILogger {
    log(...args)
    info(...args)
    debug(...args)
    error(...args)
}
export class Logger implements ILogger {
    private debuglog: any;
    private logWriter: any;
    constructor(fileName, debugName, debugLevel: string = 'debug') {
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
        rotator.register(path.join(log_dir_file, 'methodulus.log'), { schedule: '5m', size: '1m', compress: true, count: 3 });

        rotator.on('error', function (err) {
            console.log('oops, an error occured!');
        });

        // 'rotate' event is invoked whenever a registered file gets rotated 
        rotator.on('rotate', function (file) {
            console.log('file ' + file + ' was rotated!');
        });


    }
    public log(...args) {
        this.debuglog(...args);
        let logargs = args.map(item => arg(item));
        this.logWriter.info(logSymbols.info, ...logargs);
    }
    public info(...args) {
        let logargs = args.map(item => arg(item));
        this.debuglog(...args);
        this.logWriter.info(logSymbols.success,...logargs);
    }
    public debug(...args) {
        let logargs = args.map(item => arg(item));
        this.debuglog(...args);
        this.logWriter.debug(logSymbols.info,...logargs);
    }
    public error(...args) {
        let logargs = args.map(item => arg(item));
        this.debuglog(...args);
        this.logWriter.error(logSymbols.error,...logargs);
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
                let a = JSON.stringify(singleArg);
                if (a)
                    return a.replace(/\r\n/g, '');

            } catch (error) {
                return '[circular]';
            }
    }).join(',')
}
