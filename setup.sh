npm install #installs the nodejs dependencies
mysql -uroot -puser < lib/CreateUser.sql #creates the user Teletubbies and the database WHOISNEXT
mysql -uTeletubbies -pab1l WHOISNEXT < lib/dump.sql #creates the tables in the database WHOISNEXT
