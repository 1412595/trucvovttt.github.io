var express = require('express');

var router = express.Router();
var categoryRepo = require('../repos/categoryRepo');
var blogRepo = require('../repos/blogRepo');

router.get('/', (req, res) => {
    res.render('blog/blog-index');
});

router.get('/blog-index', (req, res) => {
    res.render('blog/blog-index');
});

router.get('/blog-detail', (req, res) => {
    categoryRepo.getAll().then(rows => {
        //console.log(rows);
        var vm = {
            layout: 'main.handlebars',
            category: rows
        };
        res.render('blog/blog-detail', vm);
    });
});



module.exports = router;