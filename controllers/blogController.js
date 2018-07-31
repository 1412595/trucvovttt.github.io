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
        var t0 = blogRepo.getAll();
        var t1 = categoryRepo.getAll();
        var t2 = blogRepo.lastestPost();
        Promise.all([t0, t1, t2]).then(([a, c, l]) => {
            var vm = {
                layout: 'mainBlog.handlebars',
                blogs:a,
                category: c,
                list: l
            };
            res.render('blog/index', vm);
        });
    }
});

router.get('/index', (req, res) => {
    if (req.session.isLogged == false) {
        var vm = {
            layout: 'mainAccount.handlebars'
        }
        res.render('account/login', vm);
        // res.redirect('account/login');
    } else {
        var t0 = blogRepo.getAll();
        var t1 = categoryRepo.getAll();
        var t2 = blogRepo.lastestPost();
         Promise.all([t0, t1, t2]).then(([a, c, l]) => {
            var vm = {
                layout: 'mainBlog.handlebars',
                blogs:a,
                category: c,
                list: l
            };
            res.render('blog/index', vm);
        });
    }
});

router.get('/detail/:id', (req, res) => {
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
        res.render('blog/detail', vm);
    });
});

router.get('/add', (req, res) => {
    var t1 = categoryRepo.getAll();
    var t2 = blogRepo.lastestPost();
    Promise.all([t1, t2]).then(([c, l]) => {
        var vm = {
            layout: 'mainBlog.handlebars',
            category: c,
            list: l
        };
        res.render('blog/add', vm);
    });
});

router.post('/addBlog', (req, res) => {
    blogRepo.getByName(req.body.categoryName).then(value => {
        var newBlog = {
            blogTitle: req.body.blogTitle,
            blogContent: req.body.blogContent,
            blogDate: req.body.clock,
            blogImage: req.body.image,
            blogView: 0,
            blogComment: 0,
            categoryID: value[0].categoryID,
            accountID: req.session.idAccount
        }
        blogRepo.new(newBlog);
        res.redirect('/blog');
    });
});

router.post('/search-titleBlog', (req, res) => {
    blogRepo.searchBlog(req.body.nameBlog).then(value => {
        var vm = {
            layout: 'mainBlog.handlebars',
            blogs: value
        }
        res.render(blog/index, vm);
    });
});

router.post('/addComment', (req, res) => {
    blogRepo.allComment(req.body.blogID).then(value => {
        var cmt = {
            blogID: req.body.blogID,
            accountID: req.session.idAccount,
            commentDate: req.body.clock,
            commentContent: req.body.message
        }
        blogRepo.addComment(cmt);
        var vm = {
            layout: 'mainBlog.handlebars',
            comments: value
        }
        res.render(blog/detail,vm);
    });
});

module.exports = router;