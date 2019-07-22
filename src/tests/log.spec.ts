import { AsyncTest, Expect, Test, TestCase, TestFixture, Timeout } from 'alsatian';
process.env.NODE_LOG_CONSOLE = 'true';
import { Logger, closeLogs } from '../'
import { Controller } from './class'
import { logger } from './test-logger'
import { LogLevel } from '../options/logLevel';
import { AutoLogger } from '../autoLogger';
@TestFixture('Create logs')
export class Logs {
    // use the async/await pattern in your tests as you would in your code
    @Timeout(10 * 1000)
    @AsyncTest('asychronous test')
    @TestCase('trace-log.log', '', LogLevel.Trace)
    @TestCase('info-log.log', '', LogLevel.Info)
    @TestCase('error-log.log', '', LogLevel.Error)
    public async create(logName, debugName, logLevel) {
        const log = new Logger(logName, debugName, logLevel);
        log.trace('trace messgae');
        log.info('info messgae');
        log.log('log messgae');
        const er = new Error('there is an error');
        er.message = 'there is an error';

        log.error('error message', er);
        log.warn('warn message', { some: 'property' });

        log.debug('function message', () => { });

        log.silly('silly message', TestFixture);

        await new Promise((resolve, reject) => {
            setTimeout(() => {
                Expect(log).toBeDefined();
                resolve();
                //  log.close();

            }, 2000);
        });
    }


    @AsyncTest()
    @TestCase()
    public async testmethod() {
        logger.logArray = [];
        let object = new Controller();
        let result = await object.action2(90, 80);

        let stringResultOfLog = JSON.stringify(logger.logArray);
        let expected = `["10000003 :: Controller.action2 =>  min = 90,  max = 80 ","[object Object] a log message from inside the method","10000002 :: Controller.action1 =>  min = 90,  max = 80 ","10000002 :: Controller.action1 <=  7200 ","10000003 :: Controller.action2 <=  7200 "]`;
        Expect(stringResultOfLog).toBe(expected);
        return result;
    }



    @AsyncTest()
    @TestCase()
    public async testMoreMethod() {
        logger.logArray = [];
        let object = new Controller();
        await object.action2(90, 80);
        await object.action3(90, 50);
        await object.action4(90, 80);
        Expect(true).toBe(true);
    }



    @TestCase('xxxx')
    @TestCase('test')
    public async testDebugSymbols(debugSymbol) {
        process.env.DEBUG = debugSymbol;
        logger.logArray = [];
        let object = new Controller();
        let result = object.action2(90, 80);
        let stringResultOfLog = JSON.stringify(logger.logArray);
        let expected = `["10000003 :: Controller.action2 =>  min = 90,  max = 80 ","[object Object] a log message from inside the method","10000002 :: Controller.action1 =>  min = 90,  max = 80 ","10000002 :: Controller.action1 <=  7200 "]`
        Expect(stringResultOfLog).toBe(expected);
        return result;
    }


    @AsyncTest()
    @TestCase()
    public async testAutoLogger() {
        AutoLogger.info('testing AutoLogger');
        Expect(AutoLogger).toBe(AutoLogger);
    }

    @Test()
    public closeLoggers() {
        closeLogs();
    }

}
