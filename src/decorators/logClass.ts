import { ILogger } from "../log-interface";
import { ClassLoggerOptions, FunctionLoggerOptions } from '../options/';
import { defaultFunctionOptions, defaultClassOptions } from '../options/default-options/';
import { getMonkeyPatchMethod } from '../options/function-logger.decorator';
import * as _ from 'lodash';

export function LogClass(logger: ILogger, options: ClassLoggerOptions = defaultClassOptions, debugSymbol?: string) {
    options.methodOptions = options.methodOptions || defaultFunctionOptions;
    return (target: any) => {
        var loggedMethodsNames = Object.getOwnPropertyNames(target.prototype);
        target.logelas = logger;
        // const loggedMethodsNames: string[] = [];
        // for (let method in target.prototype) {
        //     loggedMethodsNames.push(method);
        // }

        // const loggedMethodsNames = _.keys(target.prototype).filter((methodName: string): boolean => {
        //     return !options.loggedMethodsNames || options.loggedMethodsNames.indexOf(methodName) !== -1;
        // });
        loggedMethodsNames.forEach((methodName: string): void => {
            const originalMethod = target.prototype[methodName];
            // set by method logger decorator for disabling the method log
            if (typeof (originalMethod) !== "function" || originalMethod.__loggerMonkeyPatchCompleted === true) {
                return;
            }
            target.prototype[methodName] = getMonkeyPatchMethod(target, originalMethod, methodName, options.methodOptions as any);
        });

        // // // // let filename = '';
        // // // // if (debugSymbol) {
        // // // //     if (enabled(debugSymbol)) {
        // // // //         target.prototype.DEBUG_SYMBOL_ACTIVE = true;
        // // // //         var trace = stackTrace.get();
        // // // //         if (trace.length > 2) {
        // // // //             filename = trace[3].getFileName() + '\tline:' + trace[3].getLineNumber();
        // // // //         }
        // // // //     }
        // // // // }

        // // // // target.logelas = logger;
        // // // // // save a reference to the original constructor
        // // // // var original = target;
        // // // // methodIdentifier++;
        // // // // // the new constructor behaviour
        // // // // var f: any = function (_methodIdentifier) {
        // // // //     return function (...args: any[]) {
        // // // //         logger.trace(`${_methodIdentifier} :: new ${original.name}()`, parseArgs(args, original.prototype.constructor), filename);
        // // // //         return new original(...args);
        // // // //     }
        // // // // }(methodIdentifier);

        // // // // // copy prototype so intanceof operator still works
        // // // // f.prototype = original.prototype;
        // // // // f.logelas = logger;

        // // // // //handle the static methods
        // // // // const all = Object.getOwnPropertyNames(original)
        // // // //     .filter(prop => typeof original[prop] === 'function');

        // // // // all.forEach((key) => {
        // // // //     f[key] = original[key];

        // // // // })

        // // // // if (original.__proto__) {
        // // // //     f = recurceCopy(f, original.__proto__);
        // // // // }


        // // // // // return new constructor (will override original)
        ////// return f;
    }
}
