var express = require('express');

var router = express.Router();
var blogRepo = require('../repos/blogRepo');
var messageRepo = require('../repos/messageRepo');

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

router.get('/newMessage', (req, res) => {
    res.render('home/index');
});

router.post('/newMessage', (req, res) => {
    var mess = {
        uname: req.body.uname,
        email: req.body.email,
        subject: req.body.subject,
        content: req.body.content
    }
    console.log(mess);
    messageRepo.new(mess);
    res.render('home/index');
});

module.exports = router;