var Log4j = require(process.cwd() + '/src/log/Log4j');
var MongoDB = require(process.cwd() +  '/scr/db/MongoDB');

var mongoDB = new MongoDB();
var log = new Log4j(__filename);

log.error('test');
log.error('test');
console.log(process.cwd());
mongoDB.getUrl();
var mongoDB = new MongoDB();
mongoDB.find(null, null, null, null);