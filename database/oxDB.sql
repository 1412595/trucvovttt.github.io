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

create table blog (
	blogID int primary key auto_increment,
    blogTitle nvarchar(200),
    blogContent nvarchar (1000),
    blogDate datetime,
    blogImage varchar(50),
    blogView int,
    blogComment int,
    categoryID int
);

create table blogDetail (
	blogID int,
    accountID int,
    blogComment nvarchar(500),
    accountComment int,
    commentDate datetime,
    primary key (blogID, accountID)
);

ALTER TABLE blog ADD CONSTRAINT FK_blog_category FOREIGN KEY (categoryID) REFERENCES category(categoryID);
ALTER TABLE blogDetail ADD CONSTRAINT FK_blogDetail_blog FOREIGN KEY (blogID) REFERENCES blog(blogID);
ALTER TABLE blogDetail ADD CONSTRAINT FK_blogDetail_account FOREIGN KEY (accountID) REFERENCES account(accountID);
ALTER TABLE blogDetail ADD CONSTRAINT FK_blogDetail_account1 FOREIGN KEY (accountComment) REFERENCES account(accountID);

Insert into category (`categoryName`, `categoryDescription`) values ('Technology', 'abcd'), ('Travel', 'efgh'), ('Business', 'iklm');

Insert into account (`username`,`password`,`accountDOB`,`accountGender`,`accountEmail`,`accountType`,`status`) values
('a','123456','2000-05-15',1,'a@gmail.com',1,1),
('b','123456','2001-05-15',1,'b@gmail.com',1,1);

Insert into blog (`blogTitle`,`blogContent`,`blogDate`,`blogImage`,`blogView`,`blogComment`,`categoryID`) values 
('abc1','x','2017-05-15 00:00:00','abc1.png',100,10,1),
('abc2','y','2017-05-16 00:00:00','abc2.png',100,10,2),
('abc3','z','2017-05-17 00:00:00','abc3.png',100,10,3),
('abc4','w','2017-05-18 00:00:00','abc4.png',100,10,1);

Insert into blogDetail (`blogID`,`accountID`,`blogComment`,`accountComment`,`commentDate`) values 
(1,1,'trsh',2,'2017-06-16 00:00:00'),
(2,1,'tjd',2,'2017-06-16 00:00:00'),
(3,1,'tfgg',2,'2017-06-16 00:00:00'),
(4,1,'fsht',2,'2017-06-16 00:00:00');
