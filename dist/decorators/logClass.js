"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogClass = void 0;
const default_options_1 = require("../options/default-options/");
const function_logger_decorator_1 = require("../options/function-logger.decorator");
function LogClass(logger, options = default_options_1.defaultClassOptions, debugSymbol) {
    options.methodOptions = options.methodOptions || default_options_1.defaultFunctionOptions;
    return (target) => {
        var loggedMethodsNames = Object.getOwnPropertyNames(target.prototype);
        target.logelas = logger;
        loggedMethodsNames.forEach((methodName) => {
            const originalMethod = target.prototype[methodName];
            // set by method logger decorator for disabling the method log
            if (typeof (originalMethod) !== "function" || originalMethod.__loggerMonkeyPatchCompleted === true) {
                return;
            }
            target.__methodName = methodName;
            target.prototype[methodName] = function_logger_decorator_1.getMonkeyPatchMethod(target, originalMethod, methodName, options.methodOptions);
        });
    };
}
exports.LogClass = LogClass;
//# sourceMappingURL=logClass.js.map