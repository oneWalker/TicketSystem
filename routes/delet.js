var express = require('express');
var router = express.Router();
var fiter=require('../fiter/fiter1');
/* GET home page. */
var user=require('../function/user');
router.get('/',fiter.authorize,fiter.adminer,function(req,res,cb){
    var id=req.query['id'];
    var title1=["删除成功"]
    //从数据库中进行删除
    user.deleteById(id,function(err,res){
    });
    res.render('delet',{title:title1});
});

module.exports = router;
