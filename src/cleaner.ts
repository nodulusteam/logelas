import { AutoLogger } from "./autoLogger";

export function closeLogs() {


    AutoLogger.removeAllListeners();
    AutoLogger.close();

    global.logelas.forEach((logger) => {
        logger.removeAllListeners();
        logger.close();
    });


}