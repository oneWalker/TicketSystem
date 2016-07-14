/**
 * Created by briankenliu on 2015/12/12 0012.
 */
var mysql = require('mysql');

var DB_QUERY_KIND = {                         //DB查询种类
        DQK0 : 0,      //根据规则主从选择
        DQK1 : 1,      //只从Master操作(主服务器)
        DQK2: 2       //只从Slave操作
    };

var MysqlClient = function (mysqlConfig) {
    //this.poll = poll;
    this.query = this.query;
    this.insert = this.insert;
    this.update = this.update;
    this.delete = this.query;
    //主库连接池
    this.masterPool  = mysql.createPool(mysqlConfig.master);
    //从库连接池
    this.slavePool  = mysql.createPool(mysqlConfig.slave);
    //d
    this.dbQueryKind = mysqlConfig.dbQueryKind;

    this.init();
};

module.exports = MysqlClient;

MysqlClient.prototype.query = function (sql, args, cb) {
    var usePool;
    if (this.dbQueryKind === DB_QUERY_KIND.DQK0) {
        usePool = this.getSqlPool();
    } else if (this.dbQueryKind === DB_QUERY_KIND.DQK1) {
        usePool = this.masterPool;
    } else if (this.dbQueryKind === DB_QUERY_KIND.DQK2) {
        usePool = this.slavePool;
    } else {
        usePool = this.masterPool;
    }

    usePool.query(sql, args, function (err, res) {
        cb(err, res);
    });
};

MysqlClient.prototype.insert = function (sql, args, cb) {
    this.masterPool.query(sql, args, function (err, res) {
        cb(err, res);

    });
};

MysqlClient.prototype.update = function (sql, args, cb) {
    this.masterPool.query(sql, args, function (err, res) {
        cb(err, res);

    });
};

MysqlClient.prototype.shutdown = function (app) {
    //this.poll.destroyAllNow();
};

//根据SQL得到应该使用那个一Sql
MysqlClient.prototype.getSqlPool = function (sql) {
    var re = this.masterPool;
    if (this.sqlPools[sql] === 1) {
        re = this.slavePool;
    }
    return re;
};

//初始化主从库的默认选择
MysqlClient.prototype.init = function () {
    this.sqlPools = {};
    //this.sqlPools[SC.GET_PVPCLUB_INFO_BY_CLUBID] = 1;
};

