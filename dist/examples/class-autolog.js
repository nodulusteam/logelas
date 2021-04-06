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
const auto_1 = require("../auto");
const log = auto_1.AutoLogger;
let Controller = class Controller {
    action1(factor, optional = 4) {
        log.trace('a message from inside the method');
        return this.action2(factor) * factor * optional;
    }
    action2(factor) {
        log.info('a message from inside the method');
        return this.action3(factor, 3) * 2;
    }
    action3(factor1, factor2) {
        log.warn('a message from inside the method');
        return this.action4('a message from inside the method') * factor1 * factor2;
    }
    action4(message, optional = 10) {
        log.debug(message);
        return 4;
    }
};
Controller = __decorate([
    __1.LogClass(log)
], Controller);
exports.Controller = Controller;
let instance = new Controller();
instance.action1(2);
//# sourceMappingURL=class-autolog.js.map