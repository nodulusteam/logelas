export interface ILogger {
    log(...args: any[]): void;
    info(...args: any[]): void;
    debug(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
    trace(...args: any[]): void;
    silly(...args: any[]): void;
}
