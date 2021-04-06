process.env.NODE_LOG_CONSOLE = "true";
import { Logger } from "../";
import { Controller } from "./class";
import { logger } from "./test-logger";
import { LogLevel } from "../options/logLevel";
import { AutoLogger } from "../autoLogger";
describe("Create logs", () => {
  //     @TestCase('trace-log.log', '', LogLevel.Trace)
  //     @TestCase('info-log.log', '', LogLevel.Info)
  //     @TestCase('error-log.log', '', LogLevel.Error)

  it("create", () => {
    const log = new Logger("trace-log.log", "", LogLevel.Trace);
    log.trace("trace messgae");
    log.info("info messgae");
    log.log("log messgae");

    const er = new Error("there is an error");
    er.message = "there is an error";

    log.error("error message", er);
    log.warn("warn message", { some: "property" });

    log.debug("function message", () => {});

    // log.silly("silly message", TestFixture);

    expect(true).toEqual(true);
  });

  it("decorators", async () => {
    logger.logArray = [];
    let object = new Controller();
    let result = await object.action2(90, 80);

    let stringResultOfLog = JSON.stringify(logger.logArray);
    let expected = `["10000003 :: Controller.action2 =>  min = 90,  max = 80 ","[object Object] a log message from inside the method","10000002 :: Controller.action1 =>  min = 90,  max = 80 ","10000002 :: Controller.action1 <=  7200 ","10000003 :: Controller.action2 <=  7200 "]`;
    expect(stringResultOfLog).toBe(expected);
  });

  it("decorators", async () => {
    logger.logArray = [];
    let object = new Controller();
    await object.action2(90, 80);
    await object.action3(90, 50);
    await object.action4(90, 80);
    expect(true).toBe(true);
  });

  it("test log data", async () => {
    process.env.DEBUG = 'methodus:*';
    logger.logArray = [];
    let object = new Controller();
    let result = object.action2(90, 80);
    let stringResultOfLog = JSON.stringify(logger.logArray);
    let expected = `["10000003 :: Controller.action2 =>  min = 90,  max = 80 ","[object Object] a log message from inside the method","10000002 :: Controller.action1 =>  min = 90,  max = 80 ","10000002 :: Controller.action1 <=  7200 "]`;
    expect(stringResultOfLog).toBe(expected);
  });

  
  it("test autologger", async () => {
    AutoLogger.info('testing AutoLogger');
    expect(AutoLogger).toBe(AutoLogger);
  });
});
