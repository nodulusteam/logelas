import {ILogger} from './ILogger';


export function MethodName(logger?: ILogger) {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        let originalMethod = descriptor.value;
        descriptor.value =

            function (...args: any[]) {
                let informationElement = args[0];
                if (typeof (informationElement) === 'function') {
                    informationElement = informationElement.name + '  ';
                    args[0] = informationElement;
                } else if (informationElement.constructor && informationElement.constructor.logelas) {
                    informationElement = informationElement.constructor.logelas.__methodname;
                    args[0] = informationElement + '  ';
                }

                let result = originalMethod.call(this, ...args);
            }

        return descriptor;
    }
}
