/**
 * Created by brian on 2016/1/3.
 */
var express = require('express');
var router = express.Router();
var fiter=require('../fiter/fiter1');
/* GET home page. */
var movieinfo=require('../function/movieinfo');
router.get('/',fiter.authorize,fiter.adminer,function(req,res,cb){
    var ID=req.query['id'];
    movieinfo.getMovieByID(ID,function(err,result) {
        var title1=["您当前要修改的影片信息为："];
        var ID=req.query['id'];
        var mname = result.name;
        var startTime = req.query['startTime'],
            endTime =  req.query['endTime'],
            language =  req.query['language'],
            publisher =  req.query['publisher'],
            cinema=req.query['cinema'],
            price = req.query['price'],
            number = req.query['number'],
            mvalue = req.query['mvalue'];
        if (startTime != null) {
          movieinfo.updateStart(startTime,ID,function(err,e){});
        }
        if (endTime != null) {
            movieinfo.updateMoviendTime(endTime,ID,function(err,e){});
        }
        if (language != null) {
            movieinfo.updateMovieLang(language,ID,function(err,e){});
        }
        if (publisher != null) {
            movieinfo.updateMoviePublisher(publisher,ID,function(err,e){});
        }
        if (cinema != null) {
            movieinfo.updateMovieCinema(cinema,ID,function(err,e){});
        }
        if (price != null) {
            movieinfo.updateMoviePrice(price,ID,function(err,e){});
        }
        if (number != null) {
            movieinfo.updateMovieNum(number,ID,function(err,e){});
        }
        if (mvalue != null) {
            movieinfo.updateMovieValue(mvalue,ID,function(err,e){});
        }
        res.render('filmUpdate', {title: [title1, null, req.session.username,mname,ID]});
    });
});
module.exports = router;