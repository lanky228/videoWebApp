
var config = require(process.cwd() + '/src/config.json');
var Log4j = require(process.cwd() + '/src/log/Log4j');

var mongodb = require('mongodb');
var util = require('util');
var log = new Log4j(__filename);
var DB_CONNECTION = {};

/**
 * 数据库基类
 */
module.exports = function () {
    /**
     * 获取表连接
     * @param tableName
     * @param callback
     */
    this.connection = function (tableName, callback) {
        var url = getUrl();
        var dbConnection = DB_CONNECTION[url];
        if (dbConnection) {
            dbConnection.collection(tableName, function (err, collection) {
                if (collection && callback) {
                    callback(collection);
                }
            });
            return;
        }
        mongodb.MongoClient.connect(url, function (err, db) {
            if(err){
                log.error(err);
                return;
            }
            if(db == null){
                log.error("数据库连接失败");
                return;
            }
            DB_CONNECTION[url] = db;
            if (!tableName) {
                log.error('表名未定义');
                return;
            }
            db.collection(tableName, function (err, collection) {
                if (collection && callback) {
                    callback(collection);
                }
            });
        });
    };

    /**
     * 查询单条记数据
     * @param tableName
     * @param condition
     * @param callback
     * @param fields
     */
    this.findOne = function (tableName, condition, callback, fields) {
        this.connection(tableName, function (collection) {
            var filter = getFilter(fields);
            collection.findOne(condition, filter, function (err, result) {
                if (err) {
                    log.error(err);
                    if (callback) {
                        callback(false);
                    }
                } else {
                    if (callback) {
                        callback(result);
                    }
                }
            });
        })
    };

    /**
     * 查询多条数据
     * @param tableName
     * @param condition
     * @param callback
     * @param fields
     * @param limit
     * @param skip
     * @param sort
     */
    this.find = function (tableName, condition, callback, fields, limit, skip, sort) {
        this.connection(tableName, function (collection) {
            var filter = getFilter(fields, limit, sort, skip);
            collection.find(condition, filter).toArray(function (err, result) {
                if (err) {
                    log.error(err);
                    if (callback) {
                        callback(false);
                    }
                } else {
                    if (callback) {
                        callback(result);
                    }
                }
            });
        })
    };

    /**
     * 插入多条数据
     * @param tableName
     * @param data
     * @param callback
     */
    this.insertMany = function (tableName, data, callback) {
        this.connection(tableName, function (collection) {
            collection.insertMany(data, function (err, result) {
                if (err) {
                    log.error(err);
                    if (callback) {
                        callback(false);
                    }
                } else {
                    if (callback) {
                        callback(getResult(result));
                    }
                }
            });
        });
    };

    /**
     * 更新数据
     * @param tableName
     * @param condition
     * @param data
     * @param isPart
     * @param callback
     */
    this.update = function (tableName, condition, data, isPart, callback) {
        var data = isPart ? { '$set': data } : data;
        this.connection(tableName, function (collection) {
            var filter = { 'multi': true };
            collection.update(condition, data, filter, function (err, result) {
                if (err) {
                    log.error(err);
                    callback(false);
                } else {
                    callback(getResult(result));
                }
            });
        })
    };

    /**
     * 删除数据
     * @param tableName
     * @param condition
     * @param callback
     */
    this.remove = function (tableName, condition, callback) {
        this.connection(tableName, function (collection) {
            collection.remove(condition, function (err, result) {
                if (err) {
                    log.error(err);
                    callback(false);
                } else {
                    callback(getResult(result));
                }
            });
        })
    };

    /**
     * 统计数据数量
     * @param tableName
     * @param condition
     * @param callback
     */
    this.count = function (tableName, condition, callback) {
        this.connection(tableName, function (collection) {
            collection.count(condition, function (err, count) {
                if (err) {
                    log.error(err);
                    callback(false);
                } else {
                    callback(count);
                }
            });
        })
    };

    /**
     * 查询参数
     * @returns {{}}
     */
    function getFilter() {
        var fields = arguments[0] ? arguments[0] : null;
        var limit = arguments[1] ? arguments[1] : 0;
        var sort = arguments[2] ? arguments[2] : null;
        var skip = arguments[3] ? arguments[3] : 0;

        var options = {};

        if (limit !== 0) {
            options.limit = limit;
        }
        if (skip !== 0) {
            options.skip = skip;
        }
        if (fields) {
            options.fields = fields;
        }
        if (sort) {
            options.sort = sort;
        }
        return options;
    }

    /**
     * 获取数据库地址
     * @returns {ServerResponse}
     */
    function getUrl() {
        var nameAndPassword = config.db.username && config.db.password ? util.format('%s:%s@', config.db.username, config.db.password) : '';
        var url = util.format('mongodb://%s%s:%s/%s',
            nameAndPassword,
            config.db.host,
            config.db.port,
            config.db.name);
        return url;
    }

    /**
     *解析返回值
     * @param result
     * @returns {boolean}
     */
    function getResult(result) {
        if (!result['result']) {
            return false;
        }
        if (result['result']['ok'] != 1) {
            return false;
        }
        if (result['result']['n'] < 1) {
            return false;
        }
        return true;
    }
};

//单元测试
if (typeof require.main.exports == 'function') {

    var MongoDB = require('./MongoDB');
    var mongoDB = new MongoDB();
    mongoDB.find('test', {}, function(result){
        console.log(result);
    });
    

    // mongoDB.insertMany('test', [{
    //     id: 1,
    //     name: 'name'
    // }]);
}