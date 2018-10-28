// import { LogLevel } from "../logLevel";

// let methodIdentifier = 10000000;
// export function Log(logLevel: LogLevel = LogLevel.Trace) {
//     return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
//         // save a reference to the original method
//         let originalMethod = descriptor.value;
//         methodIdentifier++;
//         //methodType = methodType || MethodType.Local;
//         // descriptor.value =
//         //     function (_methodIdentifier: number) {
//         //         return function (...args: any[]) {


//         //             if (resolveLogLevel(target, logLevel)) {
//         //                 let filename = '';
//         //                 if (target.DEBUG_SYMBOL_ACTIVE) {
//         //                     var trace = stackTrace.get();

//         //                     if (trace.length > 1) {
//         //                         filename = trace[1].getFileName() + '\tline:' + trace[1].getLineNumber();
//         //                     }
//         //                 }
//         //                 const logger = preLog(target, propertyKey, args, logLevel, _methodIdentifier, filename);

//         //                 try {
//         //                     let result = originalMethod.call(this, ...args);

//         //                     postLog(logger, target, propertyKey, result, logLevel, _methodIdentifier, filename);
//         //                     return result;

//         //                 } catch (error) {
//         //                     postLogError(logger, target, error, propertyKey, _methodIdentifier);

//         //                     throw error;
//         //                 }

//         //             } else {

//         //                 let result = originalMethod.call(this, ...args);
//         //                 return result;
//         //             }




//         //         };
//         //     }(methodIdentifier)

//         return descriptor;
//     }
// }
