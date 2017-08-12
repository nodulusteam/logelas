import { Logger, Log, LogClass } from '../'

const log = new Logger('test.log', 'test');

@LogClass(log)
export class Controller {

    @Log(log)
    public action1() {

    }
}