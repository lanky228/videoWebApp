var config = require(process.cwd() + '/src/config.json');
var Log4j = require(process.cwd() + '/src/log/Log4j');
var Network = require(process.cwd() + '/src/util/Network');
var userControler = require(process.cwd() + '/src/module/user/UserControler');

var express = require('express');
var log = new Log4j();
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var bodyParser = require("body-parser");
/**
 * 路由
 */
module.exports = function () {
    this.app = express();
    this.init = function () {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        //静态文件路径
        this.app.use('/public', express.static('public'));
        //记录访问url
        log.use(this.app);
        //session
        this.app.use(session({
            name: 'skey',
            secret: 'secret', // 用来对session id相关的cookie进行签名
            store: new FileStore(), // 本地存储session（文本文件，也可以选择其他store，比如redis的）
            saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
            resave: false, // 是否每次都重新保存会话，建议false
            cookie: {
                maxAge: 3 * 60 * 60 * 1000 // 有效期，单位是毫秒
            }
        }));
        //路由
        this.app.use(function (req, res, next) {
            if (req.session.user) {  // 判断用户是否登录
                next();
            } else {
                // 解析用户请求的路径
                var arr = req.url.split('/');
                // 去除 GET 请求路径上携带的参数
                for (var i = 0, length = arr.length; i < length; i++) {
                    arr[i] = arr[i].split('?')[0];
                }
                if (arr.length > 2 && arr[1] == 'user' && (arr[2] == 'register' || arr[2] == 'login' || arr[2] == 'logout')) {
                    next();
                } else {
                    // 登录拦截
                    req.session.originalUrl = req.originalUrl ? req.originalUrl : null;  // 记录用户原始请求路径
                    res.redirect("/public/page/login.html");
                    // res.sendFile(process.cwd() + "/public/page/login.html");
                }

            }
        });
        this.app.get('', function (req, res) {
            res.sendFile(__dirname + "/index.html");
        });
        this.app.use("/user", userControler);
    };
    this.startServer = function () {
        var host = Network.getIpv4();
        var server = this.app.listen(config.server.port, function () {
            var port = server.address().port;
            console.log("应用实例，访问地址为 http://%s:%s", host, port);
        });
    };
};