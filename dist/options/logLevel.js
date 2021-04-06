"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogLevelStr = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["System"] = 2] = "System";
    LogLevel[LogLevel["Error"] = 3] = "Error";
    LogLevel[LogLevel["Warn"] = 4] = "Warn";
    LogLevel[LogLevel["Info"] = 5] = "Info";
    LogLevel[LogLevel["Trace"] = 6] = "Trace";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
exports.LogLevelStr = ['', 'log', 'system', 'error', 'warn', 'info', 'trace'];
//# sourceMappingURL=logLevel.js.map