"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLog = exports.preLog = exports.postLogError = void 0;
const logLevel_1 = require("./options/logLevel");
require("reflect-metadata");
const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const ARGUMENT_NAMES = /([^\s,]+)/g;
function extractName(target) {
    if (!target.name && target.constructor) {
        return target.constructor.name;
    }
    return target.name;
}
function postLogError(logger, target, error, propertyKey, _methodIdentifier) {
    if (logger) {
        let name = extractName(target);
        logger.error(`${_methodIdentifier} :: ${name}.${propertyKey} ## `, error.message, error.stack);
    }
}
exports.postLogError = postLogError;
function preLog(method, target, propertyKey, args, logLevel, _methodIdentifier, filename) {
    let logger;
    let name = extractName(target);
    if (!logger && target.logelas)
        logger = target.logelas;
    if (!logger && target.constructor.logelas)
        logger = target.constructor.logelas;
    if (logger) {
        logger.__methodname = `${_methodIdentifier} :: ${name}.${propertyKey}`;
        logger[logLevel_1.LogLevelStr[logLevel]](`${_methodIdentifier} :: ${name}.${propertyKey} => `, parseArgs(args, method), filename);
    }
    return logger;
}
exports.preLog = preLog;
function postLog(target, propertyKey, result, logLevel, _methodIdentifier, filename) {
    let name = extractName(target);
    let logger = target.logelas;
    if (result && result.toString && result.toString() === '[object Promise]') {
        result.then((data) => {
            if (logger)
                logger[logLevel_1.LogLevelStr[logLevel]](`${_methodIdentifier} :: ${name}.${propertyKey} <= `, data === undefined ? 'void' : data, filename);
            return data;
        });
    }
    else {
        if (logger)
            logger[logLevel_1.LogLevelStr[logLevel]](`${_methodIdentifier} :: ${name}.${propertyKey} <= `, result === undefined ? 'void' : result, filename);
    }
    return result;
}
exports.postLog = postLog;
function stringify(object) {
    try {
        return JSON.stringify(object);
    }
    catch (error) {
        return '[circular ]';
    }
}
function parseArgs(argValues, func) {
    if (!argValues || argValues.length === 0) {
        return;
    }
    const fnStr = func.toString().replace(STRIP_COMMENTS, '');
    const slice = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')'));
    let argNames = slice.split(','); //(ARGUMENT_NAMES);
    if (argNames === null)
        return [];
    const requiredArgNames = argNames;
    return requiredArgNames.map(function (argName) {
        return argNames.indexOf(argName);
    }).map(function (argNameIndex) {
        if (argNameIndex === -1)
            return; // || argNameIndex >= argValues.length
        if (argNames[argNameIndex].indexOf('=') > -1) {
            return `${argNames[argNameIndex].trim()}`;
        }
        else if (typeof argValues[argNameIndex] === 'function') {
            return `${argNames[argNameIndex]} = ${argValues[argNameIndex].name}`;
        }
        else {
            return `${argNames[argNameIndex]} = ${stringify(argValues[argNameIndex])}`;
        }
    }).join(', ');
}
//# sourceMappingURL=loggerd.js.map