import { Logger } from './loggerClass'
import { ILogger } from './log-interface';
import { LogLevel, LogLevelStr } from './logLevel';
import 'reflect-metadata';

var stackTrace = require('stack-trace');
let methodIdentifier: number = 100000;
const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const ARGUMENT_NAMES = /([^\s,]+)/g;
const namespaces = process.env.DEBUG;

const names: Array<any> = [];
const skips: Array<any> = [];

function enable(namespaces: any) {
    //exports.save(namespaces);
    var i;
    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    var len = split.length;

    for (i = 0; i < len; i++) {
        if (!split[i]) continue; // ignore empty strings
        namespaces = split[i].replace(/\*/g, '.*?');
        if (namespaces[0] === '-') {
            skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
        } else {
            names.push(new RegExp('^' + namespaces + '$'));
        }
    }
    // for (i = 0; i < exports.instances.length; i++) {
    //   var instance = exports.instances[i];
    //   instance.enabled = exports.enabled(instance.namespace);
    // }
}

enable(namespaces);


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

function resolveLogLevel(target: any, logLevel: LogLevel) {
    let logger;

    if (!logger && target.logelas)
        logger = target.logelas;
    if (!logger && target.constructor.logelas)
        logger = target.constructor.logelas;

    if (logger && logger.logWriter) {
        return logLevel <= logger.logWriter.level;
    } else {
        return true;
    }




}

export function preLog(target: any, propertyKey: string, args: any, logLevel: LogLevel, _methodIdentifier?: number, filename?: string) {
    let logger;
    let name = extractName(target);


    if (!logger && target.logelas)
        logger = target.logelas;
    if (!logger && target.constructor.logelas)
        logger = target.constructor.logelas;

    if (logger) {
        (logger as any).__methodname = `${_methodIdentifier} :: ${name}.${propertyKey}`;
        logger[LogLevelStr[logLevel]](`${_methodIdentifier} :: ${name}.${propertyKey} => `, parseArgs(args, target[propertyKey]), filename);
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
            return `${argNames[argNameIndex]} = ${argValues[argNameIndex].name}`;//{ [argNames[argNameIndex]]: argValues[argNameIndex] }

        } else {

            return `${argNames[argNameIndex]} = ${stringify(argValues[argNameIndex])}`;//{ [argNames[argNameIndex]]: argValues[argNameIndex] }

        }
    }).join(' | | ');
}





// export function LogParam(name?: string) {
//     return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
//         // let existingMetadata: any[] = Reflect.getOwnMetadata(metadataKey, target, propertyKey) || [];
//         // if (name)
//         //     existingMetadata.push({ from: 'body', index: parameterIndex, name: name });
//         // else
//         //     existingMetadata.push({ from: 'body', index: parameterIndex });

//         // Reflect.defineMetadata(metadataKey, existingMetadata, target, propertyKey);
//     }
// }



const excludeList = ['apply', 'bind', 'call', 'toString', 'constructor', 'caller', 'arguments'];
function recurceCopy(f: any, original: any) {
    if (!original)
        return f;

    const all = Object.getOwnPropertyNames(original)
        .filter(prop => {
            try {
                return excludeList.indexOf(prop) === -1 && typeof original[prop] === 'function';
            } catch (error) {
                return false;
            }
        });


    all.forEach((key) => {
        f[key] = original[key];

    });

    if (original.__proto__) {
        f = recurceCopy(f, original.__proto__);
    }
    return f;

}




/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */



function enabled(name: string) {

    if (name[name.length - 1] === '*') {
        return true;
    }
    var i, len;
    for (i = 0, len = skips.length; i < len; i++) {
        if (skips[i].test(name)) {
            return false;
        }
    }
    for (i = 0, len = names.length; i < len; i++) {
        if (names[i].test(name)) {
            return true;
        }
    }
    return false;
}
