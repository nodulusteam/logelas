# Logelas

<a href="https://travis-ci.org/nodulusteam/logelas">
<img src="./logelas.png" alt="Drawing" style="max-width: 150px!important;"/>
</a>

[<img src="https://travis-ci.org/nodulusteam/logelas.svg?branch=master">](https://travis-ci.org/nodulusteam/logelas)
 

### motivation
* we need logs
* we forget | too lazy | it's to complicated | logging is for the weak | etc...
* we still need logs!

 ```
import { Logger, Log, LogClass } from '../'

const log = new Logger('test.log', 'test');

@LogClass(log)
export class Controller {

    @Log(log)
    public action1() {

    }
}

 ```
