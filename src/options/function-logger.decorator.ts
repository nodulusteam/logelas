import { FunctionLoggerOptions } from './function-logger-options.interface';
import { defaultFunctionOptions } from './default-options/default-function-logger-options';
import { logMessage } from '../messages.helper';
import { ILogger } from '../log-interface';
import { preLog, postLog, postLogError } from '../loggerd';
import { LogLevel } from '../logLevel';
let methodIdentifier = 10000000;


// const logger = function (options = defaultFunctionOptions): Function {
//   return function (target, methodName: string, descriptor) {
//     if (descriptor === undefined) {
//       descriptor = Object.getOwnPropertyDescriptor(target, methodName);
//     }

//     var originalMethod = descriptor.value;

//     descriptor.value = getMonkeyPatchMethod(originalMethod, methodName, options);
//     descriptor.value.__loggerMonkeyPatchCompleted = true;

//     return descriptor;
//   };
// };

const disableMethodLogger = function (): Function {
  return function (target, methodName: string, descriptor) {
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
  return function (...args) {

    preLog(target, methodName, args, options.logLevel || LogLevel.Trace, _methodIdentifier);

    // logMessage(true, this, methodName, method, args, options);
    const result = method.apply(this, args);

    postLog(target, methodName, result, options.logLevel || LogLevel.Trace, _methodIdentifier);

    //logMessage(false, this, methodName, method, args, options);

    return result;
  };
};

// export function Logger(options = defaultFunctionOptions): Function {
//   return logger(options);
// }

// export function LoggerWithoutArgs(options = defaultFunctionOptions): Function {
//   options = Object.assign({}, options, {
//     withArgs: false
//   });

//   return Logger(options);
// }

export function DisableMethodLogger(): Function {
  return disableMethodLogger();
}