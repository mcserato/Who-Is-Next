#!/bin/bash


echo "Installing npm dependencies..."
npm install

echo -en "Do you want to:\n (1) update schema\n (2) create Teletubbies user and update schema\n (3) Exit\nChoice: "
read choice

    if [[ $choice -eq 1 ]]; then
        echo "Creating user and database..."
    
        echo -n "[root] "
        mysql -uroot -p < lib/CreateUser.sql #creates the user Teletubbies and the database WHOISNEXT

    elif [[ $choice -eq 2 ]]; then
        #nothing

    else
        exit

    fi

echo "Inserting dump into the database..."
mysql -uTeletubbies -pab1l WHOISNEXT < lib/Dump.sql #creates the tables in the database WHOISNEXT

echo "Good luck and have fun! :)"
