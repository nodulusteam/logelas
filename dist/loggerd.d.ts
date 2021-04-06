import { LogLevel } from './options/logLevel';
import 'reflect-metadata';
export declare function postLogError(logger: any, target: any, error: any, propertyKey: string, _methodIdentifier: number): void;
export declare function preLog(method: any, target: any, propertyKey: string, args: any, logLevel: LogLevel, _methodIdentifier?: number, filename?: string): any;
export declare function postLog(target: any, propertyKey: string, result: any, logLevel: LogLevel, _methodIdentifier?: number, filename?: string): any;
