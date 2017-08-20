import { AsyncTest, Expect, Test, TestCase, TestFixture, Timeout } from "alsatian";
import { Logger } from '../'
import { Controller } from './class'
import { logger } from './test-logger'
@TestFixture("Create logs")
export class Logs {

    // use the async/await pattern in your tests as you would in your code
    @Test("asychronous test")
    @TestCase('logelas', 'logelas')
    public async create(logName, debugName) {
        logger.logArray = [];
        let log = new Logger(logName, debugName);
        Expect(log).toBeDefined();
    }


    @TestCase('logelas.log', 'logelas')
    public async testmethod(logName, debugName) {
        logger.logArray = [];
        let object = new Controller();
        let result = object.action2(90, 80);
        let stringResultOfLog = JSON.stringify(logger.logArray);
        let expected = `["100003 :: new Controller() ","100002 :: Controller.action2 =>  90,80","100001 :: Controller.action1 =>  90,80","100001 :: Controller.action1 <=  7200","100002 :: Controller.action2 <=  7200"]`
        
        Expect(stringResultOfLog).toBe(expected);
    }

    @TestCase('xxxx')
    @TestCase('test')
    public async testDebugSymbols(debugSymbol) {
        process.env.DEBUG=debugSymbol;
        logger.logArray = [];
        let object = new Controller();
        let result = object.action2(90, 80);
        let stringResultOfLog = JSON.stringify(logger.logArray);

        let expected = `["100003 :: new Controller() ","100002 :: Controller.action2 =>  90,80","100001 :: Controller.action1 =>  90,80","100001 :: Controller.action1 <=  7200","100002 :: Controller.action2 <=  7200"]`
        Expect(stringResultOfLog).toBe(expected);
    }

}
