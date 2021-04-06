"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoLogger = void 0;
const logger_1 = require("./logger");
const logLevel_1 = require("./options/logLevel");
const logName = process.env.NODE_LOG_NAME || 'general.log';
const debugSymbol = process.env.NODE_LOG_SYMBOL || 'app';
const logLevel = (process.env.NODE_LOG_LEVEL) ? logLevel_1.LogLevelStr.indexOf(process.env.NODE_LOG_LEVEL) : logLevel_1.LogLevel.Info;
const applicationName = process.env.NODE_LOG_IDENTIFIER || 'application';
exports.AutoLogger = new logger_1.Logger(logName, debugSymbol, logLevel, applicationName);
//# sourceMappingURL=autoLogger.js.map