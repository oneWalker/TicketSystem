/**
 * Created by brian on 2016/1/4.
 */
var express = require('express');
var router = express.Router();
var fiter=require('../fiter/fiter1');
/* GET home page. */
var orderinfo=require('../function/orderinfo');
router.get('/',fiter.authorize,fiter.notCustomer,function(req,res,cb){
    var id=req.query['id'];
    var value =req.query["value"];
    var title1 = ["当前所有的的订单："];
    if(req.session.usergroup != 3) {
        if (id != null) {
            if (value == 0) {
                orderinfo.updateValue(0, id, function (err, v) {
                    orderinfo.orderTotal(null, function (err, users) {
                        cb(null, users);
                        res.render('updateOrder', {title: [title1, null, req.session.username], user: users});
                    });
                })
            }
            if (value == 1) {
                orderinfo.updateValue(1, id, function (err, v) {
                    orderinfo.orderTotal(null, function (err, users) {
                        cb(null, users);
                        res.render('updateOrder', {title: [title1, null, req.session.username], user: users});
                    });
                })
            }
            if (value == 2) {
                orderinfo.updateValue(2, id, function (err, v) {
                    orderinfo.orderTotal(null, function (err, users) {
                        cb(null, users);
                        res.render('updateOrder', {title: [title1, null, req.session.username], user: users});
                    });
                })
            }
        }
        else {
            orderinfo.orderTotal(null, function (err, users) {
                cb(null, users);
                res.render('updateOrder', {title: [title1, null, req.session.username], user: users});
            });
        }
    }
    else{
        if (id != null) {
            if (value == 0) {
                orderinfo.updateValue(0, id, function (err, v) {
                    orderinfo.orderCinema(req.session.cinema,null, function (err, users) {
                        cb(null, users);
                        res.render('updateOrder', {title: [title1, null, req.session.username], user: users});
                    });
                })
            }
            if (value == 1) {
                orderinfo.updateValue(1, id, function (err, v) {
                    orderinfo.orderCinema(req.session.cinema,null, function (err, users) {
                        cb(null, users);
                        res.render('updateOrder', {title: [title1, null, req.session.username], user: users});
                    });
                })
            }
            if (value == 2) {
                orderinfo.updateValue(2, id, function (err, v) {
                    orderinfo.orderCinema(req.session.cinema,null, function (err, users) {
                        cb(null, users);
                        res.render('updateOrder', {title: [title1, null, req.session.username], user: users});
                    });
                })
            }
        }
        else {
            orderinfo.orderCinema(req.session.cinema,null, function (err, users) {
                cb(null, users);
                res.render('updateOrder', {title: [title1, null, req.session.username], user: users});
            });
        }
    }
});
module.exports = router;
