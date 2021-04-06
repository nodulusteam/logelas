"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeLogs = void 0;
const autoLogger_1 = require("./autoLogger");
function closeLogs() {
    autoLogger_1.AutoLogger.removeAllListeners();
    autoLogger_1.AutoLogger.close();
    global.logelas.forEach((logger) => {
        logger.removeAllListeners();
        logger.close();
    });
}
exports.closeLogs = closeLogs;
//# sourceMappingURL=cleaner.js.map