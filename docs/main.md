# ![logo](_media/logelas_32.png) Logelas
 
[<img src="https://travis-ci.org/nodulusteam/logelas.svg?branch=master">](https://travis-ci.org/nodulusteam/logelas) 
 [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_logelas&metric=alert_status)](https://sonarcloud.io/dashboard?id=nodulusteam_logelas)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_logelas&metric=bugs)](https://sonarcloud.io/dashboard?id=nodulusteam_logelas)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_logelas&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=nodulusteam_logelas)


## Philosophy
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




##### logo by: Famous Character Vol 2 - Colored , Designer: Vectto (https://www.iconfinder.com/vectto)
