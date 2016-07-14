/**
 * Created by brian on 2016/1/3.
 */
var express = require('express');
var router = express.Router();
var fiter=require('../fiter/fiter1');
/* GET home page. */
var movieinfo=require('../function/movieinfo');
var commentsinfo=require('../function/commentsinfo');
var moment=require('moment');
router.get('/',fiter.authorize,function(req,res,cb){
    var name=req.query['name'],
        comments=req.query['comments'];
    console.log(name);
    if(name!=null) {
        if (comments != null) {
            commentsinfo.create(req.session.aid, req.session.username, name, comments, function (err, e) {
                commentsinfo.commentsTotal(name, function (err, users) {
                    res.render('comments', {title: [null, null, req.session.username, name], user: users});
                });
            });
        } else {
            commentsinfo.commentsTotal(name, function (err, users) {
                res.render('comments', {title: [null, null, req.session.username, name], user: users});
            });
        }
    }
    else{
        var startTime =moment().format('YYYY-MM-DD HH:mm:ss');
        movieinfo.getMovie(startTime,function(err,users){
            var title1=["查询所有电影状态","如需修改请进行修改"];
            var name=req.session.username;
            res.render('filmInfo', { req: req, title:[title1[0],title1[1],name],user:users});
        });
    }
});
module.exports = router;
