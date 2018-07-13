var express = require('express'),
    SHA256 = require('crypto-js/sha256');;

var router = express.Router();
var accountRepo = require('../repos/accountRepo');
var blogRepo = require('../repos/blogRepo');

router.get('/login', (req, res) => {
    var vm = {
        layout: 'mainAccount.handlebars'
    };
    res.render('account/login',vm);
});

router.post('/login', (req, res) => {
    var user = {
        username: req.body.username,
        password: req.body.rawPWD
        // password: SHA256(req.body.rawPWD).toString()
    };
    accountRepo.login(user).then(rows => {

        console.log(rows.length);
        if (rows.length > 0) {
            if (rows[0].accountType === 1) {
                blogRepo.getAll().then(b => {
                    //console.log(rows);
                    var vm = {
                        layout: 'mainBlog.handlebars',
                        blog: b
                    };
                    res.render('blog/blog-index', vm);
                });
            } else {
                blogRepo.lastestPost().then(l => {
                    //console.log(rows);
                    var vm = {
                        layout: 'main.handlebars',
                        blog: l
                    };
                    res.render('home/index',vm);
                });
            }
        } else {
            var vm = {
                showError: true,
                errorMsg: 'Login failed',
                layout: 'mainAccount.handlebars'
            };
            res.render('account/login', vm);
        }
    });
});

router.post('/logout', (req, res) => {
    console.log('aaa');
    req.session.isLogged = false;
    req.session.user = null;
    res.redirect(req.headers.referer);
});

module.exports = router;