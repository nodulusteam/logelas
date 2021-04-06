"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const __1 = require("../");
const test_logger_1 = require("./test-logger");
let Controller = class Controller {
    constructor() {
    }
    action1(min, max) {
        return min * max;
    }
    async action2(min, max) {
        test_logger_1.logger.log(this, 'a log message from inside the method');
        return this.action1(min, max);
    }
    async action3(min, max) {
        test_logger_1.logger.warn(this, 'a warn message from inside the method');
        return this.action1(min, max);
    }
    async action4(min, max) {
        test_logger_1.logger.info(this, 'an info message from inside the method');
        return this.action1(min, max);
    }
};
Controller = __decorate([
    __1.LogClass(test_logger_1.logger),
    __metadata("design:paramtypes", [])
], Controller);
exports.Controller = Controller;
//# sourceMappingURL=class.js.map