var blogRepo = require('../repos/blogRepo');

module.exports = (req, res, next) => {
	if (req.session.isLogged === undefined) {
		req.session.isLogged = false;
	}
	blogRepo.getAll().then(rows => {
        res.locals.layoutVM = {
            blog: rows,
            suppliers: rows,
            isLogged: req.session.isLogged,
        	user: req.session.user
        };

        // console.log(res.locals.layoutVM.user);

        next();
    });
};