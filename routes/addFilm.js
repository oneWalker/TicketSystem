/**
 * Created by brian on 2016/1/3.
 */
var express = require('express');
var router = express.Router();
/* GET home page. */
var movieinfo=require('../function/movieinfo');
var fiter=require('../fiter/fiter1');
router.get('/',fiter.authorize,fiter.notCustomer,function(req,res,cb) {
    var mname = req.query['mname'],
        startTime = req.query['startTime'],
        endTime = req.query['endTime'],
        publisher=req.query['publisher'],
        language = req.query['language'],
        cinema = req.query['cinema'],
        price = req.query['price'],
        number=req.query['number'],
        mvalue=req.query['number'];
    if(req.session.usergroup===3){ cinema = req.session.cinema;}
    var name=req.session.username;
    var title1=["添加新电影","请填写该页面所有选项","添加电影成功！","请填写信息！"];
    movieinfo.create(mname,startTime,endTime,publisher,language,cinema,price,number,mvalue,function(err,result){
        res.render('addFilm', {title: [title1[0], title1[1], name, title1[3]]});
    });
});

module.exports = router;