var express = require('express');
    SHA256 = require('crypto-js/sha256');


var accountRepo = require('../repos/accountRepo');
var blogRepo = require('../repos/blogRepo');
var router = express.Router();

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
        if (rows.length > 0) {
            // if (rows[0].accountType === 1) {
                req.session.isLogged = true;
                req.session.user = rows[0];
                req.session.idAccount = rows[0].accountID;
                console.log(req.session.idAccount);
                res.redirect('/blog');
            // } else {
            //     blogRepo.lastestPost().then(l => {
            //         var vm = {
            //             layout: 'main.handlebars',
            //             blog: l
            //         };
            //         res.render('home/index',vm);
            //     });
            // }
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
    req.session.isLogged = false;
    req.session.user = null;
    res.redirect("/");
});

module.exports = router;