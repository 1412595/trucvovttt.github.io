var db = require('../fn/db');

exports.lastestPost = () => {
    var sql = `select blog.blogID, blog.blogTitle, blog.blogContent, blog.blogDate, blog.blogImage, blog.blogView, blog.blogComment, category.categoryName, account.username
                from blog, category, account
                where blog.categoryID = category.categoryID and blog.accountID = account.accountID 
                ORDER BY blogID DESC LIMIT 3`;
    return db.load(sql);
}

exports.getAll = () => {
    var sql = `select blog.blogID, blog.blogTitle, blog.blogContent, blog.blogDate, blog.blogImage, blog.blogView, blog.blogComment, category.categoryName, account.username
                from blog, category, account
                where blog.categoryID = category.categoryID and blog.accountID = account.accountID 
                ORDER BY blogID DESC`;
    return db.load(sql);
}