/**
 * Created by briankenliu on 2015/12/12 0012.
 */
var net = require('net');
var _poolModule = require('generic-pool');

var GtSocketPool = function (config) {
    var pool = _poolModule.Pool({
        name: 'gtSocket',
        create: function (callback) {
            var client = new net.Socket();
            callback(null, client);
        },
        destroy: function (client) {
            console.log('destroy: ' );
            client.destroy();
        },
        max: 10,
        // optional. if you set this, make sure to drain() (see step 3)
        min: 2,
        // specifies how long a resource can stay idle in pool before being removed
        idleTimeoutMillis: 3000,
        // if true, logs via console.log - can also be a function
        log: false
    });

    return pool;
};

module.exports = GtSocketPool;

