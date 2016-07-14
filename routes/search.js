/**
 * Created by Administrator on 2015/12/12 0012.
 */
var express = require('express');
var router = express.Router();
var user=require('../function/user');
var fiter=require('../fiter/fiter1');

router.get('/',fiter.authorize,fiter.adminer,function(req, res, next) {
    user.getUser(function(err,users){
        var title1=["查询用户","如需修改用户信息请点击修改"];
        var name=req.session.username;
        res.render('search', { req: req, title:[title1[0],title1[1],name],user:users});
    });
});

module.exports = router;