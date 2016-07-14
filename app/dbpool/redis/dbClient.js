/**
 * Created by Administrator on 2015/5/20.
 */
var Redis = require('ioredis');
var GF = require('../../const/globalFunction');

//var mysqlConfig = require('../../../config/mysql');
var redisConfig = GF.lodConfig('redis');


var dbRedis = new Redis({
    port: redisConfig.port,          // Redis port
    host: redisConfig.host,   // Redis host
    family: 4,           // 4(IPv4) or 6(IPv6)
    db: redisConfig.db,
    password:redisConfig.password
});

var dbClient = module.exports;

dbClient.getdbClient = function () {
    return dbRedis;
};
