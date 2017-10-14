var log4js = require('log4js');

/**
 * 配置参数
 */
log4js.configure({
    appenders: {
        yearLog: {
            type: "dateFile",
            filename: process.cwd() + '/logs/dateFileLog/year/',//您要写入日志文件的路径
            alwaysIncludePattern: true,//（默认为false） - 将模式包含在当前日志文件的名称以及备份中
            pattern: "yyyy.log",//（可选，默认为.yyyy-MM-dd） - 用于确定何时滚动日志的模式。格式:.yyyy-MM-dd-hh:mm:ss.log
        },
        errorLog: {
            type: "dateFile",
            filename: process.cwd() + '/logs/dateFileLog/error/',//您要写入日志文件的路径
            alwaysIncludePattern: true,//（默认为false） - 将模式包含在当前日志文件的名称以及备份中
            pattern: "yyyy-MM-dd.log",//（可选，默认为.yyyy-MM-dd） - 用于确定何时滚动日志的模式。格式:.yyyy-MM-dd-hh:mm:ss.log
        },
        infoLog: {
            type: "dateFile",
            filename: process.cwd() + '/logs/dateFileLog/info/',//您要写入日志文件的路径
            alwaysIncludePattern: true,//（默认为false） - 将模式包含在当前日志文件的名称以及备份中
            pattern: "yyyy-MM-dd.log",//（可选，默认为.yyyy-MM-dd） - 用于确定何时滚动日志的模式。格式:.yyyy-MM-dd-hh:mm:ss.log
        },
        accessLog: {
            type: "dateFile",
            filename: process.cwd() + '/logs/dateFileLog/access/',//您要写入日志文件的路径
            alwaysIncludePattern: true,//（默认为false） - 将模式包含在当前日志文件的名称以及备份中
            pattern: "yyyy-MM-dd.log",//（可选，默认为.yyyy-MM-dd） - 用于确定何时滚动日志的模式。格式:.yyyy-MM-dd-hh:mm:ss.log
        }
    },
    categories: {
        default: {
            appenders: ['yearLog'],
            level: log4js.levels.ALL
        },
        errorLog: {
            appenders: ['errorLog'],
            level: log4js.levels.ALL
        },
        infoLog: {
            appenders: ['infoLog'],
            level: log4js.levels.ALL
        },
        accessLog: {
            appenders: ['accessLog'],
            level: log4js.levels.ALL
        }
    }
});

/**
 * 日志
 */
module.exports = Log4j = function (url) {
    this.url = url;
    this.yearLog = log4js.getLogger('yearLog');
    this.errorLog = log4js.getLogger('errorLog');
    this.infoLog = log4js.getLogger('infoLog');
    this.accessLog = log4js.getLogger('accessLog');
    this.init = function (data) {
        data = this.url + '\n\t' + data;
        this.yearLog.error(data);
        return data;
    };
    //错误
    this.error = function (data) {
        data = this.init(data);
        this.errorLog.error(data);
    };
    //信息
    this.info = function (data) {
        data = this.init(data);
        this.infoLog.info(data);
    };
    this.use = function (app) {
        app.use(log4js.connectLogger(this.accessLog, {level: 'debug', format: ':method :url'}));
    };
};

