"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const __1 = require("../");
const logLevel_1 = require("../options/logLevel");
class logger extends __1.Logger {
    static log(...args) {
        logger.act(this.innerLogger.info, args);
    }
    static trace(...args) {
        logger.act(this.innerLogger.trace, args);
    }
    static info(...args) {
        logger.act(this.innerLogger.info, args);
    }
    static debug(...args) {
        logger.act(this.innerLogger.debug, args);
    }
    static warn(...args) {
        logger.act(this.innerLogger.warn, args);
    }
    static silly(...args) {
        logger.act(this.innerLogger.silly, args);
    }
    static error(...args) {
        logger.act(this.innerLogger.error, args);
    }
    static defineLogger(logFile, debugSymbol) {
        this.innerLogger = new __1.Logger(logFile, debugSymbol);
    }
    static act(func, args) {
        func.apply(this, args);
        this.logArray.push(args.join(" "));
    }
}
exports.logger = logger;
logger.logArray = [];
logger.innerLogger = new __1.Logger("test.log", "test", logLevel_1.LogLevel.Trace);
//# sourceMappingURL=test-logger.js.map