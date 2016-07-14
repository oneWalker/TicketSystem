/**
 * Created by briankenliu on 2015/12/12 0012.
 */
var _poolModule = require('generic-pool');

/*
 * Create mysql connection pool.
 */
var RedisPoll = function (redisConfig) {
    console.error('createRedisPool', redisConfig);
    //根据APP独处RedisSql的配置定义
    return _poolModule.Pool({
        name: 'redis',
        create: function (callback) {
            var redis = require('redis');
            var client = redis.createClient();
            callback(null, client);
        },
        destroy: function (client) {
            client.quit();
        },
        max: 10,
        idleTimeoutMillis : 30000,
        log : false
    });
};

module.exports = RedisPoll;

