import { ILogger, Logger } from './loggerClass'


let methodIdentifier: number = 100000;
export function Log(logger?: ILogger) {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {



        // save a reference to the original method
        let originalMethod = descriptor.value;
        methodIdentifier++;
        //methodType = methodType || MethodType.Local;
        descriptor.value =
            function (_methodIdentifier) {
                return function (...args: any[]) {
                    if (!logger && target.logelas)
                        logger = target.logelas;
                    let name = target.name;
                    if (!name && target.constructor) {
                        name = target.constructor.name;
                        if (!logger && target.constructor.logelas)
                            logger = target.constructor.logelas;
                    }
                    else {
                        name = 'no name';
                    }

                    (logger as any).__methodname = `${_methodIdentifier} :: ${name}.${propertyKey}`;

                    if (logger)
                        logger.log(`${_methodIdentifier} :: ${name}.${propertyKey} => `, args);

                    try {

                        let result = originalMethod.call(target, ...args);
                        if (result)
                            if (logger)
                                logger.log(`${_methodIdentifier} :: ${name}.${propertyKey} <= `, result);
                        return result;
                    } catch (error) {
                        if (logger)
                            logger.error(`${_methodIdentifier} :: ${name}.${propertyKey} ## `, error.message, error.stack);
                        return error;
                    }

                };
            }(methodIdentifier)

        return descriptor;
    }
}


export function LogParam(name?: string) {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        // let existingMetadata: any[] = Reflect.getOwnMetadata(metadataKey, target, propertyKey) || [];
        // if (name)
        //     existingMetadata.push({ from: 'body', index: parameterIndex, name: name });
        // else
        //     existingMetadata.push({ from: 'body', index: parameterIndex });

        // Reflect.defineMetadata(metadataKey, existingMetadata, target, propertyKey);
    }
}


export function LogClass(logger: ILogger) {
    return (target: any) => {
        target.logelas = logger;
        // save a reference to the original constructor
        var original = target;
        methodIdentifier++;
        // the new constructor behaviour
        var f: any = function (_methodIdentifier) {
            return function (...args) {
                logger.log(`${_methodIdentifier} :: new ${original.name}()`, args);
                return new original(...args);
            }
        }(methodIdentifier);

        // copy prototype so intanceof operator still works
        f.prototype = original.prototype;
        // return new constructor (will override original)
        return f;
    }
}