import { ILogger } from "../log-interface";
import { ClassLoggerOptions } from '../options/';
export declare function LogClass(logger: ILogger, options?: ClassLoggerOptions, debugSymbol?: string): (target: any) => void;
