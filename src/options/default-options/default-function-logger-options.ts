import { FunctionLoggerOptions } from '../function-logger-options.interface';

export const defaultFunctionOptions: FunctionLoggerOptions = {
  withArgs: true,
  withTime: true,
  withClassProperties: true,
  logFunction: console.info
};