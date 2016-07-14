var express = require('express');
var router = express.Router();
var fiter=require('../fiter/fiter1');
/* GET home page. */


router.get('/',fiter.authorize,function(req, res, next) {
   res.send('你没有此权限，请返回');
  //var title1=["您无此权限！"]
  //res.render('index', { req: req, title:[title1,null,req.session.username] });
});

module.exports = router;
