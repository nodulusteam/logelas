import { LogClass } from '../'
import { logger } from './test-logger';


@LogClass(logger)
export class Controller {
    constructor() {
    }

    public action1(min: number, max: number) {
        return min * max;
    }

    public async action2(min: number, max: number) {
        logger.log(this, 'a log message from inside the method');
        return this.action1(min, max);
    }

    public async action3(min: number, max: number) {
        logger.warn(this, 'a warn message from inside the method');
        return this.action1(min, max);
    }

    public async action4(min: number, max: number) {
        logger.info(this, 'an info message from inside the method');
        return this.action1(min, max);
    }

}