

/**
 * Module dependencies.
 */

var fmt = require('util').format;
var EventEmitter = require('events').EventEmitter;

/**
 * Initialize a `Loggeer` with the given log `level` defaulting
 * to __DEBUG__ and `stream` defaulting to _stdout_.
 *
 * @param {Number} level
 * @param {Object} stream
 * @api public
 */

var Log = exports = module.exports = function Log(logStreams, level) {
  if ('string' == typeof level) level = exports[level.toUpperCase()];
  this.level = level || exports.DEBUG;
  this.logStreams = logStreams;
  this.stream = logStreams[0] || process.stdout;
  if (this.stream.readable) this.read();
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
    var buf = ''
      , self = this
      , stream = this.stream;

    stream.setEncoding('utf8');
    stream.on('data', function (chunk) {
      buf += chunk;
      if ('\n' != buf[buf.length - 1]) return;
      buf.split('\n').map(function (line) {
        if (!line.length) return;
        try {
          var captures = line.match(/^\[([^\]]+)\] (\w+) (.*)/);
          var obj = {
            date: new Date(captures[1]).toISOString()
            , level: exports[captures[2]]
            , levelString: captures[2]
            , msg: captures[3]
          };
          self.emit('line', obj);
        } catch (err) {
          // Ignore
        }
      });
      buf = '';
    });

    stream.on('end', function () {
      self.emit('end');
    });
  },

  /**
   * Log output message.
   *
   * @param  {String} levelStr
   * @param  {Array} args
   * @api private
   */

  log: function (levelStr, args) {
    if (exports[levelStr] <= this.level) {
      var msg = fmt.apply(null, args);
      levelStr = (levelStr + '           ').substr(0, 6)

      this.stream.write(
        '[' + new Date().toISOString() + ']'
        + ' ' + levelStr
        + ' ' + msg
        + '\n'
      );
    }
  },

  /**
   * Log emergency `msg`.
   *
   * @param  {String} msg
   * @api public
   */

  emergency: function (msg) {

    this.logStreams.map(item => { item.log('EMERGENCY', arguments); });
  },

  /**
   * Log alert `msg`.
   *
   * @param  {String} msg
   * @api public
   */

  alert: function (msg) {
    this.logStreams.map(item => { item.log('ALERT', arguments); });

  },

  /**
   * Log critical `msg`.
   *
   * @param  {String} msg
   * @api public
   */

  critical: function (msg) {
    this.logStreams.map(item => { item.log('CRITICAL', arguments); });

  },

  /**
   * Log error `msg`.
   *
   * @param  {String} msg
   * @api public
   */

  error: function (msg) {
    this.logStreams.map(item => { item.log('ERROR', arguments); });

  },

  /**
   * Log warning `msg`.
   *
   * @param  {String} msg
   * @api public
   */

  warning: function (msg) {
    this.logStreams.map(item => { item.log('WARNING', arguments); });

  },

  /**
   * Log notice `msg`.
   *
   * @param  {String} msg
   * @api public
   */

  trace: function (msg) {
    this.logStreams.map(item => { item.log('TRACE', arguments); });
  },

  /**
   * Log info `msg`.
   *
   * @param  {String} msg
   * @api public
   */

  info: function (msg) {
    this.logStreams.map(item => { item.log('INFO', arguments); });
  },

  /**
 * Log info `msg`.
 *
 * @param  {String} msg
 * @api public
 */

  silly: function (msg) {
    this.logStreams.map(item => { item.log('SILLY', arguments); });
  },

  /**
* Log info `msg`.
*
* @param  {String} msg
* @api public
*/

  verbose: function (msg) {
    this.logStreams.map(item => { item.log('VERBOSE', arguments); });
  },
  /**
   * Log debug `msg`.
   *
   * @param  {String} msg
   * @api public
   */

  debug: function (msg) {
    this.logStreams.map(item => { item.log('DEBUG', arguments); });
  }
};

/**
 * Inherit from `EventEmitter`.
 */

Log.prototype.__proto__ = EventEmitter.prototype;
