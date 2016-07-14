var dbClient = require('../app/dbpool/mysql/dbClient').getdbClient();
var movieinfo = module.exports;
var consts = require('../app/const/globalConsts');
var moment=require('moment');
//返回表里面的所有电影的数据并进行存储
movieinfo.getMovie = function (startTime,cb) {
    var sql = 'select * from movieinfo where startTime >= ? ORDER BY startTime';
    var args=[startTime];
    dbClient.query(sql,args,function (err, res) {
        if (err !== null) {
            cb(err, null);
        } else {
            var users=[];
            var length=res.length;
            if(length>0){
                for(var i=0;i<length;i++){
                    users.push(res[i]);
                }
            }
            cb(null,users);
        }
    });
};
//删除电影片名通过ID
movieinfo.deleteById = function (id, cb){
    var sql = 'delete from movieinfo where id = ?';
    var args = [id];
    dbClient.delete(sql, args, function (err, res) {
        if (err !== null) {
            cb(err, null);
            console.log(err);
        }
        else {
            cb(null, res);
        }
    });
};
//通过ID查询所有信息
movieinfo.getMovieByID = function (id, cb) {
    var sql = 'select * from movieinfo where id = ? ';
    var args = [id];
    dbClient.query(sql,args, function (err, res) {
        if (err !== null) {
            cb(err, null);
        } else {
            if (!!res && res.length === 1) {
                var rs = res[0];
                var user = {id: rs.id,name:rs.mname,startTime:rs.startTime,endTime: rs.endTime, publisher: rs.publisher,language:rs.language,cinema:rs.cinema,price:rs.price,number:rs.number,value:rs.mvalue}
                cb(null,user);
            }
            else
            {
                cb(null,null);
            }
        }
    });
};
//修改电影信息函数（仅限管理员和影院，影院账户只能看到自己的）
movieinfo.updateStart = function (startTime,id,cb) {
    var sql = 'update movieinfo set startTime = ? where id = ?';
    var args = [startTime,id];
    dbClient.query(sql, args, function (err, res) {
        if (err !== null) {
            cb(err.message, null);
        } else {
            if (!!res && res.affectedRows > 0) {
                cb(null, true);
            } else {
                cb(null, false);
            }
        }
    });
};

movieinfo.updateMoviendTime = function (endTime,id,cb) {
    var sql = 'update movieinfo set endTime = ? where id = ?';
    var args = [endTime,id];
    dbClient.query(sql, args, function (err, res) {
        if (err !== null) {
            cb(err.message, null);
        } else {
            if (!!res && res.affectedRows > 0) {
                cb(null, true);
            } else {
                cb(null, false);
            }
        }
    });
};

movieinfo.updateMovieLang = function (language,id,cb) {
    var sql = 'update movieinfo set language = ? where id = ?';
    var args = [language,id];
    dbClient.query(sql, args, function (err, res) {
        if (err !== null) {
            cb(err.message, null);
        } else {
            if (!!res && res.affectedRows > 0) {
                cb(null, true);
            } else {
                cb(null, false);
            }
        }
    });
};
movieinfo.updateMoviePublisher= function (publisher,id,cb) {
    var sql = 'update movieinfo set publisher = ? where id = ?';
    var args = [publisher,id];
    dbClient.query(sql, args, function (err, res) {
        if (err !== null) {
            cb(err.message, null);
        } else {
            if (!!res && res.affectedRows > 0) {
                cb(null, true);
            } else {
                cb(null, false);
            }
        }
    });
};

movieinfo.updateMoviePrice = function (price,id,cb) {
    var sql = 'update movieinfo set price= ? where id = ?';
    var args = [price,id];
    dbClient.query(sql, args, function (err, res) {
        if (err !== null) {
            cb(err.message, null);
        } else {
            if (!!res && res.affectedRows > 0) {
                cb(null, true);
            } else {
                cb(null, false);
            }
        }
    });
};
movieinfo.updateMovieNum = function (number,id,cb) {
    var sql = 'update movieinfo set number = ? where id = ?';
    var args = [number,id];
    dbClient.query(sql, args, function (err, res) {
        if (err !== null) {
            cb(err.message, null);
        } else {
            if (!!res && res.affectedRows > 0) {
                cb(null, true);
            } else {
                cb(null, false);
            }
        }
    });
};
//更新订购后剩余量
movieinfo.updateMovieNum1 = function (id,cb) {
    var sql = 'update movieinfo set number = number - ? where id = ?';
    var args = [1,id];
    dbClient.query(sql, args, function (err, res) {
        if (err !== null) {
            cb(err.message, null);
        } else {
            if (!!res && res.affectedRows > 0) {
                cb(null, true);
            } else {
                cb(null, false);
            }
        }
    });
};

movieinfo.updateMovieCinema = function (cinema,id,cb) {
    var sql = 'update movieinfo set cinema = ? where id = ?';
    var args = [cinema,id];
    dbClient.query(sql, args, function (err, res) {
        if (err !== null) {
            cb(err.message, null);
        } else {
            if (!!res && res.affectedRows > 0) {
                cb(null, true);
            } else {
                cb(null, false);
            }
        }
    });
};

movieinfo.updateMovieValue = function (mvalue,id,cb) {
    var sql = 'update movieinfo set mvalue = ? where id = ?';
    var args = [mvalue,id];
    dbClient.query(sql, args, function (err, res) {
        if (err !== null) {
            cb(err.message, null);
        } else {
            if (!!res && res.affectedRows > 0) {
                cb(null, true);
            } else {
                cb(null, false);
            }
        }
    });
};

movieinfo.create=function(mname,startTime,endTime,publisher,language,cinema,price,number,mvalue,cb){
    var sql = 'insert into movieinfo' +
        '(mname,startTime,endTime,publisher,language,cinema,price,number,mvalue)' +
        ' values (?,?,?,?,?,?,?,?,?)';
    var args = [mname,startTime,endTime,publisher,language,cinema,price,number,mvalue];
    dbClient.insert(sql, args, function (err, res) {
        if (err !== null) {
            console.log(err);
            cb({code: err.number, msg: err.message}, null);
        }
        else {
            var userId = res.insertId;
            var user = {id: res.insertId,mname:mname,startTime:startTime,endTime:endTime,publisher:publisher,language:language,cinema:cinema,price:price,number:number,mvalue:mvalue};
            console.log(user);
            cb(null,user);
        }
    });
};