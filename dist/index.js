"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoLogger = exports.Logger = exports.LogClass = exports.LogLevel = void 0;
global.logelas = global.logelas || [];
var logLevel_1 = require("./options/logLevel");
Object.defineProperty(exports, "LogLevel", { enumerable: true, get: function () { return logLevel_1.LogLevel; } });
var decorators_1 = require("./decorators/");
Object.defineProperty(exports, "LogClass", { enumerable: true, get: function () { return decorators_1.LogClass; } });
var loggerClass_1 = require("./loggerClass");
Object.defineProperty(exports, "Logger", { enumerable: true, get: function () { return loggerClass_1.Logger; } });
var auto_1 = require("./auto");
Object.defineProperty(exports, "AutoLogger", { enumerable: true, get: function () { return auto_1.AutoLogger; } });
__exportStar(require("./cleaner"), exports);
//# sourceMappingURL=index.js.map