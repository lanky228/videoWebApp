var MongoDB = require(process.cwd() + '/src/db/MongoDB');
var mongoDB = new MongoDB();
module.exports = function () {
    this.register = function (name, password) {
        mongoDB.insertMany('user', [{
            name: name,
            password: password
        }]);
    };
    this.login = function(name, password, callback){
        mongoDB.find('user', {
            name: name,
            password: password
        }, callback);
    };
};


//单元测试
if (typeof require.main.exports == 'function') {
    // var UserService = require('./UserService');
    // var userService = new UserService();
    UserService.register('123', '4567');
    mongoDB.find('user', {}, function (result) {
        console.log(result);
    });
}