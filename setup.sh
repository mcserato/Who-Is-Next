npm install #installs the nodejs dependencies
mysql -uroot -p < lib/CreateUser.sql #creates the user Teletubbies and the database WHOISNEXT
mysql -uTeletubbies -pab1l WHOISNEXT < lib/Dump.sql #creates the tables in the database WHOISNEXT
