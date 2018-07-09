var db = require('../fn/db');

exports.getAll = () => {
    var sql = 'select * from blog';
    return db.load(sql);
}

exports.lastestPost = () => {
    var sql = `select * from blog ORDER BY BlogID DESC LIMIT 3`;
    return db.load(sql);
}