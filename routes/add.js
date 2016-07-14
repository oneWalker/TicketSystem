/**
 * Created by brian on 2015/12/12.
 */
var express = require('express');
var router = express.Router();
/* GET home page. */
var user=require('../function/user');
var fiter=require('../fiter/fiter1');
router.get('/',fiter.authorize,fiter.adminer,function(req,res,cb) {
    var username = req.query['username'],
        password = req.query['password'],
        usergroup = req.query['usergroup'],
        cinema=req.query['cinema'],
        realname = req.query['realname'];
    if(usergroup!=3){ cinema=0;}
    var name=req.session.username;
    var title1=["添加新用户","请填写该页面所有选项","用户名已存在！","添加成功！","请填写信息！"];
    //向数据库中插入数据
    if(username===undefined){
        //console.log("未输入");
        res.render('add', {title: [title1[0],title1[1],name,null]});
    }else {
        user.getUserByUserName(username, function (err, result) {
            if (result != null) {
                res.render('add', {title: [title1[0], title1[1], name, title1[2]]});
            }
            else {
                user.createUser(username, password, usergroup, realname,cinema, function (err, a) {
                    res.render('add', {title: [title1[0], title1[1], name, title1[3]]});
                });
            }
        });
    }
});

module.exports = router;