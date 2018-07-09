var db = require('../fn/db');

exports.getAll = () => {
    var sql = 'select * from account';
    return db.load(sql);
}