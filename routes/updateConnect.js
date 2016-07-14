/**
 * Created by Administrator on 2015/12/25 0025.
 */
var express = require('express');
var router = express.Router();
/* GET home page. */
var user=require('../function/user');
var fiter=require('../fiter/fiter1');
router.get('/',fiter.authorize,function(req,res,cb) {
    var id=req.session.aid,
        email=req.query['email'],
        realname=req.query['realname'],
        mobile=req.query['mobile'];
    var title1=["个人信息修改"];
    if (email !== null) {
        user.updateUserEmail(email,id,function (err, e) {
        });
    }
    if (realname !== null) {
        user.updateUserRealname(realname,id,function (err, e) {
        });
    }
    if (mobile !== null) {
        user.updateUserMob(mobile,id,function (err, e) {
        });
    }
    res.render('updateConnect', {title: [title1, null, req.session.username,id]});


});

module.exports = router;