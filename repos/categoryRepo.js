var db = require('../fn/db');

exports.getAll = () => {
    var sql = `select * from category`;
    return db.load(sql);
}

exports.getByName = (name) => {
    var sql =`select blog.blogID, blog.blogTitle, blog.blogContent, blog.blogDate, blog.blogImage, blog.blogView, blog.blogComment, blog.categoryID, blog.accountID
    from blog, category
    where category.categoryName = ${name} and blog.categoryID = category.categoryID`;
    return db.load(sql);
}

