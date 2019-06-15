---
id: api-readme
title: logelas
sidebar_label: logelas
---

### Enumerations

* [LogLevel](api-enums-loglevel.md)

### Classes

* [Controller](api-classes-controller.md)
* [Logger](api-classes-logger.md)
* [Logs](api-classes-logs.md)
* [logger](api-classes-logger.md)

### Interfaces

* [ClassLoggerOptions](api-interfaces-classloggeroptions.md)
* [FormatAndLogFunction](api-interfaces-formatandlogfunction.md)
* [FunctionLoggerOptions](api-interfaces-functionloggeroptions.md)
* [ILogger](api-interfaces-ilogger.md)
* [LogFunction](api-interfaces-logfunction.md)

### Variables

* [AutoLogger](#autologger)
* [LogLevelStr](#loglevelstr)

### Functions

* [DisableMethodLogger](#disablemethodlogger)
* [LogClass](#logclass)
* [closeLogs](#closelogs)
* [getMonkeyPatchMethod](#getmonkeypatchmethod)
* [postLog](#postlog)
* [postLogError](#postlogerror)
* [preLog](#prelog)

### Object literals

* [defaultClassOptions](#defaultclassoptions)
* [defaultFunctionOptions](#defaultfunctionoptions)

---

# Variables

<a id="autologger"></a>

## `<Const>` AutoLogger

**● AutoLogger**: *[Logger](api-classes-logger.md)* =  new Logger(logName, debugSymbol, logLevel, applicationName)

*Defined in [autoLogger.ts:8](https://github.com/nodulusteam/logelas/blob/def023e/src/autoLogger.ts#L8)*

___
<a id="loglevelstr"></a>

## `<Const>` LogLevelStr

**● LogLevelStr**: *`string`[]* = 
    ['','log', 'system', 'error', 'warn', 'info', 'trace']

*Defined in [options/logLevel.ts:10](https://github.com/nodulusteam/logelas/blob/def023e/src/options/logLevel.ts#L10)*

___

# Functions

<a id="disablemethodlogger"></a>

##  DisableMethodLogger

▸ **DisableMethodLogger**(): `Function`

*Defined in [options/function-logger.decorator.ts:29](https://github.com/nodulusteam/logelas/blob/def023e/src/options/function-logger.decorator.ts#L29)*

**Returns:** `Function`

___
<a id="logclass"></a>

##  LogClass

▸ **LogClass**(logger: *[ILogger](api-interfaces-ilogger.md)*, options?: *[ClassLoggerOptions](api-interfaces-classloggeroptions.md)*, debugSymbol?: *`undefined` \| `string`*): `(Anonymous function)`

*Defined in [decorators/logClass.ts:7](https://github.com/nodulusteam/logelas/blob/def023e/src/decorators/logClass.ts#L7)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| logger | [ILogger](api-interfaces-ilogger.md) | - |
| `Default value` options | [ClassLoggerOptions](api-interfaces-classloggeroptions.md) |  defaultClassOptions |
| `Optional` debugSymbol | `undefined` \| `string` | - |

**Returns:** `(Anonymous function)`

___
<a id="closelogs"></a>

##  closeLogs

▸ **closeLogs**(): `void`

*Defined in [cleaner.ts:3](https://github.com/nodulusteam/logelas/blob/def023e/src/cleaner.ts#L3)*

**Returns:** `void`

___
<a id="getmonkeypatchmethod"></a>

## `<Const>` getMonkeyPatchMethod

▸ **getMonkeyPatchMethod**(target: *`any`*, method: *`Function`*, methodName: *`string`*, options: *[FunctionLoggerOptions](api-interfaces-functionloggeroptions.md)*): `Function`

*Defined in [options/function-logger.decorator.ts:18](https://github.com/nodulusteam/logelas/blob/def023e/src/options/function-logger.decorator.ts#L18)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| target | `any` |
| method | `Function` |
| methodName | `string` |
| options | [FunctionLoggerOptions](api-interfaces-functionloggeroptions.md) |

**Returns:** `Function`

___
<a id="postlog"></a>

##  postLog

▸ **postLog**(target: *`any`*, propertyKey: *`string`*, result: *`any`*, logLevel: *[LogLevel](api-enums-loglevel.md)*, _methodIdentifier?: *`undefined` \| `number`*, filename?: *`undefined` \| `string`*): `any`

*Defined in [loggerd.ts:44](https://github.com/nodulusteam/logelas/blob/def023e/src/loggerd.ts#L44)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| target | `any` |
| propertyKey | `string` |
| result | `any` |
| logLevel | [LogLevel](api-enums-loglevel.md) |
| `Optional` _methodIdentifier | `undefined` \| `number` |
| `Optional` filename | `undefined` \| `string` |

**Returns:** `any`

___
<a id="postlogerror"></a>

##  postLogError

▸ **postLogError**(logger: *`any`*, target: *`any`*, error: *`any`*, propertyKey: *`string`*, _methodIdentifier: *`number`*): `void`

*Defined in [loggerd.ts:15](https://github.com/nodulusteam/logelas/blob/def023e/src/loggerd.ts#L15)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| logger | `any` |
| target | `any` |
| error | `any` |
| propertyKey | `string` |
| _methodIdentifier | `number` |

**Returns:** `void`

___
<a id="prelog"></a>

##  preLog

▸ **preLog**(target: *`any`*, propertyKey: *`string`*, args: *`any`*, logLevel: *[LogLevel](api-enums-loglevel.md)*, _methodIdentifier?: *`undefined` \| `number`*, filename?: *`undefined` \| `string`*): `any`

*Defined in [loggerd.ts:23](https://github.com/nodulusteam/logelas/blob/def023e/src/loggerd.ts#L23)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| target | `any` |
| propertyKey | `string` |
| args | `any` |
| logLevel | [LogLevel](api-enums-loglevel.md) |
| `Optional` _methodIdentifier | `undefined` \| `number` |
| `Optional` filename | `undefined` \| `string` |

**Returns:** `any`

___

# Object literals

<a id="defaultclassoptions"></a>

## `<Const>` defaultClassOptions

**defaultClassOptions**: *`object`*

*Defined in [options/default-options/default-class-logger-options.ts:4](https://github.com/nodulusteam/logelas/blob/def023e/src/options/default-options/default-class-logger-options.ts#L4)*

<a id="defaultclassoptions.methodoptions"></a>

###  methodOptions

**● methodOptions**: *[FunctionLoggerOptions](api-interfaces-functionloggeroptions.md)* =  defaultFunctionOptions

*Defined in [options/default-options/default-class-logger-options.ts:5](https://github.com/nodulusteam/logelas/blob/def023e/src/options/default-options/default-class-logger-options.ts#L5)*

___

___
<a id="defaultfunctionoptions"></a>

## `<Const>` defaultFunctionOptions

**defaultFunctionOptions**: *`object`*

*Defined in [options/default-options/default-function-logger-options.ts:3](https://github.com/nodulusteam/logelas/blob/def023e/src/options/default-options/default-function-logger-options.ts#L3)*

<a id="defaultfunctionoptions.logfunction"></a>

###  logFunction

**● logFunction**: *`info`* =  console.info

*Defined in [options/default-options/default-function-logger-options.ts:7](https://github.com/nodulusteam/logelas/blob/def023e/src/options/default-options/default-function-logger-options.ts#L7)*

___
<a id="defaultfunctionoptions.withargs"></a>

###  withArgs

**● withArgs**: *`true`* = true

*Defined in [options/default-options/default-function-logger-options.ts:4](https://github.com/nodulusteam/logelas/blob/def023e/src/options/default-options/default-function-logger-options.ts#L4)*

___
<a id="defaultfunctionoptions.withclassproperties"></a>

###  withClassProperties

**● withClassProperties**: *`true`* = true

*Defined in [options/default-options/default-function-logger-options.ts:6](https://github.com/nodulusteam/logelas/blob/def023e/src/options/default-options/default-function-logger-options.ts#L6)*

___
<a id="defaultfunctionoptions.withtime"></a>

###  withTime

**● withTime**: *`true`* = true

*Defined in [options/default-options/default-function-logger-options.ts:5](https://github.com/nodulusteam/logelas/blob/def023e/src/options/default-options/default-function-logger-options.ts#L5)*

___

___

