
var Log4j = require('../log/Log4j');
var log = new Log4j(__filename);
log.error('test');
log.error('test');

console.log(process.cwd());


var MongoDB = require('../../db/MongoDB');
var mongoDB = new MongoDB();
mongoDB.getUrl();

var MongoDB = require('../../db/MongoDB');
var mongoDB = new MongoDB();
mongoDB.find(null, null, null, null);