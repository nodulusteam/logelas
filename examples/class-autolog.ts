import { LogClass, LogLevel } from '../'
import { AutoLogger } from '../auto';

const log = AutoLogger;

@LogClass(log)
export class Controller {


    public action1() {
        log.trace(this, 'a message from inside the method');
        return this.action2() * 2;
    }


    public action2() {
        log.info(this, 'a message from inside the method');
        return this.action3() * 2;
    }


    public action3() {
        log.warn(this, 'a message from inside the method');
        return this.action4() * 2;
    }


    public action4() {
        log.debug(this, 'a message from inside the method');
        //this.throws();
        return 4;
    }


    // @Log()
    // public throws() {
    //     throw (new Error('my bad'))
    // }
}





let instance = new Controller();
instance.action1();




