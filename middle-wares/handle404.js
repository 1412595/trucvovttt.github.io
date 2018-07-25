module.exports = (req, res, next) => {
    res.statusCode = 404;
    vm = {
        layout: false
    }
    res.render('error/index', vm);
};