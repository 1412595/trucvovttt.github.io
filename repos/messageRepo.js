var db = require('../fn/db');

exports.new = (m) => {
    var sql = `insert into message(uname,email,subject,content) values 
    ('${m.uname}','${m.email}','${m.subject}','${m.content}')`;
    return db.save(sql);
}
