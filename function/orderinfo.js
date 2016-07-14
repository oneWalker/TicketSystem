/**
 * Created by brian on 2016/1/3.
 */
var dbClient = require('../app/dbpool/mysql/dbClient').getdbClient();
var orderinfo = module.exports;
var consts = require('../app/const/globalConsts');
var moment=require('moment');

orderinfo.createOrder=function(mid,uid,username,mname,price,mvalue,cinema,startTime,cb){
    var sql = 'insert into orderinfo' +
        '(mid,uid,username,mname,price,mvalue,cinema,startTime,value)' +
        ' values (?,?,?,?,?,?,?,?,?)';
    var value=0;
    var args = [mid,uid,username,mname,price,mvalue,cinema,startTime,value];
    dbClient.insert(sql, args, function (err, res) {
        if (err !== null) {
            console.log(err);
            cb({code: err.number, msg: err.message}, null);
        }
        else {
            var userId = res.insertId;
            var user = {id: res.insertId,mid:mid,uid:uid,username:username,mname:mname,price:price,mvalue:mvalue,cinema:cinema,startTime:startTime,value:value};
            console.log(user);
            cb(null,user);
        }
    });
};

//个人订购列表查询
orderinfo.orderTotal1=function(uid,cb){
    var sql='SELECT * from orderinfo where uid = ?;'
    var args = [uid];
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

//总的未确认的订单的查询
orderinfo.orderTotal=function(value,cb){
    if(value!=null){
    var sql='SELECT * from orderinfo where value = ?;'
    var args = [value];
    }
    else{
        var sql='SELECT * from orderinfo;'
        var args = [];
    }
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
//电影院工作人员查询到的状态
orderinfo.orderCinema=function(cinema,value,cb){
    if(value!=null){
        var sql='SELECT * from orderinfo where cinema = ? and value = ?;'
        var args = [cinema,value];
    }
    else{
        var sql='SELECT * from orderinfo where cinema = ?;'
        var args = [cinema];
    }
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

   orderinfo.updateValue=function(value,id,cb ){
       var sql = 'update orderinfo set value = ? where id = ?';
       var args = [value,id];
       console.log(args);
       dbClient.query(sql, args, function (err, res) {
           if (err !== null) {
               cb(err.message, null);
           } else {
               if (!!res && res.affectedRows > 0) {
                   cb(null, true);
               } else {
                   logger.error('update value failed!');
                   cb(null, false);
               }
           }
       });
   };