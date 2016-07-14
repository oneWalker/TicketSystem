/**
 * Created by briankenliu on 2015/12/12 0012.
 */
//var MysqlPoll = require('./mysqlPoll');
var MysqlClient = require('./mysqlClient');//连接远程服务器
var GF = require('../../const/globalFunction');

//var mysqlConfig = require('../../../config/mysql');
var mysqlConfig = GF.lodConfig('mysql');;

//var pool = new MysqlPoll(mysqlConfig);
var dbMysqlclient = new MysqlClient(mysqlConfig);

var dbClient = module.exports;

dbClient.getdbClient = function () {
    return dbMysqlclient;
};