import { LogClass } from '../'
import { AutoLogger } from '../auto';

const log = AutoLogger;

@LogClass(log)
export class Controller {


    public action1(factor: number, optional: any=4) {
        log.trace('a message from inside the method');
        return this.action2(factor) * factor * optional;
    }


    public action2(factor: number) {
        log.info('a message from inside the method');
        return this.action3(factor, 3) * 2;
    }


    public action3(factor1: number, factor2: number) {
        log.warn('a message from inside the method');
        return this.action4('a message from inside the method') * factor1 * factor2;
    }


    public action4(message: string, optional: any=10) {
        log.debug(message);
        return 4;
    }
}
let instance = new Controller();
instance.action1(2);
