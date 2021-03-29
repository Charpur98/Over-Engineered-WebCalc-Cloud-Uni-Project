'use strict';

const express = require('express');

const PORT = 80;
const HOST = '0.0.0.0';

var sub = require('./subtract');

const app = express();
app.get('/', (req,res) => {

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*')
    var x = req.query.x;
    var y = req.query.y;
    var answer = 0;
    var error = false;

    var output = {
        'error': error,
        'string': '',
        'answer': 0
    };

    if (x == null && y == null){
        output.error = "X and Y are not present";
    } else if (x == null){
        output.error = "X is not present"
    } 
    else if (y == null){
        output.error = "Y is not present"
    } else{
        x = Number(x);
        y = Number(y);
        if (isNaN(x) || isNaN(y)){
            output.error = true;
            output.string = "X and Y must be integer values";
        } else {          
            answer = sub.subtract(x,y);
            output.string = x + '-' + y + '=' + answer;
            output.answer = answer;
        }
    }

    res.end(JSON.stringify(output));
});

app.listen(PORT, HOST);
