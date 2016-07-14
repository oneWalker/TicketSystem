/**
 * Created by brian on 2016/1/3.
 */
var express = require('express');
var router = express.Router();
var fiter=require('../fiter/fiter1');
/* GET home page. */
var orderinfo=require('../function/orderinfo');
router.get('/',fiter.authorize,fiter.notCustomer,function(req,res,cb){
    var id=req.query['id'];
    var title1 = ["当前需要确认的订单："];
    if(req.session.usergroup!=3) {
        if (id != null) {
            orderinfo.updateValue(1, id, function (err, v) {
                orderinfo.orderTotal(0, function (err, users) {
                    cb(null, users);
                    res.render('confirm', {title: [title1, null, req.session.username], user: users});
                });
            })
        }
        else {
            orderinfo.orderTotal(0, function (err, users) {
                cb(null, users);
                res.render('confirm', {title: [title1, null, req.session.username], user: users});
            });
        }
    }
    else{
        if (id != null) {
            orderinfo.updateValue(1, id, function (err, v) {
                orderinfo.orderCinema(req.session.cinema,0, function (err, users) {
                    cb(null, users);
                    res.render('confirm', {title: [title1, null, req.session.username], user: users});
                });
            })
        }
        else {
            orderinfo.orderCinema(req.session.cinema,0, function (err, users) {
                cb(null, users);
                res.render('confirm', {title: [title1, null, req.session.username], user: users});
            });
        }
    }
});
module.exports = router;
