import { LogClass } from '../'
import { logger } from './test-logger';


@LogClass(logger)
export class Controller {

    constructor() {

    }


    public action1(min, max) {
        return min * max;
    }



    public async action2(min, max) {
        logger.log(this, 'a message from inside the method');
        return this.action1(min, max);
    }

    public async action3(min, max) {
        logger.log(this, 'a message from inside the method');
        return this.action1(min, max);
    }

    public async action4(min, max) {
        logger.log(this, 'a message from inside the method');
        return this.action1(min, max);
    }

}