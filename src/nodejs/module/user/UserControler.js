var express = require('express');
var router = express.Router();

router.get('/login', function (req, res) {
    var user = {
        name: "Chen-xy",
        age: "22",
        address: "bj"
    }
    req.session.user = user;
    res.send("success");
});

module.exports = router;