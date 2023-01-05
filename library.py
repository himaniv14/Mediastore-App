'''
Created on : Oct 27,2022
Author : Himani , Donnovan
Purpose : backend apis for search results and populating home page
'''

import os
from flask import Flask,  request, session
from flaskext.mysql import MySQL
from flask_cors import CORS
import json
from flask import Response
from werkzeug.utils import secure_filename
from datetime import date
from user import user
from PIL import Image


app = Flask(__name__)
app.register_blueprint(user)
CORS(app)

# setting configuration to connect to the DB
app.config['MYSQL_DATABASE_USER'] = 'db_admin'
app.config['MYSQL_DATABASE_PASSWORD'] = 'csc648dbpassword'
app.config['MYSQL_DATABASE_DB'] = 'mediastore'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.config['SECRET_KEY'] = "CSC648secretkey"

UPLOAD_FOLDER = 'static'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

mysql = MySQL()
global fname
# intialize the extension
mysql.init_app(app)

conn = mysql.connect()
cursor = conn.cursor()


@app.route('/contact', methods=['POST'])
def contactSeller():
    if request.method == 'POST':
        contact_request = request.get_json()
        
        conn = mysql.connect()
        cursor = conn.cursor()


        # get user id of seller and buyer
        cursor.execute("SELECT user_id from user_records where user_username = %s", contact_request['author'])
        receiver_id = cursor.fetchall()
        cursor.execute("SELECT user_id from user_records where user_email = %s", contact_request['email'])
        sender_id = cursor.fetchall()

        if receiver_id:

            insert_statement = (
                "INSERT INTO message(message_body_text, message_created_date, message_sender_id, message_receiver_id)"
                "VALUES (%s, %s, %s, %s)"
            )

            data = (contact_request['message'], contact_request['date'], sender_id, receiver_id)

            cursor.execute(insert_statement, data)

            conn.commit()
            print("Insert completed")
            #resp = {"Response" : "200 OK"}
            return "success"
        #Response(json.dumps(resp), mimetype='application/json')""
        else:
            print("Bad Request")
            resp = {"Response" : "400 Bad Request"}
            return Response(json.dumps(resp), mimetype='application/json')


@app.route('/post', methods=['POST'])
def post():
    if request.method == 'POST':

        post_request = request.get_json()
        conn = mysql.connect()
        cursor = conn.cursor()


        print("welcome to /post!!")
        print(post_request)
        print("EMAIL : ", post_request['email'])
        #### code to create thumbnail
        target=os.path.join(UPLOAD_FOLDER,'media')
        target="/".join([target, fname])
        image = Image.open(target)
        MAX_SIZE = (500, 500)
          
        image.thumbnail(MAX_SIZE)
          
        # creating thumbnail
        destination=os.path.join(UPLOAD_FOLDER,'thumbnail')
        destination="/".join([destination, fname])
        image.save(destination)
        #image.show()

        # fetching user_id of seller and inputting data into item table
        user_id_insert = ("SELECT user_id FROM user_records WHERE user_email = %s ")
        cursor.execute(user_id_insert, post_request['email'])
        fetch = cursor.fetchall()
        item_creator_id = fetch[0][0]
        today = date.today()
        current_date = today.strftime("%y-%m-%d")
        print(int(post_request['price']))
        insert_statement = (
            "INSERT INTO item (item_title, item_category, item_description, item_price, item_creator_id, item_created_date, item_file, item_path, item_approved) "
            "VALUES ( %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        )

        data = (post_request['name'], post_request['category'], post_request['description'], int(post_request['price']), item_creator_id, current_date, fname, fname, 0)
        print(data)
        cursor.execute(insert_statement, data)
        conn.commit()
        print("Insert completed")
        #resp = {"Response" : "200 OK"}
        return "success"


@app.route('/savefile', methods=['POST'])
def post_1():
    global fname
    target=os.path.join(UPLOAD_FOLDER,'media')
    if not os.path.isdir(target):
        os.mkdir(target)
    print("welcome to upload`")
    file = request.files['file'] 
    filename = secure_filename(file.filename)
    fname = filename
    destination="/".join([target, filename])
    file.save(destination)
    session['uploadFilePath']=destination
    print("File saved successfully")
    resp = {"Response" : "200 OK"}
    return Response(json.dumps(resp), mimetype='application/json')

#endpoint for populating top items in home page
@app.route('/topresults', methods=['GET'])
def topresults():
    if request.method == 'GET':
        conn = mysql.connect()
        cursor = conn.cursor()

        # grab data from DB. send back to front-end in array
        cursor.execute("SELECT item_title,item_description, user_username, item_path, item_price, item_category FROM item JOIN user_records ON item_creator_id = user_id where item_approved = 1 ORDER BY item_created_date desc LIMIT 4")
        conn.commit()
        top_eight = cursor.fetchall()
        print(top_eight)
        jsn=[]
        for top in top_eight:
            jsn.append({"title": top[0], "description": top[1], "author": top[2], "path": str(top[3]), "price": top[4], "category": top[5] })
        cursor.close()
        conn.close()
        return Response(json.dumps(jsn), mimetype='application/json')

# endpoint for search dropdown
@app.route('/categories', methods=['GET', 'POST'])
def setCategory():
    if request.method == 'GET':
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute("SELECT distinct(item_category) FROM item")
        conn.commit()
        category = cursor.fetchall()
        cat_array = []
        for cat in category:
            cat_array.append(cat[0])

        j = {"cat": cat_array}

        print("j == ", j)
        cursor.close()
        conn.close()
        return Response(json.dumps(cat_array),  mimetype='application/json')

#endpoint for populating items in home page
@app.route('/home', methods=['GET'])
def home():
    if request.method == 'GET':
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute("SELECT item_title,item_description, user_username, item_path, item_price, item_category FROM item JOIN user_records ON item_creator_id = user_id where item_approved = 1 ORDER BY item_created_date desc  LIMIT 8")
        conn.commit()
        top_eight = cursor.fetchall()
        print(top_eight)
        jsn=[]
        for top in top_eight:
            jsn.append({"title": top[0], "description": top[1], "author": top[2], "path": str(top[3]), "price": top[4], "category": top[5] })
        cursor.close()
        conn.close()
        return Response(json.dumps(jsn), mimetype='application/json')

''' 
    Code reviewed by - Himani Varshney
    Comments - 1) Remove print statements before deploying the code on server.
               2) Use more meaningful variable names.
               3) Use more inline comments for each if else condition. 
    
'''
#endpoint for search
@app.route('/search', methods=['GET', 'POST'])
def search():
    print("Hello World")
    if request.method == "POST":
        print(request)
        # request user input from <input> with name="book"
        print(dir(request))
        print("########################")
        #request.json['book']
        #print(request.body)
        #book = request.form['book']
        book = request.get_json()
        print(request.get_json())
        print(book['book'])
        print("########################")
        conn = mysql.connect()
        cursor = conn.cursor()
        if(book['book']=="" and book['Category'] == 'all' ):
            cursor.execute("SELECT item_title,item_description, user_username, item_path, item_price, item_category FROM item JOIN user_records ON item_creator_id = user_id where item_approved = 1")
            conn.commit()
            data = cursor.fetchall()
            print(data)
            print(type(data))
            print("DATA : ", data)
            jsn=[]
            for tuple_item in data:
                jsn.append({"title": tuple_item[0], "description": tuple_item[1], "author": tuple_item[2], "path": str(tuple_item[3]), "price": tuple_item[4], "category": tuple_item[5] })
            #jsn = [ {"title": data[0][1], "description": data[0][2], "author": data[0][3], "path": str(data[0][4]), "price": data[0][5], "category": data[0][6] } ]
            print(jsn)
            cursor.close()
            conn.close()
            return Response(json.dumps(jsn),  mimetype='application/json')

        elif(book['Category'] == 'all' and book['book']!=""):
            cursor.execute("SELECT item_title,item_description, user_username, item_path, item_price, item_category FROM item JOIN user_records ON item_creator_id = user_id WHERE  item_approved = 1 and item_title LIKE %s ", ( '%' + book['book'] + '%'))
            conn.commit()
            data = cursor.fetchall()
            print(data)
            print(type(data))
            jsn=[]
            for tuple_item in data:
                jsn.append({"title": tuple_item[0], "description": tuple_item[1], "author": tuple_item[2], "path": str(tuple_item[3]), "price": tuple_item[4], "category": tuple_item[5] })
            #jsn = [ {"title": data[0][1], "description": data[0][2], "author": data[0][3], "path": str(data[0][4]), "price": data[0][5], "category": data[0][6] } ]
            print(jsn)
            cursor.close()
            conn.close()
            return Response(json.dumps(jsn),  mimetype='application/json')

        elif (book['Category'] != 'all' and book['book']==""):
            cursor.execute("SELECT item_title,item_description, user_username, item_path, item_price, item_category FROM item JOIN user_records ON item_creator_id = user_id WHERE  item_approved = 1 and item_category = %s", (book['Category']))
            conn.commit()
            data = cursor.fetchall()
            print(data)
            print(type(data))
            jsn=[]
            for tuple_item in data:
                jsn.append({"title": tuple_item[0], "description": tuple_item[1], "author": tuple_item[2], "path": str(tuple_item[3]), "price": tuple_item[4], "category": tuple_item[5] })
            #jsn = [ {"title": data[0][1], "description": data[0][2], "author": data[0][3], "path": str(data[0][4]), "price": data[0][5], "category": data[0][6] } ]
            print(jsn)
            cursor.close()
            conn.close()
            return Response(json.dumps(jsn),  mimetype='application/json')


        elif(book['Category'] != 'all'):
            cursor.execute("SELECT item_title,item_description, user_username, item_path, item_price, item_category FROM item JOIN user_records ON item_creator_id = user_id WHERE item_approved = 1 and item_category = %s AND item_title LIKE %s ", (book['Category'], '%' + book['book'] + '%'))
            conn.commit()
            data = cursor.fetchall()
            print(data)
            print(type(data))
            jsn=[]
            for tuple_item in data:
                jsn.append({"title": tuple_item[0], "description": tuple_item[1], "author": tuple_item[2], "path": str(tuple_item[3]), "price": tuple_item[4], "category": tuple_item[5] })
            #jsn = [ {"title": data[0][1], "description": data[0][2], "author": data[0][3], "path": str(data[0][4]), "price": data[0][5], "category": data[0][6] } ]
            print(jsn)
            cursor.close()
            conn.close()
            return Response(json.dumps(jsn),  mimetype='application/json')





        cursor.execute("SELECT * from item WHERE item_title LIKE %s", (book['book']))
        conn.commit()
        data = cursor.fetchall()

        jsn=[]
        for tuple_item in data:
                jsn.append({"title": tuple_item[0], "description": tuple_item[1], "author": tuple_item[2], "path": str(tuple_item[3]), "price": tuple_item[4], "category": tuple_item[5] })
            #jsn = [ {"title": data[0][1], "description": data[0][2], "author": data[0][3], "path": str(data[0][4]), "price": data[0][5], "category": data[0][6] } ]
        print(jsn)
        cursor.close()
        conn.close()

        return Response(json.dumps(jsn),  mimetype='application/json')


if __name__=='__main__':
    app.debug = True
    app.run(host="0.0.0.0")

