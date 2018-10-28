import { ILogger } from '../log-interface';
var stackTrace = require('stack-trace');

export function MethodName(logger?: ILogger) {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        let originalMethod = descriptor.value;
        descriptor.value =
            function (...args: any[]) {
                let informationElement = args[0];
                if (informationElement && informationElement.logelas) {
                    args[0] = informationElement.logelas.__methodname
                } else if (informationElement && informationElement.constructor && informationElement.constructor.logelas) {
                    informationElement = informationElement.constructor.logelas.__methodname;
                    args[0] = informationElement + '  ';
                }

                if (typeof (informationElement) === 'object') {

                    try {
                        args[0] = informationElement.__proto__.constructor.name;
                    }
                    catch (error) {
                        args[0] = informationElement.name + '  ';
                    }

                    var trace = stackTrace.get();
                    if (trace.length > 1) {
                        args[0] = `${args[0]}:: ${trace[1].getFileName()}::line:${trace[1].getLineNumber()}`;
                    }

                }

                if (typeof (informationElement) === 'function') {
                    args[0] = informationElement.name;
                    var trace = stackTrace.get();
                    if (trace.length > 1) {
                        args[0] = `${args[0]}:: ${trace[1].getFileName()}::line:${trace[1].getLineNumber()}`;
                    }
                }



                let result = originalMethod.call(this, ...args);
            }

        return descriptor;
    }
}
