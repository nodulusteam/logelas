"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisableMethodLogger = exports.getMonkeyPatchMethod = void 0;
const loggerd_1 = require("../loggerd");
const logLevel_1 = require("./logLevel");
let methodIdentifier = 10000000;
const disableMethodLogger = function () {
    return function (target, methodName, descriptor) {
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, methodName);
        }
        var originalMethod = descriptor.value;
        originalMethod.__loggerMonkeyPatchCompleted = true;
        return descriptor;
    };
};
const getMonkeyPatchMethod = function (target, method, methodName, options) {
    methodIdentifier++;
    const _methodIdentifier = methodIdentifier;
    return function (...args) {
        loggerd_1.preLog(method, target, methodName, args, options.logLevel || logLevel_1.LogLevel.Trace, _methodIdentifier);
        const result = method.apply(this, args);
        loggerd_1.postLog(target, methodName, result, options.logLevel || logLevel_1.LogLevel.Trace, _methodIdentifier);
        return result;
    };
};
exports.getMonkeyPatchMethod = getMonkeyPatchMethod;
function DisableMethodLogger() {
    return disableMethodLogger();
}
exports.DisableMethodLogger = DisableMethodLogger;
//# sourceMappingURL=function-logger.decorator.js.map