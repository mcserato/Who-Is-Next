#Counterpart of setup.sh
#removes any trace of Who-Is-Next in the PC

echo -n "Enter root password: " #asks the user for the password of root
read pw #stores the input to pw
mysql -uroot -p$pw < lib/DeleteUser.sql #using the input password
    #log-ins root and deletes the user and database

#Sequential
cd .. && #goes to the parent directory
rm -rf Who-Is-Next && #removes the folder Who-Is-Next
echo "[!] Successfully deleted Who-Is-Next folder and contents" &&

#unsets the git user.name and git user.email
git config --global user.name '' &&
git config --global user.email '' &&

history -c #clears the terminal history to hide confidential commands
#such as github repo link, db password, etc.
