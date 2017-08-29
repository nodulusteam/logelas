import { Logger, Log, LogClass } from '../'

const log = new Logger('test.log', 'test').truncate();

@LogClass(log)
export class Controller {

    @Log()
    public action1() {
        log.log(this, 'a message from inside the method');
        return this.action2() * 2;
    }

    @Log()
    public action2() {
        log.info(this, 'a message from inside the method');
        return this.action3() * 2;
    }

    @Log()
    public action3() {
        log.warn(this, 'a message from inside the method');
        return this.action4() * 2;
    }

    @Log()
    public action4() {
        log.debug(this, 'a message from inside the method');
        this.throws();
        return 4;
    }


    @Log()
    public throws() {
        throw (new Error('my bad'))
    }
}





let instance = new Controller();
instance.action1();




