import { FunctionLoggerOptions } from './function-logger-options.interface';
export declare const getMonkeyPatchMethod: (target: any, method: Function, methodName: string, options: FunctionLoggerOptions) => Function;
export declare function DisableMethodLogger(): Function;
