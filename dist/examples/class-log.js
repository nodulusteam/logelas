"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const __1 = require("../");
const log = new __1.Logger('test.log', 'test', __1.LogLevel.Trace);
log.on('test.log', (logEntry) => {
    console.log(logEntry);
});
let Controller = class Controller {
    action1() {
        log.log(this, 'a message from inside the method');
        return this.action2() * 2;
    }
    action2() {
        log.info(this, 'a message from inside the method');
        return this.action3() * 2;
    }
    action3() {
        log.warn(this, 'a message from inside the method');
        return this.action4() * 2;
    }
    action4() {
        log.debug(this, 'a message from inside the method');
        //this.throws();
        return 4;
    }
};
Controller = __decorate([
    __1.LogClass(log)
], Controller);
exports.Controller = Controller;
let instance = new Controller();
instance.action1();
//# sourceMappingURL=class-log.js.map