/**
 * Created by brian on 2015/12/12.
 */
var express = require('express');
var router = express.Router();
var fiter=require('../fiter/fiter1');
/* GET home page. */
var user=require('../function/user');
router.get('/',fiter.authorize,fiter.adminer,function(req,res,cb){
    var ID=req.query['id'];
    user.getUserByID(ID,function(err,result) {
        var title1=["您当前要修改的用户为："];
        var ID=req.query['id'];
        var username = result.name;
        var usergroup = req.query['usergroup'],
            cinema=req.query['cinema'],
            realname = req.query['realname'];
        if (usergroup != null) {
            user.updateUserGroup(usergroup, ID, function (err, e) {
            });
        }
        if (realname != null) {
            user.updateUserRealname(realname, ID, function (err, e) {
            });
        }
        if(usergroup===3){
            user.updateUserCinema(cinema,ID,function(err,e){});
        }
        res.render('m_update', {title: [title1, null, req.session.username,username,ID]});
    });
});

module.exports = router;