
import { LogLevel, LogLevelStr } from './options/logLevel';
import 'reflect-metadata';

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const ARGUMENT_NAMES = /([^\s,]+)/g;

function extractName(target: any) {
    if (!target.name && target.constructor) {
        return target.constructor.name;
    }
    return target.name;
}

export function postLogError(logger: any, target: any, error: any, propertyKey: string, _methodIdentifier: number) {
    if (logger) {
        let name = extractName(target);
        logger.error(`${_methodIdentifier} :: ${name}.${propertyKey} ## `, error.message, error.stack);
    }
}


export function preLog(target: any, propertyKey: string, args: any, logLevel: LogLevel, _methodIdentifier?: number, filename?: string) {
    let logger: any;
    let name = extractName(target);

    let method = target[propertyKey];
    if (!method) {
        method = target.prototype[propertyKey];
    }

    if (!logger && target.logelas)
        logger = target.logelas;
    if (!logger && target.constructor.logelas)
        logger = target.constructor.logelas;

    if (logger) {
        logger.__methodname = `${_methodIdentifier} :: ${name}.${propertyKey}`;
        logger[LogLevelStr[logLevel]](`${_methodIdentifier} :: ${name}.${propertyKey} => `, parseArgs(args, method), filename);
    }
    return logger;
}

export function postLog(target: any, propertyKey: string, result: any, logLevel: LogLevel, _methodIdentifier?: number, filename?: string) {

    let name = extractName(target);
    let logger = target.logelas;

    if (result && result.toString && result.toString() === '[object Promise]') {
        result.then((data: any) => {
            if (logger)
                logger[LogLevelStr[logLevel]](`${_methodIdentifier} :: ${name}.${propertyKey} <= `, data === undefined ? 'void' : data, filename);

            return data;
        })
    } else {
        if (logger)
            logger[LogLevelStr[logLevel]](`${_methodIdentifier} :: ${name}.${propertyKey} <= `, result === undefined ? 'void' : result, filename);
    }

    return result;
}

function stringify(object: any) {
    try {
        return JSON.stringify(object);
    }
    catch (error) {
        return '[circular ]';
    }

}
function parseArgs(argValues: any[], func: Function) {
    if (!argValues || argValues.length === 0) {
        return;
    }
    const fnStr = func.toString().replace(STRIP_COMMENTS, '');
    let argNames: string[] | any = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if (argNames === null)
        return [];

    const requiredArgNames = argNames;
    return requiredArgNames.map(function (argName: string): number {
        return argNames.indexOf(argName);
    }).map(function (argNameIndex: number): any {
        if (argNameIndex === -1 || argNameIndex >= argValues.length) return;
        if (typeof argValues[argNameIndex] === 'function') {
            return `${argNames[argNameIndex]} = ${argValues[argNameIndex].name}`;

        } else {

            return `${argNames[argNameIndex]} = ${stringify(argValues[argNameIndex])}`;

        }
    }).join(' | | ');
}

