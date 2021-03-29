
'use strict';

const express = require('express');

const PORT = 80;
const HOST = '0.0.0.0';

let urls = require('./URLs.json');

let addURL = urls.addURL;
let minusURL = urls.minusURL;
let multURL = urls.multURL;
let divURL = urls.divURL;
let sqrtURL = urls.sqrtURL;
let caretURL = urls.caretURL;
let modURL = urls.modURL;

var output = {
    'error': false,
    'string': '',
    'answer': 0
};

const app = express();
app.get('/', (req,res) => {

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*')

    var x = req.query.x;
    var y = req.query.y;
    var op = req.query.op;
    var error = false;
    var URL = "0.0.0.0";
    var fetching = false;

    // Error checking
    if (x == null && y == null && op == null){
        output.error = true;
        output.string = "X, Y and Operator are not present";
        output.answer = "ERROR";
    } else if (x == null && op == null){
        output.error = true;
        output.string = "X and Operator are not present";
        output.answer = "ERROR";
    }  else if (x == null && y == null){
        output.error = true;
        output.string = "X and Y are not present";
        output.answer = "ERROR";
    } else if (x == null){
        output.error = true;
        output.string = "X is not present";
        output.answer = "ERROR";
    } else if (y == null && op == null){
        output.error = true;
        output.string = "Y and operator is not present";
        output.answer = "ERROR";
    } else if (y == null && op != "sqrt"){
        output.error = true;
        output.string = "Y is not present";
        output.answer = "ERROR";
    } else if (op == null){
        output.error = true;
        output.string = "Operator is not present";
        output.answer = "ERROR";
    } else{
        x = Number(x);
        y = Number(y);
        if (isNaN(x) || isNaN(y)){
            output.error = true;
            output.string = "X and Y must be integer values";
        } else {
            // Make the request to the service
            call(x,y,op);
        }
    }
    res.end(JSON.stringify(output));
});

function call(x,y,op){

    var output = {
        'error': false,
        'string': '',
        'answer': 0
    };

    if (op == 'add'){
        URL = addURL;
        if (checkService(URL, 8) == false)
        URL = urls.addURL2;
    } else if (op == 'sub'){
        URL = minusURL;
        if (checkService(URL, 4) == false)
        URL = urls.minusURL2;
    } else if (op == 'mult'){
        URL = multURL;
        if (checkService(URL, 12) == false)
        URL = urls.multURL2;
    } else if (op == 'div'){
        URL = divURL;
        if (checkService(URL, 3) == false)
        URL = urls.divURL2;
    } else if (op == 'sqrt'){
        URL = sqrtURL;
        if (checkService(URL, Math.sqrt(6)) == false)
        URL = urls.sqrtsURL2;
    } else if (op == 'caret'){
        URL = caretURL;
        if (checkService(URL, 36) == false)
        URL = urls.caretURL2;
    } else if (op == 'mod'){
        URL = modURL;
        if (checkService(URL, 0) == false)
        URL = urls.modURL2;
    } else {
        output.error = true;
        output.string = "operator doesnt exist";
        return output;
    }

    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET",URL+"?x="+x+"&y="+y, false);
        xhttp.onreadystatechange = function test() {
            if (this.readyState == 4 && this.status == 200) {
                var j = JSON.parse(this.responseText);

                updateJson(j);
                return output;
            }
        };
    console.log("Request sent to: " + URL+"?x="+x+"&y="+y);
    xhttp.send(null);

}

function updateJson(j){
    output = j;
    console.log(output);
}

function checkService(URL, answer) 
{
    let x = 6;
    let y = 2;
    let status = false;

    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET",URL+"?x="+x+"&y="+y, false);
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var j = JSON.parse(this.responseText);
        if (j.answer == answer){
            status = true;
        } else {
            status = false;
        }
    } else{
        status = false;
    }
    };
    xhttp.addEventListener("error", function reqListener () {
    status = false;
    });
    xhttp.send(null);
    return status;
}

app.listen(PORT, HOST);
