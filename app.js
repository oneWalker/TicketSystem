var express = require('express');
var app = express();

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');//用户注册
var login = require('./routes/login');//用户登录
var update = require('./routes/update');//修改个人密码
var m_update = require('./routes/m_update');//编辑用户
var add = require('./routes/add');//添加新用户（仅限管理员权限）
var delet=require('./routes/delet');//删除用户在查询界面（仅限管理员权限）
var search=require('./routes/search');//用户查询（仅限管理员权限）

var filmInfo=require('./routes/filmInfo');//查询电影信息(管理员和影院具有修改和删除电影的权利，普通用户只具有订购和修改的权利)
var filmdelete=require('./routes/filmdelete');//删除电影
var filmUpdate=require('./routes/filmUpdate');
var order=require('./routes/order');
var comments=require('./routes/comments');//评论电影
var addFilm=require('./routes/addFilm');//添加电影
var confirm=require('./routes/confirm');//确认订票信息 电影院方面
var updateOrder=require('./routes/updateOrder');

var updateConnect=require('./routes/updateConnect');//修改个人联系方式
var logout=require('./routes/logout');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
      secret:'12345',
      name:'testapp',
      resave:false,
      saveUninitialized:true
    }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/login',login);
app.use('/register',register);
app.use('/users', users);

app.use('/update',update);
app.use('/m_update',m_update);
app.use('/add',add);
app.use('/delet',delet);
app.use('/search',search);

app.use('/filmInfo',filmInfo);
app.use('/filmdelete',filmdelete);//
app.use('/filmUpdate',filmUpdate);
app.use('/order',order);
app.use('/comments',comments);
app.use('/addFilm',addFilm);
app.use('/confirm',confirm);
app.use('/updateOrder',updateOrder);

app.use('/updateConnect',updateConnect);
app.use('/logout',logout);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var server = app.listen(3000,function () {

  var host = server.address().address;
  var port = server.address().port;


  console.log('app listening at http://%s:%s', host, port)

});

//module.exports = app;
