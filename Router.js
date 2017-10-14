var express = require('express');
var config = require('./src/nodejs/config.json');
var Log4j = require('./src/nodejs/log/Log4j');
var Network = require('./src/nodejs/util/Network');
var log = new Log4j();
/**
 * 路由
 */
module.exports = function () {
    this.app = express();
    this.init = function () {
        //静态文件路径
        this.app.use('/public', express.static('public'));
        //记录访问url
        log.use(this.app);
        //路由
        this.app.get('', function (req, res) {
            res.sendFile(__dirname + "/index.html");
        })

    };
    this.startServer = function () {
        var host = Network.getIpv4();
        var server = this.app.listen(config.server.port, function () {
            var port = server.address().port;
            console.log("应用实例，访问地址为 http://%s:%s", host, port);
        });
    };
};