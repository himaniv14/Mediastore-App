'''
Created on : Dec 14,2022
Author : Josef
Purpose : db connection
'''

from flaskext.mysql import MySQL

# setting configuration to connect to the DB
app.config['MYSQL_DATABASE_USER'] = 'db_admin'
app.config['MYSQL_DATABASE_PASSWORD'] = 'csc648dbpassword'
app.config['MYSQL_DATABASE_DB'] = 'mediastore'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.config['SECRET_KEY'] = "CSC648secretkey"

mysql = MySQL()