var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const fs = require('fs');
var https = require('https');

// 根据项目的路径导入生成的证书文件下面的key和pem是下载证书得到的
var key_ = fs.readFileSync('./SSL/liuyian.online.key', 'utf8');
var cert_ = fs.readFileSync('./SSL/liuyian.online_bundle.crt', 'utf8');
const opt = { key:key_, cert:cert_ };

let opts = {
  prx: fs.readFileSync('./SSL/liuyian.online.pfx', 'utf8'),
  passphrase:"4uu7135l2fq"
}

var app = express();



// 解决跨域问题
app.all("*", function (req, res, next) {
  // 设置允许跨域的域名,*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', '*');
  // 允许的header类型
  res.header('Access-Control-Allow-Headers', 'content-type');
  // 跨域允许的请求方式
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
  if (req.method.toLowerCase() == 'options')
    res.send(200); // 让options 尝试请求快速结束
  else
    next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



// var httpsServer = https.createServer(opt, app);
var httpsServer = https.createServer(opt, app);

//https监听8080端口
// httpsServer.listen(8888, "10.0.12.3");
// app.use(8080,127.0.0.1);

var hostIP = "127.0.0.1"
httpsServer.listen(8888,hostIP);


app.listen(8080,hostIP);
// 127.0.0.1:8888
// http://172.30.210.46:2000/
module.exports = app;
// https://lya0728.github.io/together_for_a_shared_future/
