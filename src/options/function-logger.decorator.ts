import { FunctionLoggerOptions } from './function-logger-options.interface';
import { preLog, postLog } from '../loggerd';
import { LogLevel } from './logLevel';
let methodIdentifier = 10000000;

const disableMethodLogger = function (): Function {
  return function (target: any, methodName: string, descriptor: any) {
    if (descriptor === undefined) {
      descriptor = Object.getOwnPropertyDescriptor(target, methodName);
    }

    var originalMethod = descriptor.value;
    originalMethod.__loggerMonkeyPatchCompleted = true;
    return descriptor;
  };
};

export const getMonkeyPatchMethod = function (target: any, method: Function, methodName: string, options: FunctionLoggerOptions): Function {
  methodIdentifier++
  const _methodIdentifier = methodIdentifier;
  return function (...args: any) {
    preLog(target, methodName, args, options.logLevel || LogLevel.Trace, _methodIdentifier);
    const result = method.apply(this, args);
    postLog(target, methodName, result, options.logLevel || LogLevel.Trace, _methodIdentifier);
    return result;
  };
};

export function DisableMethodLogger(): Function {
  return disableMethodLogger();
}