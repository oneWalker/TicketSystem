var express = require('express');
var router = express.Router();
var user=require('../function/user');
router.get('/',function(req,res,cb){
    var username=req.query['username'],
        password=req.query['password'];
    var title1=["用户名不存在","密码错误","请输入用户名或密码"];
    if(username===undefined||username===null){
        //console.log("未输入");
        res.render('login',{title:null})

    }
    else {
        user.login(username, function (err, result) {
            if (result === null) {
                //console.log('用户名不存在');
                console.log(username);
                res.render('login', {title: [title1[0]]});
            }
            else if (result.username != username || result.password != password) {
                //console.log('密码错误')
                res.render('login', {title: [title1[1]]});
            }
            else if (result.username == username || result.password == password) {
                //console.log('登录成功');
                req.session.usergroup = result.usergroup;
                req.session.aid = result.id;
                req.session.username = result.username;
                req.session.isLogin = 1;
                req.session.cinema=result.cinema;
                user.updateLogin(result.username, function (err, a) {
                    var title1 = ["您当前角色为：管理员", "您当前角色为：顾客", "您当前角色为：电影院工作人员"];
                    var title2 = ["欢迎来到电影频道,请进行管理", "欢迎你来到电影频道并在我频道选购影片", "欢迎你使用电影频道平台"];
                    if (result.usergroup === 1) {
                        res.render('admin', {title: [title1[0], title2[0], req.session.username]});
                    }
                    else if (result.usergroup === 2) {
                        res.render('customer', {title: [title1[1], title2[1], req.session.username]});
                    }
                    else if (result.usergroup === 3) {
                        res.render('worker', {title: [title1[2], title2[2], req.session.username]});
                    }
                });
            }
        });
    }
});
module.exports = router;