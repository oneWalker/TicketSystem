/**
 * Created by brian on 2016/1/3.
 */
var express = require('express');
var router = express.Router();
var fiter=require('../fiter/fiter1');
/* GET home page. */
var movieinfo=require('../function/movieinfo');
var orderinfo=require('../function/orderinfo');
router.get('/',fiter.authorize,function(req,res,cb){
   var id=req.query['id'];
   var title1 = ["您当前订购的所有影片的信息为："];
    if(id!=null){
        movieinfo.getMovieByID(id, function (err, result) {
        orderinfo.createOrder(id, req.session.aid, req.session.username, result.name, result.price, result.value, result.cinema, result.startTime, function (err, e) {
            orderinfo.orderTotal1(req.session.aid, function (err, users) {
                cb(null, users);
                res.render('order', {title: [title1, null, req.session.username], user: users});
            });
        });
    });}
    else {
        orderinfo.orderTotal1(req.session.aid, function (err, users) {
            cb(null, users);
            res.render('order', {title: [title1, null, req.session.username], user: users});
        });
    }
});
module.exports = router;
