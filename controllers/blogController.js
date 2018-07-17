var express = require('express');

var router = express.Router();
var categoryRepo = require('../repos/categoryRepo');
var blogRepo = require('../repos/blogRepo');

router.get('/', (req, res) => {

    if (req.session.isLogged == false) {
        var vm = {
            layout: 'mainAccount.handlebars'
        }
        res.render('account/login', vm);
    } else {
        blogRepo.getAll().then(rows => {
            //console.log(rows);
            var vm = {
                layout: 'mainBlog.handlebars',
                blog: rows
            };
            res.render('blog/blog-index', vm);
        });
    }
});

router.get('/blog-index', (req, res) => {
    if (req.session.isLogged == false) {
        var vm = {
            layout: 'mainAccount.handlebars'
        }
        res.render('account/login', vm);
    } else {
        blogRepo.getAll().then(rows => {
            //console.log(rows);
            var vm = {
                layout: 'mainBlog.handlebars',
                blog: rows
            };
            res.render('blog/blog-index', vm);
        });
    }
});

router.get('/blog-detail/:id', (req, res) => {
    var t1 = categoryRepo.getAll();
    var t2 = blogRepo.lastestPost();
    var t3 = blogRepo.getBlog(req.params.id)
    Promise.all([t1, t2, t3]).then(([c, l, b]) => {
        var vm = {
            layout: 'mainBlog.handlebars',
            category: c,
            list: l,
            blog: b
        };
        res.render('blog/blog-detail', vm);
    });
});

router.get('/blog-add', (req, res) => {
    categoryRepo.getAll().then(rows => {
        //console.log(rows);
        var vm = {
            layout: 'mainBlog.handlebars',
            category: rows
        };
        res.render('blog/blog-add', vm);
    });
});

router.post('/addBlog', (req, res) => {
    console.log("abc");
    blogRepo.getByName(req.body.categoryName).then(value => {
        var newBlog = {
            blogTitle: req.body.blogTitle,
            blogContent: req.body.blogContent,
            blogDate: req.body.clock,
            blogImage: req.body.image,
            blogView: 0,
            blogComment: 0,
            categoryID: value[0].categoryID,
            accountID: 1
            // accountID: req.body.accountID
        }
        console.log(newBlog);
        blogRepo.new(newBlog);
        blogRepo.getAll().then(rows => {
            var vm = {
                layout: 'mainBlog.handlebars',
                blog: rows
            };
            res.render('blog/blog-index', vm);
        });
        // res.redirect('blog-index');
    });
});

module.exports = router;