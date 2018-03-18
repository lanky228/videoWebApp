var UserService = require(process.cwd() + '/src/module/user/UserService');

var express = require('express');
var router = express.Router();
var userService = new UserService();

router.post('/login', function (req, res) {
    userService.login(req.body.name, req.body.password, function (result) {
        if (!!!result || result.length == 0) {
            res.send({
                data: false
            });
            return;
        }
        var user = {
            name: req.body.name,
            age: req.body.password
        }
        req.session.user = user;
        res.send("success");
    });

});

router.post('/register', function (req, res) {
    userService.register(req.body.name, req.body.password);
    var user = {
        name: req.body.name,
        age: req.body.password
    }
    req.session.user = user;
    res.send("success");
});

module.exports = router;