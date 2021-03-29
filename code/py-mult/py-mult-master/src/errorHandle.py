from flask import Flask
from flask import Response
import json


def argsNotPresent(x, y):
    if x is None and y is None:
        output = {
            "error": "You have not entered an x or y integer",
            "answer": 0000
        }
        reply = json.dumps(output)
        r = Response(response=reply, status=400, mimetype="application/json")
        return r

    if x is not None and y is None:
        output = {
            "error": "You have not entered an y integer",
            "answer": 0000
        }
        reply = json.dumps(output)
        r = Response(response=reply, status=400, mimetype="application/json")
        return r

    if x is None and y is not None:
        output = {
            "error": "You have not entered an x integer",
            "answer": 0000
        }
        reply = json.dumps(output)
        r = Response(response=reply, status=400, mimetype="application/json")
        return r


def checkValueError(x, y):
    try:
        x_int = int(x)
        y_int = int(y)
        return False
    except ValueError:
        return True
