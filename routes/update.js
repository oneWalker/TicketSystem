/*密码修改*/
var express = require('express');
var router = express.Router();
var user=require('../function/user');
var fiter=require('../fiter/fiter1');
router.get('/',fiter.authorize,function(req,res,cb){
    var id=req.session.aid,
        password=req.query['password'],
        r_password=req.query['r_password'];//验证密码
    var title1=["密码修改"];
    if(password===undefined){
        console.log('??');
        console.log(password,r_password);
        res.render('update', {title: [title1,null,req.session.username,id]})
    }else {
        if (r_password === password) {
            user.updateUserPass(password, id, function (err, a) {
                res.send("修改成功!");
            });
        } else {
            console.log("?");
            res.send("两次密码不一致!");
        }
    }
});

module.exports = router;