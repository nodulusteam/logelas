import { AutoLogger, Log, LogClass } from '../'
import { logger } from './test-logger'


@LogClass(AutoLogger)
export class Controller {

    constructor() {

    }

    @Log()
    public action1(min, max) {
        return min * max;
    }

    @Log()
    public action2(min, max) {
        logger.log(this, 'a message from inside the method');
        return this.action1(min, max);
    }
}