from __future__ import print_function
from flask import Flask, render_template, request, jsonify
from sqlalchemy import create_engine
import json
import sys

app = Flask(__name__)
app.config["DEBUG"] = True

trail_data = "mysql+mysqlconnector://FiveSn:notspamatall2@FiveSn.mysql.pythonanywhere-services.com/FiveSn$TrailData"
print(trail_data)

engine = create_engine(trail_data)

@app.route('/', methods=["GET"])
def index():
    return render_template("main_page.html")

@app.route('/trails', methods=["GET"])
def get_trails():
    name = request.args.get("name")
    length = request.args.get("length")
    location= request.args.get("location")
    # below is how we can print to our error log, will probably remove this once debugging is complete
    print("request recieved: name:{0} length: {1} location: {2}".format(name, length, location))
    sql_query_string, params = create_query(name, length, location)
    # below is a good debug line, but will probably remove once debugging is complete
    print("sql_query_string: {0} params: {1}".format(sql_query_string, params))
    # definition for this execute method signature here https://dev.mysql.com/doc/connector-python/en/connector-python-api-mysqlcursor-execute.html
    results = engine.execute(sql_query_string, params)
    return json.dumps([(dict(row.items())) for row in results])

def create_query(name, length, location):
    need_or_operator = False
    query_string = "SELECT name, length, difficulty, location, type FROM trails"
    params = ()
    # we will set convention to always add a space at the BEGINNING of the sql chunk we're adding
    if name != "":
        query_string += " WHERE name LIKE %s"
        need_or_operator = True
        params += ("%"+name+"%",)
    if length != "":
        if need_or_operator:
            query_string += " OR length = %s"
        else:
            query_string += " WHERE length = %s"
            need_or_operator = True
        params += (length,)
    if location != "":
        if need_or_operator:
            query_string += " OR location LIKE %s"
        else:
            query_string += " WHERE location LIKE %s"
        params += ("%"+location+"%",)
    # we're adding this limit to cover the scenario the user didn't supply any
    # paramters. We don't want to return ALL the rows in our DB!
    query_string += " limit 5"

    return query_string, params
