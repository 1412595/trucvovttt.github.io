var db = require('../fn/db');

exports.getAll = () => {
    var sql = 'select * from category';
    return db.load(sql);
}