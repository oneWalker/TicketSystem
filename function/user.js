var dbClient = require('../app/dbpool/mysql/dbClient').getdbClient();
var user = module.exports;
//var logRecords = require('../const/logRecords');
var consts = require('../app/const/globalConsts');
var moment=require('moment');

/**
 * Get userInfo by username
 * @param {String} username
 * @param {function} cb
 */
//登陆函数
user.login = function (username, cb) {
    var sql = 'select * from user where username = ?';
    var args = [username];
    dbClient.query(sql,args, function (err, res) {
        // console.log(err);
        //console.log('login---2 %j %j',err,res);
        //console.log(args);
        if (err !== null) {
            cb(err, null);
        } else {
            if (!!res && res.length === 1) {
                var rs = res[0];
                var user = {id: rs.id,usergroup:rs.usergroup,username: rs.username, password: rs.password,cinema:rs.cinema}
                //console.log(user);
                cb(null,user);
            }
            else
            {
                cb(null,null);
            }
        }
    });
};
//删除用户通过ID
user.deleteById = function (id, cb){
    var sql = 'delete from user where id = ?';
    var args = [id];
    dbClient.delete(sql, args, function (err, res) {
        if (err !== null) {
            cb(err, null);
            console.log(err);
        }
        else {
            console.log('aaaaa');
            cb(null, res);
        }
    });
};
//返回表里面的所有的用户数据并进行存储
user.getUser = function (cb) {
    var sql = 'select * from user ';
    var args=[];
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
/**
 * Create a new user
 * @param (String) username
 * @param {String} password
 * @param {String} from Register source
 * @param {function} cb Call back function.
 */
user.createUser = function (username, password,usergroup,realname,cinema,cb) {
    var sql = 'insert into user' +
        '(username,password,usergroup,realname,cinema,createtime)' +
        ' values (?,?,?,?,?,?)';
    var createTime =moment().format('YYYY-MM-DD HH:mm:ss');
    // var createTime =Date.now();
    console.log(createTime);
    var args = [username,password,usergroup,realname,cinema,createTime];
    dbClient.insert(sql, args, function (err, res) {
        if (err !== null) {
            console.log(err);
            cb({code: err.number, msg: err.message}, null);
        }
        else {
            var userId = res.insertId;
            var user = {id: res.insertId, username: username, password: password,usergroup:usergroup,realname:realname,cinema:cinema,creatime:createTime};
            console.log(user);
            //logRecords.info(consts.LogServerName.CreateUser,user);
            cb(null,user);
        }
    });
};
//注册用户函数
user.register=function(email,username,password,cb){
    var sql = 'insert into user' +
        '(email,username,usergroup,password,loginCount,cinema,createTime)' +
        ' values (?,?,?,?,?,?,?)';
    var createTime =moment().format('YYYY-MM-DD HH:mm:ss');
    var usergroup=2;
    var loginCount=0;
    var cinema=0;
    var args = [email,username,usergroup,password,loginCount,cinema,createTime];
    dbClient.insert(sql, args, function (err, res) {
        if (err !== null) {
            console.log(err);
            cb({code: err.number, msg: err.message}, null);
        }
        else {
            var userId = res.insertId;
            var user = {id: res.insertId,email:email, username: username,usergroup:usergroup,password: password, loginCount:loginCount,cinema:cinema,creatime:createTime};
            console.log(user);
            //logRecords.info(consts.LogServerName.CreateUser,user);
            cb(null,user);
        }
    });
};

//从数据库更新数据
user.updateUserName = function (username,id,cb) {
    var sql = 'update user set username = ? where id = ?';
    var args = [username,id];
    console.log(args);
    dbClient.query(sql, args, function (err, res) {
        if (err !== null) {
            cb(err.message, null);
        } else {
            if (!!res && res.affectedRows > 0) {
                cb(null, true);
            } else {
                logger.error('update username failed!');
                cb(null, false);
            }
        }
    });
};

user.updateUserPass= function (password,id,cb) {
    var sql = 'update user set password = ? where id = ?';
    var args = [password,id];
    console.log(args);
    dbClient.query(sql, args, function (err, res) {
        if (err !== null) {
            cb(err.message, null);
        } else {
            if (!!res && res.affectedRows > 0) {
                cb(null, true);
            } else {
                // logger.error('update userpassword failed!');
                cb(null, false);
            }
        }
    });
};

user.updateUserEmail = function (email,id,cb) {
    var sql = 'update user set email = ? where id = ?';
    var args = [email,id];
    console.log(args);
    dbClient.query(sql, args, function (err, res) {
        if (err !== null) {
            cb(err.message, null);
        } else {
            if (!!res && res.affectedRows > 0) {
                cb(null, true);
            } else {
                //logger.error('update user failed!');
                cb(null, false);
            }
        }
    });
};

user.updateUserGroup = function (usergroup,id,cb) {
    var sql = 'update user set usergroup = ? where id = ?';
    var args = [usergroup,id];
    console.log(args);
    dbClient.query(sql, args, function (err, res) {
        if (err !== null) {
            cb(err.message, null);
        } else {
            if (!!res && res.affectedRows > 0) {
                cb(null, true);
            } else {
                // logger.error('update user failed!');
                cb(null, false);
            }
        }
    });
};

user.updateUserRealname = function (realname,id,cb) {
    var sql = 'update user set realname = ? where id = ?';
    var args = [realname,id];
    console.log(args);
    dbClient.query(sql, args, function (err, res) {
        if (err !== null) {
            cb(err.message, null);
        } else {
            if (!!res && res.affectedRows > 0) {
                cb(null, true);
            } else {
                //logger.error('update realname failed!');
                cb(null, false);
            }
        }
    });
};

user.updateUserMob = function (mobile,id,cb) {
    var sql = 'update user set tel = ? where id = ?';
    var args = [mobile,id];
    console.log(args);
    dbClient.query(sql, args, function (err, res) {
        if (err !== null) {
            cb(err.message, null);
        } else {
            if (!!res && res.affectedRows > 0) {
                cb(null, true);
            } else {
                // logger.error('update user failed!');
                cb(null, false);
            }
        }
    });
};

user.updateLogin = function (username,cb) {
    var sql = 'update user set loginCount=loginCount + ? where username = ?';
    var args = [1,username];
    console.log(args);
    dbClient.query(sql, args, function (err, res) {
        if (err !== null) {
            cb(err.message, null);
        } else {
            if (!!res && res.affectedRows > 0) {
                cb(null, true);
            } else {
                // logger.error('update userLoginCount failed!');
                cb(null, false);
            }
        }
    });
};
user.updateUserCinema=function(cinema,id,cb){
    var sql = 'update user set cinema = ? where id = ?';
    var args = [cinema,id];
    console.log(args);
    dbClient.query(sql, args, function (err, res) {
        if (err !== null) {
            cb(err.message, null);
        } else {
            if (!!res && res.affectedRows > 0) {
                cb(null, true);
            } else {
                // logger.error('update user failed!');
                cb(null, false);
            }
        }
    });
};
//通过Email查询所有信息
user.getUserByEmail= function (email, cb) {
    var sql = 'select * from user where email = ?';
    var args = [email];
    dbClient.query(sql,args, function (err, res) {
        if (err !== null) {
            cb({code: err.number, msg: err.message}, null);
        } else {
            if(res.length>0) {
                var rs = res[0];//第一条记录（所有属性值组成的一条记录）
                var user = {id: rs.id, name: rs.username, password: rs.password, email: rs.email};
                cb(null, user);
            }
            else{
                cb(null,null);
            }
            }
    });
};
//通过用户名查询所有对应信息
user.getUserByUserName = function (username, cb) {
    var sql = 'select * from user where username = ?';
    var args = [username];
    dbClient.query(sql,args, function (err, res) {
        if (err !== null) {
            cb({code: err.number, msg: err.message}, null);
        } else {
            if (!!res && res.length === 1) {
                var rs = res[0];//第一条记录（所有属性值组成的一条记录）
                var user = {id: rs.id, name: rs.username, password: rs.password};
                console.log(user);
                cb(null, user);
            } else {
                cb(null, null);
            }
        }
    });
};
//通过Id查询所有信息相应信息
user.getUserByID = function (id, cb) {
    var sql = 'select * from user where id = ? ';
    var args = [id];
    dbClient.query(sql,args, function (err, res) {
        console.log(args);
        if (err !== null) {
            cb({code: err.number, msg: err.message}, null);
        } else {
            if (!!res && res.length === 1) {
                var rs = res[0];//第一条记录（所有属性值组成的一条记录）
                var user = {id: rs.id, name: rs.username, password: rs.password,usergroup:rs.usergroup,realname:rs.realname};
                console.log(user);
                cb(null, user);
            } else {
                cb(null, null);
            }
        }
    });
};
