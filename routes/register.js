var express = require('express');
var router = express.Router();
var user = require('../function/user');
router.get('/', function (req, res, cb) {
    var email = req.query['email'],
        username = req.query['username'],
        password = req.query['password'],
        repassword = req.query['repassword'];
    var title1 = ["邮箱已经被注册", "用户名已存在！", "两次密码不一致，请重新输入", "注册成功请前往登录"];
    if (username === undefined || username === null) {
        //console.log("未输入");
        res.render('register', {title: null});
    }
    else {
        if (repassword != password) {
            res.render('register', {title: [title1[2]]});
        } else {
            user.getUserByEmail(email, function (err, res1) {
                if (res1 != null) {
                    res.render('register', {title: [title1[0]]});
                }
                else {
                    user.getUserByUserName(username, function (err, result) {
                        if (result != null) {
                            res.render('register', {title: [title1[1]]});
                        }
                        else {
                            user.register(email, username, password, function (err, results) {
                                res.render('register', {title: [title1[3]]});
                            });
                        }
                    });
                }
            });
        }
    }

});
module.exports = router;