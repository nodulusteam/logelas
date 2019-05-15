import { ILogger } from "../log-interface";
import { ClassLoggerOptions } from '../options/';
import { defaultFunctionOptions, defaultClassOptions } from '../options/default-options/';
import { getMonkeyPatchMethod } from '../options/function-logger.decorator';


export function LogClass(logger: ILogger, options: ClassLoggerOptions = defaultClassOptions, debugSymbol?: string) {
    options.methodOptions = options.methodOptions || defaultFunctionOptions;
    return (target: any) => {
        var loggedMethodsNames = Object.getOwnPropertyNames(target.prototype);
        target.logelas = logger;
        loggedMethodsNames.forEach((methodName: string): void => {
            const originalMethod = target.prototype[methodName];
            // set by method logger decorator for disabling the method log
            if (typeof (originalMethod) !== "function" || originalMethod.__loggerMonkeyPatchCompleted === true) {
                return;
            }
            target.__methodName = methodName;
            target.prototype[methodName] = getMonkeyPatchMethod(target, originalMethod, methodName, options.methodOptions as any);
        });

    }
}
