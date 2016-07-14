var dbClient = require('../app/dbpool/mysql/dbClient').getdbClient();
var commentsinfo = module.exports;
var consts = require('../app/const/globalConsts');
var moment=require('moment');
commentsinfo.create=function(uid,username,mname,comments,cb){
    var sql = 'insert into commentsinfo' +
        '(uid,username,mname,comments)' +
        ' values (?,?,?,?)';
    var args = [uid,username,mname,comments];
    dbClient.insert(sql, args, function (err, res) {
        if (err !== null) {
            console.log(err);
            cb({code: err.number, msg: err.message}, null);
        }
        else {
            var userId = res.insertId;
            var user = {id: res.insertId,uid:uid,username:username,mname:mname,comments:comments};
            console.log(user);
            cb(null,user);
        }
    });
};
commentsinfo.commentsTotal=function(mname,cb){
        var sql = 'select * from commentsinfo where mname = ? ';
        var args=[mname];
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
