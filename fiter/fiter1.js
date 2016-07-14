/**
 * Created by brian on 2015/12/15.
 */
exports.authorize = function (req, res, next) {
    //命令解析
    if (!req.session.isLogin) {
        res.redirect('login');
        return;
    }
    next();
};

exports.adminer=function(req,res,next){
    if(req.session.usergroup!=1){
        console.log('未拥有此权限！');
        res.redirect('/');
        return;
    }
    next();
};

exports.notCustomer=function(req,res,next){
    if(req.session.usergroup == 2){
        console.log('未拥有此权限！');
        res.redirect('/');
        return;
    }
    next();
};

