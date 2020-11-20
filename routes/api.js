var express = require('express');
var router = express.Router();

router.get('/', function(res, req, next) {
    console.log("entre dans api");
    res.send('Entrer dans /post');
});

module.exports = router;