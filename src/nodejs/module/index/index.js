var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    // res.sendFile(__dirname + '/./../../main.js');
    res.sendFile('index1.js');
    // res.sendfile("./../../../public/index.html");
});

module.exports = router;