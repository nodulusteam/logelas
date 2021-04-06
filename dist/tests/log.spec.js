"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_LOG_CONSOLE = "true";
const __1 = require("../");
const class_1 = require("./class");
const test_logger_1 = require("./test-logger");
const logLevel_1 = require("../options/logLevel");
const autoLogger_1 = require("../autoLogger");
describe("Create logs", () => {
    //     @TestCase('trace-log.log', '', LogLevel.Trace)
    //     @TestCase('info-log.log', '', LogLevel.Info)
    //     @TestCase('error-log.log', '', LogLevel.Error)
    it("create", () => {
        const log = new __1.Logger("trace-log.log", "", logLevel_1.LogLevel.Trace);
        log.trace("trace messgae");
        log.info("info messgae");
        log.log("log messgae");
        const er = new Error("there is an error");
        er.message = "there is an error";
        log.error("error message", er);
        log.warn("warn message", { some: "property" });
        log.debug("function message", () => { });
        // log.silly("silly message", TestFixture);
        expect(true).toEqual(true);
    });
    it("decorators", async () => {
        test_logger_1.logger.logArray = [];
        let object = new class_1.Controller();
        let result = await object.action2(90, 80);
        let stringResultOfLog = JSON.stringify(test_logger_1.logger.logArray);
        let expected = `["10000003 :: Controller.action2 =>  min = 90,  max = 80 ","[object Object] a log message from inside the method","10000002 :: Controller.action1 =>  min = 90,  max = 80 ","10000002 :: Controller.action1 <=  7200 ","10000003 :: Controller.action2 <=  7200 "]`;
        expect(stringResultOfLog).toBe(expected);
    });
    it("decorators", async () => {
        test_logger_1.logger.logArray = [];
        let object = new class_1.Controller();
        await object.action2(90, 80);
        await object.action3(90, 50);
        await object.action4(90, 80);
        expect(true).toBe(true);
    });
    it("test log data", async () => {
        process.env.DEBUG = 'methodus:*';
        test_logger_1.logger.logArray = [];
        let object = new class_1.Controller();
        let result = object.action2(90, 80);
        let stringResultOfLog = JSON.stringify(test_logger_1.logger.logArray);
        let expected = `["10000003 :: Controller.action2 =>  min = 90,  max = 80 ","[object Object] a log message from inside the method","10000002 :: Controller.action1 =>  min = 90,  max = 80 ","10000002 :: Controller.action1 <=  7200 "]`;
        expect(stringResultOfLog).toBe(expected);
    });
    it("test autologger", async () => {
        autoLogger_1.AutoLogger.info('testing AutoLogger');
        expect(autoLogger_1.AutoLogger).toBe(autoLogger_1.AutoLogger);
    });
});
//# sourceMappingURL=log.spec.js.map