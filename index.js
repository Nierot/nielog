const util = require('util');

exports.Log = {

    /**
     * Sets the level of logging:
     * 
     * level 1: prints everything
     * level 2: skips verbose/debug logging
     * level 3: only logs errors
     * level 4: disables logging
     */
    setLevel: level => {
        if (level === 1 || level === 2 || level === 3 || level === 4) {
            exports.Log.currentLevel = level;
        } else {
            throw new Error('Not a valid logging value');
        }
    },

    /**
     * Boolean if you want colored output
     * default true
     */
    setColor: boolean => exports.Log.color = boolean,

    currentLevel = 1,

    _levels: {
        INFO: 'info',
        DEBUG: 'debug',
        ERROR: 'error'
    },

    color: true,

    /**
     * Prints a message with the [INFO] tag,
     * level 2 or lower
     */
    info: (...message) => {
        if (currentLevel <= 2) this._print(message, _levels.INFO, new Date());
    },

    /**
     * Prints a message with the [DEBUG] tag,
     * level 1 only
     */
    verbose: (...message) => {
        if (currentLevel === 1) this._print(message, _levels.DEBUG, new Date());
    },

    /**
     * Prints a message with the [ERROR] tag,
     * level 3 or lower
     */
    error : (...message) => {
        if (currentLevel <= 3) this._print(message, _levels.ERROR, new Date());
    },

    _print: (messages, level, date) => {
        messages.forEach(msg => {
            if (typeof msg !== 'string') {
                msg = util.inspect(msg, showHidden=true, depth=2, colorize=exports.Log.color);
            }
            console.log(`[${level}][${date.toUTCString()}]: ${msg} `)
        }) 
    },
}
