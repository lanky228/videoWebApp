var express = require('express');
var router = express.Router();
var MongoDB = require('../../db/MongoDB');
var Log4j = require('../../log/Log4j');
var log = new Log4j(__filename);

/* GET home page. */
router.get('/', function (req, res, next) {
    var mongoDB = new MongoDB();
    mongoDB.insertMany('test', [{
        id: 1,
        name: 'name'
    }]);
    log.info('test2');
    res.send("index");
});

module.exports = router;