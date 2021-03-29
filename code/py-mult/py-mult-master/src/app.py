from flask import Flask
from flask import request
from flask import Response
import json
import mult
import errorHandle

app = Flask(__name__)


@app.route('/')
def multiply():
    x = request.args.get('x')
    y = request.args.get('y')

    if x is None or y is None:
        r = errorHandle.argsNotPresent(x, y)
    else:
        if errorHandle.checkValueError(x,y) is True:
            output = {
                "error": "You must enter an integer",
                "answer": 0000
            }
            reply = json.dumps(output)
            r = Response(response=reply, status=400, mimetype="application/json")
        else:
            answer = mult.str_mult(int(x), int(y))
            output = {
                "string": str(x) + "x" + str(y) + "=" + str(answer),
                "answer": answer
            }
            reply = json.dumps(output)
            r = Response(response=reply, status=200, mimetype="application/json")

    r.headers["Content-Type"] = "application/json"
    r.headers["Access-Control-Allow-Origin"] = "*"
    return r


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=80)
