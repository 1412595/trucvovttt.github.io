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

exports.getBlog = (id) => {
    var sql = `select blog.blogID, blog.blogTitle, blog.blogContent, blog.blogDate, blog.blogImage, blog.blogView, blog.blogComment, category.categoryName, account.username
                from blog, category, account
                where blog.categoryID = category.categoryID and blog.accountID = account.accountID and blog.blogID = ${id}`;
    return db.load(sql);
}

exports.new = (b) => {
    var sql = `insert into blog(blogTitle,blogContent,blogDate,blogImage,blogView,blogComment,categoryID,accountID) values 
    ('${b.blogTitle}','${b.blogContent}','${b.blogDate}','${b.blogImage}',${b.blogView},${b.blogComment},${b.categoryID},${b.accountID})`;
    return db.save(sql);
}

exports.getByName = (name) => {
    var sql = `select * from category where categoryName = '${name}'`;
    return db.load(sql);
}

exports.searchBlog = (search) => {
    var sql = `select * from blog where blogTitle like '%${search}%'`;
}