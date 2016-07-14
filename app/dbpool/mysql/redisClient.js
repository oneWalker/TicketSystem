/**
 * Created by briankenliu on 2015/12/12 0012.
 */
var RedisClient = function (poll) {
    this.poll = poll;
    this.query = this.query;
    this.SET = this.SET;
    this.GET = this.GET;

};

module.exports = RedisClient;

RedisClient.prototype.query = function (sql, args, cb) {
    var self  = this;
    //从池子中取出一个连接
    this.poll.acquire(function (err, client) {
        if (!!err) {
            console.error('[sqlqueryErr] ' + err.stack);
            return;
        }
        //在这个连接上执行语句
        client.query(sql, args, function (err, res) {
            //把这个连接释放
            self.poll.release(client);
            cb(err, res);
        });
    });
};

RedisClient.prototype.SET = function (key, value, cb) {
    var self  = this;
    //从池子中取出一个连接
    this.poll.acquire(function (err, client) {
        if (!!err) {
            console.error('[sqlqueryErr] ' + err.stack);
            return;
        }
        //在这个连接上执行语句
        client.set(key, value, function (err, replies) {
            self.poll.release(client);
            cb(err, replies);
        });
    });
};

RedisClient.prototype.GET = function (key, cb) {
    var self  = this;
    //从池子中取出一个连接
    this.poll.acquire(function (err, client) {
        if (!!err) {
            console.error('[sqlqueryErr] ' + err.stack);
            return;
        }
        //在这个连接上执行语句
        client.get(key, function (err, res) {
            self.poll.release(client);
            cb(err, res);
        });
    });
};

RedisClient.prototype.EXISTS = function (key, cb) {
    var self  = this;
    //从池子中取出一个连接
    this.poll.acquire(function (err, client) {
        if (!!err) {
            console.error('[sqlqueryErr] ' + err.stack);
            return;
        }
        //在这个连接上执行语句
        client.exists(key, function (err, res) {
            self.poll.release(client);
            cb(err, res);
        });
    });
};

RedisClient.prototype.shutdown = function (app) {
    this.poll.destroyAllNow();
};

