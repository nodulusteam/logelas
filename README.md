# Logelas

<a href="https://travis-ci.org/nodulusteam/logelas">
<img src="./logelas.png" alt="Drawing" style="max-width: 150px!important;"/>
</a>

[<img src="https://travis-ci.org/nodulusteam/logelas.svg?branch=master">](https://travis-ci.org/nodulusteam/logelas) 
 [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_logelas&metric=alert_status)](https://sonarcloud.io/dashboard?id=nodulusteam_logelas)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_logelas&metric=bugs)](https://sonarcloud.io/dashboard?id=nodulusteam_logelas)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_logelas&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=nodulusteam_logelas)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fnodulusteam%2Flogelas.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fnodulusteam%2Flogelas?ref=badge_shield)


### motivation
When we build large projects using modules and components, it is best to implement a logging abstraction rather than actual loging library bindings and dependecies, we can than aggregate the virtual loggers to log transports available at the installing application.

Here is a small example of a class decorated with LogClass decorator.

 ```typescript
import { Logger, LogClass } from 'logelas'; // import logelas
const log = new Logger('test.log', 'test'); // create a new virtual logger

@LogClass(log) // provide the logger to the decorator
export class Controller {   
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

truncate()

use `logger.truncate()` to clear the log file (useful for testing and development stages)

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fnodulusteam%2Flogelas.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fnodulusteam%2Flogelas?ref=badge_large)