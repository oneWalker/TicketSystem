var express = require('express');
var router = express.Router();
var movieinfo=require('../function/movieinfo');
var fiter=require('../fiter/fiter1');
var moment=require('moment');

router.get('/',fiter.authorize,function(req, res, next) {
    var startTime =moment().format('YYYY-MM-DD HH:mm:ss');
    movieinfo.getMovie(startTime,function(err,users){
        var title1=["查询所有电影状态","如需修改请进行修改"];
        var name=req.session.username;
        res.render('filmInfo', { req: req, title:[title1[0],title1[1],name],user:users});
    });
});

module.exports = router;
