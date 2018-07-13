var db = require('../fn/db');

exports.login = (a) => {
    var sql = `select * from account where username = '${a.username}' and password = '${a.password}'`;
    return db.load(sql);
}