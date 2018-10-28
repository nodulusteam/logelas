 

/**
 * Module dependencies.
 */

var fmt = require('util').format;
var EventEmitter = require('events').EventEmitter;

/**
 * Initialize a `Loggeer` with the given log `level` defaulting
 * to __DEBUG__ and.
 *
 * @param {Number} level
 * @api public
 */

var Log = exports = module.exports = function Log(level) {
  if ('string' == typeof level) level = exports[level.toUpperCase()];
  this.level = level || exports.DEBUG;
 
};

/**
 * System is unusable.
 *
 * @type Number
 */

exports.EMERGENCY = 0;

/**
 * Action must be taken immediately.
 *
 * @type Number
 */

exports.ALERT = 1;

/**
 * Critical condition.
 *
 * @type Number
 */

exports.CRITICAL = 2;

/**
 * Error condition.
 *
 * @type Number
 */

exports.ERROR = 3;

/**
 * Warning condition.
 *
 * @type Number
 */

exports.WARNING = 4;

/**
 * Normal but significant condition.
 *
 * @type Number
 */

exports.INFO = 5;

/**
 * Purely informational message.
 *
 * @type Number
 */

exports.TRACE = 6;

/**
 * Application debug messages.
 *
 * @type Number
 */

exports.DEBUG = 7;

exports.SILLY = 8;

exports.VERBOSE = 9;
/**
 * prototype.
 */

Log.prototype = {

  /**
   * Start emitting "line" events.
   *
   * @api public
   */

  read: function () {
   

    
  },

  /**
   * Log output message.
   *
   * @param  {String} levelStr
   * @param  {Array} args
   * @api private
   */

  log: function (levelStr, args) {
     
  },

  /**
   * Log emergency `msg`.
   *
   * @param  {String} msg
   * @api public
   */

  emergency: function (msg) {
    this.log('EMERGENCY', arguments);
  },

  /**
   * Log alert `msg`.
   *
   * @param  {String} msg
   * @api public
   */

  alert: function (msg) {
    this.log('ALERT', arguments);
  },

  /**
   * Log critical `msg`.
   *
   * @param  {String} msg
   * @api public
   */

  critical: function (msg) {
    this.log('CRITICAL', arguments);
  },

  /**
   * Log error `msg`.
   *
   * @param  {String} msg
   * @api public
   */

  error: function (msg) {
    this.log('ERROR', arguments);
  },

  /**
   * Log warning `msg`.
   *
   * @param  {String} msg
   * @api public
   */

  warning: function (msg) {
    this.log('WARNING', arguments);
  },

  /**
   * Log notice `msg`.
   *
   * @param  {String} msg
   * @api public
   */

  trace: function (msg) {
    this.log('TRACE', arguments);
  },

  /**
   * Log info `msg`.
   *
   * @param  {String} msg
   * @api public
   */

  info: function (msg) {
    this.log('INFO', arguments);
  },

    /**
   * Log info `msg`.
   *
   * @param  {String} msg
   * @api public
   */

  silly: function (msg) {
    this.log('SILLY', arguments);
  },

      /**
   * Log info `msg`.
   *
   * @param  {String} msg
   * @api public
   */

  verbose: function (msg) {
    this.log('VERBOSE', arguments);
  },
  /**
   * Log debug `msg`.
   *
   * @param  {String} msg
   * @api public
   */

  debug: function (msg) {
    this.log('DEBUG', arguments);
  }
};

/**
 * Inherit from `EventEmitter`.
 */

Log.prototype.__proto__ = EventEmitter.prototype;
