#alter user 'root'@'localhost' identified with mysql_native_password by '1111';

create database ox;
use ox;

create table category (
	categoryID int primary key auto_increment,
    categoryName nvarchar(50),
    categoryDescription nvarchar(500)
);


create table account (
	accountID int primary key auto_increment,
    username varchar(50),
    password varchar(50),
    accountDOB date,
    accountGender bit,
    accountEmail varchar(50),
    accountType int check (accountType >= 0),
    status bit default 1
);

create table message (
	messageID int primary key auto_increment,
    uname nvarchar(50) unique,
    email varchar(50),
    subject nvarchar(100),
    content nvarchar(1000)
);

create table blog (
	blogID int primary key auto_increment,
    blogTitle nvarchar(200) unique,
    blogContent nvarchar (1000),
    blogDate datetime,
    blogImage varchar(50),
    blogView int,
    blogComment int,
    categoryID int,
    accountID int
);

create table blogComment (
	blogID int,
    accountID int,
    commentDate datetime,
    commentContent nvarchar(500),
    primary key (blogID, accountID, commentDate)
);

ALTER TABLE blog ADD CONSTRAINT FK_blog_category FOREIGN KEY (categoryID) REFERENCES category(categoryID);
ALTER TABLE blog ADD CONSTRAINT FK_blog_account FOREIGN KEY (accountID) REFERENCES account(accountID);
ALTER TABLE blogComment ADD CONSTRAINT FK_blogComment_blog FOREIGN KEY (blogID) REFERENCES blog(blogID);
ALTER TABLE blogComment ADD CONSTRAINT FK_blogComment_account FOREIGN KEY (accountID) REFERENCES account(accountID);

Insert into category (`categoryName`, `categoryDescription`) values
('Technology', 'abcd'),
('Travel', 'efgh'),
('Business', 'iklm');

Insert into account (`username`,`password`,`accountDOB`,`accountGender`,`accountEmail`,`accountType`,`status`) values
('a','123456','2000-05-15',1,'a@gmail.com',1,1),
('b','123456','2001-05-15',1,'b@gmail.com',1,1),
('c','123456','2001-05-15',1,'b@gmail.com',1,0);

Insert into blog (`blogTitle`,`blogContent`,`blogDate`,`blogImage`,`blogView`,`blogComment`,`categoryID`,`accountID`) values 
('abc1','x','2017-05-15 00:00:00','blog1.jpg',100,10,1,1),
('abc2','y','2017-05-16 00:00:00','blog2.jpg',100,10,2,1),
('abc3','z','2017-05-17 00:00:00','blog3.jpg',100,10,3,1),
('abc4','w','2017-05-18 00:00:00','blog4.jpg',100,10,1,1);

Insert into blogComment (`blogID`,`accountID`,`commentDate`,`commentContent`) values 
(1,2,'2017-06-16 00:00:00','fdg'),
(2,2,'2017-06-16 00:00:00','reay'),
(3,2,'2017-06-16 00:00:00','xngf'),
(4,2,'2017-06-16 00:00:00','zdhr');
