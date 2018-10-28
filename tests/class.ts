import { AutoLogger, Log, LogClass } from '../'
import { logger } from './test-logger'


@LogClass(AutoLogger)
export class Controller {

    constructor() {

    }

   
    public action1(min, max) {
        return min * max;
    }

    
    public action2(min, max) {
        AutoLogger.log(this, 'a message from inside the method');
        return this.action1(min, max);
    }
}