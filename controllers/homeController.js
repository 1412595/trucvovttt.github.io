var express = require('express');

var router = express.Router();
var blogRepo = require('../repos/blogRepo');

router.get('/', (req, res) => {
    blogRepo.lastestPost().then(rows => {
        //console.log(rows);
        var vm = {
            layout: 'main.handlebars',
            blog: rows
        };
        res.render('home/index',vm);
    });
});

router.get('/index', (req, res) => {
    res.render('home/index');
});

module.exports = router;