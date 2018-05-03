from __future__ import print_function
from flask import Flask, render_template, request, jsonify
from sqlalchemy import create_engine
import json
import sys

app = Flask(__name__)
app.config["DEBUG"] = True

trail_data = "mysql+mysqlconnector://FiveSn:notspamatall2@FiveSn.mysql.pythonanywhere-services.com/FiveSn$MyData"
print(trail_data)

engine = create_engine(trail_data)

@app.route('/', methods=["GET"])
def index():
    return render_template("main_page.html")

@app.route('/trails', methods=["GET"])
def get_trails():
    name = request.args.get("name")
    length = request.args.get("length")
    difficulty = request.args.get("difficulty")
    location = request.args.get("location")
    type = request.args.get("type")
    # below is how we can print to our error log, will probably remove this once debugging is complete
    print("request recieved: name:{0} length: {1} difficulty: {2} location: {3} type: {4}".format(name, length, difficulty, location, type))
    sql_query_string, params = create_query(name, length, difficulty, location, type)
    # below is a good debug line, but will probably remove once debugging is complete
    print("sql_query_string: {0} params: {1}".format(sql_query_string, params))
    # definition for this execute method signature here https://dev.mysql.com/doc/connector-python/en/connector-python-api-mysqlcursor-execute.html
    results = engine.execute(sql_query_string, params)
    return json.dumps([(dict(row.items())) for row in results])

def create_query(name, length, difficulty, location, type):
    need_or_operator = False
    query_string = "SELECT name, length, difficulty, location, type FROM trails"
    params = ()
    # we will set convention to always add a space at the BEGINNING of the sql chunk we're adding
    if name != "":
        query_string += " WHERE name LIKE %s"
        need_or_operator = True
        params += ("%"+name+"%",)

    if location != "":
        if need_or_operator:
            query_string += " AND location LIKE %s"
        else:
            query_string += " WHERE location LIKE %s"
            need_or_operator = True
        params += ("%"+location+"%",)

    if type != "":
        if need_or_operator:
            query_string += " OR type LIKE %s"
        else:
            query_string += " WHERE type LIKE %s"
        params += ("%"+type+"%",)
    # we're adding this limit to cover the scenario the user didn't supply any
    # paramters. We don't want to return ALL the rows in our DB!
    query_string += " limit 6"

    return query_string, params
