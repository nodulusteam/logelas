# Logelas

<a href="https://travis-ci.org/nodulusteam/logelas">
<img src="./logelas.png" alt="Drawing" style="max-width: 150px!important;"/>
</a>

[<img src="https://travis-ci.org/nodulusteam/logelas.svg?branch=master">](https://travis-ci.org/nodulusteam/logelas)
 

### motivation
* we need logs
* we are: 
    * too lazy
    * forget   
    * it's to complicated
    * logging is for the weak
    * etc...

* we still need logs!

 ```
import { Logger, Log, LogClass } from 'logelas'
const log = new Logger('test.log', 'test');

@LogClass(log)
export class Controller {

    @Log()
    public action1() {
        log.error(this, 'there is the rror log');
    }
}

 ```

## Logger
create a file based logger

`new Logger([filename], [debugSymbol])`


## @LogClass, @Log  decorators

use `@LogClass` at the top of your class and `@Log` for every method you wish to log.
logelas will create a log entry for every call to the method and for every value returned by it. the log file may look like this:
```javascript
[2017-08-25T20:51:58.848Z] INFO   √ 100006 :: new Controller() 
[2017-08-25T20:52:02.504Z] INFO   √ 100001 :: Controller.action1 =>  
[2017-08-25T20:52:02.506Z] INFO   √ 100001 :: Controller.action1   a message from inside the method
[2017-08-25T20:52:02.506Z] INFO   √ 100002 :: Controller.action2 =>  
[2017-08-25T20:52:02.507Z] INFO   √ 100002 :: Controller.action2   a message from inside the method
[2017-08-25T20:52:02.507Z] INFO   √ 100003 :: Controller.action3 =>  
[2017-08-25T20:52:02.507Z] WARNIN ‼ 100003 :: Controller.action3   a message from inside the method
[2017-08-25T20:52:02.507Z] INFO   √ 100004 :: Controller.action4 =>  
[2017-08-25T20:52:02.507Z] DEBUG  i 100004 :: Controller.action4   a message from inside the method
[2017-08-25T20:52:02.507Z] INFO   √ 100005 :: Controller.throws =>  
[2017-08-25T20:52:02.508Z] ERROR  × 100005 :: Controller.throws ##  my bad Error: my bad
    at Controller.throws (c:\Git_work\logelas\examples\class-log.js:33:16)
    at Controller.<anonymous> (c:\Git_work\logelas\src\loggerd.js:29:53)
    at Controller.action4 (c:\Git_work\logelas\examples\class-log.js:29:14)
    at Controller.<anonymous> (c:\Git_work\logelas\src\loggerd.js:29:53)
    at Controller.action3 (c:\Git_work\logelas\examples\class-log.js:25:21)
    at Controller.<anonymous> (c:\Git_work\logelas\src\loggerd.js:29:53)
    at Controller.action2 (c:\Git_work\logelas\examples\class-log.js:21:21)
    at Controller.<anonymous> (c:\Git_work\logelas\src\loggerd.js:29:53)
    at Controller.action1 (c:\Git_work\logelas\examples\class-log.js:17:21)
    at Controller.<anonymous> (c:\Git_work\logelas\src\loggerd.js:29:53)
[2017-08-25T20:52:02.508Z] INFO   √ 100004 :: Controller.action4 <=  4
[2017-08-25T20:52:02.508Z] INFO   √ 100003 :: Controller.action3 <=  8
[2017-08-25T20:52:02.508Z] INFO   √ 100002 :: Controller.action2 <=  16
[2017-08-25T20:52:02.508Z] INFO   √ 100001 :: Controller.action1 <=  32
```


### Manual logging
some times we need to log something within the method logic. using the same logger as the @LogClass decorator we can easily emit log messages that will automatically log the class and method names and id.

```javascript

logger.log(this, 'my custom log entry');
logger.debug(this, 'debug this please');
logger.info(this, 'just an info lo entry');
logger.error(this, 'huston we have a problem');
logger.warn(this, 'this is the last warning');

```