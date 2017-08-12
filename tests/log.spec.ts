import { AsyncTest, Expect, Test, TestCase, TestFixture, Timeout } from "alsatian";
import { Logger } from '../'


@TestFixture("Create logs")
export class Logs {

    // use the async/await pattern in your tests as you would in your code
    @Test("asychronous test")
    @TestCase('logelas', 'logelas')
    public async create(logName, debugName) {
        let log = new Logger(logName, debugName)
        Expect(log).toBeDefined();
    }

}
