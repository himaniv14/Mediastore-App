'''
Created on : Nov 10, 2022
Author : Josef
Purpose : backend apis for basic user needs (sign up, login, dashhboard)
'''

from flask import Blueprint, request
import hashlib
import json

user = Blueprint('user', __name__)

#endpoint for Login page
@user.route('/login', methods=['POST'])
def login():
    from library import mysql
    conn = mysql.connect()
    cursor = conn.cursor()
    data = request.json

    email = data["email"]
    password = data["password"]
    callToSQL = f'SELECT * FROM user_records WHERE user_email = "{email}" AND user_password = "{hashlib.md5(password.encode()).hexdigest()}"'

    cursor.execute(callToSQL)
    account = cursor.fetchone()
    # closing database connection.
    cursor.close()
    conn.close()

    if account:
        return 'success'
    else:
        return 'failure'

#endpoint for Sgin Up page
@user.route('/signup', methods=['POST'])
def signup():
    try:
        from library import mysql
        conn = mysql.connect()
        cursor = conn.cursor()
        data = request.json

        email = data["email"]
        password = data["password"]
        username = data["id"]
        first_name = data["firstname"]
        last_name = data["lastname"]
        callToSQL = f'INSERT INTO user_records (user_type,user_username,user_first_name,user_last_name,' \
                    f'user_email,user_password) VALUES ("registered_user","{username}","{first_name}","{last_name}",' \
                    f'"{email}","{hashlib.md5(password.encode()).hexdigest()}");'
        cursor.execute(callToSQL)
        conn.commit()
        return 'success'

    except conn.Error as error:
        #print("Failed to update record to database rollback: {}".format(error))
        return 'failure'

    finally:
        # closing database connection.
        cursor.close()
        conn.close()

#endpoint for profile on dashboard
@user.route('/profile', methods=['POST'])
def profile():
    try:
        from library import mysql
        conn = mysql.connect()
        cursor = conn.cursor()
        data = request.json
        email = data["email"]

        callToSQL = f'SELECT user_first_name, user_last_name FROM user_records WHERE user_email = "{email}"'
        cursor.execute(callToSQL)
        values = cursor.fetchall()
        headers = cursor.description
        dict_to_json = dict(zip((headers[0][0], headers[1][0]), (values[0][0], values[0][1])))

        return dict_to_json

    except:
        return 'failure'

    finally:
        # closing database connection.
        cursor.close()
        conn.close()

#endpoint for posts on dashboard
@user.route('/posts', methods=['POST'])
def posts():
    try:
        from library import mysql
        conn = mysql.connect()
        cursor = conn.cursor()
        data = request.json
        email = data["email"]

        callToSQL = f"""SELECT item_title, item_approved, item_created_date FROM item WHERE item_creator_id = (SELECT """ \
                f"""user_id FROM user_records WHERE user_email = "{email}")"""
        cursor.execute(callToSQL)
        values = cursor.fetchall()
        headers = cursor.description
        list_of_dicts = []
        for message in values:
            list_of_dicts.append(dict(zip((headers[0][0], headers[1][0], headers[2][0]), (message[0], message[1],
                                                                                          message[2]))))

        return list_of_dicts

    except:
        return 'failure'

    finally:
        # closing database connection.
        cursor.close()
        conn.close()

#endpoint for messages on dashboard
@user.route('/messages', methods=['POST'])
def messages():
    try:
        from library import mysql
        conn = mysql.connect()
        cursor = conn.cursor()
        data = request.json
        email = data["email"]

        callToSQL = f"""SELECT message_body_text, user_username, message_created_date FROM message JOIN """ \
                f"""user_records ON message_sender_id = user_id WHERE message_receiver_id = (SELECT user_id FROM user_records """ \
                f"""WHERE user_email = "{email}")"""
        cursor.execute(callToSQL)
        values = cursor.fetchall()
        headers = cursor.description
        list_of_dicts = []
        for message in values:
            list_of_dicts.append(dict(zip((headers[0][0], headers[1][0], headers[2][0]), (message[0], message[1],
                            message[2]))))

        return list_of_dicts

    except:
        return 'failure'

    finally:
        # closing database connection.
        cursor.close()
        conn.close()