'use strict';

const PORT = 80;
const HOST = '0.0.0.0';

const express = require('express');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require('fs');
const path = require('path');
const router = express.Router();

const { spawn } = require('child_process')
const logOutput = (name) => (data) => console.log(`[${name}] ${data.toString()}`)

let addURL = "http://calc-add.40174730.qpc.hal.davecutting.uk/";
let subURL = "http://calc-subtract.40174730.qpc.hal.davecutting.uk/";
let multURL = "http://py-mult.40174730.qpc.hal.davecutting.uk/";
let divURL = "http://go-div.40174730.qpc.hal.davecutting.uk/";
let sqrtURL = "http://java-sqrt.40174730.qpc.hal.davecutting.uk/";
let caretURL = "http://c-caret.40174730.qpc.hal.davecutting.uk/";
let modURL = "https://yb5syo1b3i.execute-api.us-east-1.amazonaws.com/default/modu";
let frontendURL = "http://calc-frontend.40174730.qpc.hal.davecutting.uk/";

let value = -1;
let reply = "";

const app = express();
app.get('/', (req,res) => {

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Access-Control-Allow-Origin', '*')

    var html =     
    ("<!DOCTYPE html> <html>" +
    "<title>Monitoring Service</title>" +
    "<h1> Monitoring Service </h1>" +
    checkService("add") +
    checkService("sub") +
    checkService("mult") +
    checkService("div") +
    checkService("sqrt") +
    checkService("caret") +
    checkService("mod") +
    checkFrontEnd() +
    "<br><br>" +
    testService("add") +
    testService("sub") +
    testService("mult") +
    testService("div") +
    testService("sqrt") +
    testService("caret") +
    testService("mod") +
    "<html>");

    fs.writeFile('index.html', html, function (err) {
        if (err) throw err;
        response();
      });

      function response(){
        res.sendFile(path.join(__dirname+'/index.html'));
      }
});

    function checkService(page) 
    {
        let URL = "";
        let answer = -1;
        let x = 6;
        let y = 2;
        if (page == "add"){
            URL = addURL;
            answer = x+y;
        }
        else if (page == "sub"){
            URL = subURL;
            answer = x-y;
        }
        else if (page == "mult"){
            URL = multURL;
            answer = x*y;
        }
        else if (page == "div"){
            URL = divURL;
            answer = x/y;
        }
        else if (page == "sqrt"){
            URL = sqrtURL;
            answer = Math.sqrt(x);
        }
        else if (page == "caret"){
            URL = caretURL;
            answer = Math.pow(x,y);
        }
        else if (page == "mod"){
            URL = modURL;
            answer = x%y;
        }
        else {
            return "ERROR - Operator doesnt exist";
        }
        
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET",URL+"?x="+x+"&y="+y, false);
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var j = JSON.parse(this.responseText);
                if (j.answer == answer){
                    var string = (page + " status: " +'<a href="' + URL + '">ONLINE</a>' + "<br>"); 
                    sendReply(string);
                    return reply;
                }
                else {
                    var string = (page + " status: " +'<a href="' + URL + '">ONLINE</a>' + " - Failed to get correct result" +"<br>"); 
                    sendReply(string);
                    return reply;
                }
            }
            else if (this.readyState == 4 && (this.status == 404 || this.status == 400)){
                var string = (page + " status: " +'<a href="' + URL + '">OFFLINE</a>' + " - Failed to connect" +"<br>"); 
                sendReply(string);
                return reply;
            }
        };
        xhttp.addEventListener("error", function reqListener () {
        value = "ERROR - Couldn't connect";
        reply = (page + " status: " + value + "<br>");
        });
        xhttp.send(null);
        return reply;
    }

    function checkFrontEnd(){
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET",frontendURL, false);
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var string = ("frontend status: " +'<a href="' + frontendURL + '">ONLINE</a>' + "<br>");
            sendReply(string);
            return reply;
        }
    };
        xhttp.addEventListener("error", function reqListener () {
        value = "ERROR - Couldn't connect";
        reply = ("frontend status: " + value + "<br>");
        });
        xhttp.send(null);
        return reply;
    }

    function sendReply(string){
        reply = string;
    }

    function testService(page){
        var pass = 0;
        var fail = 0;
    
        for (var i=0; i <5; i++ ){
            var x = Math.floor(Math.random() * 100);
            var y = Math.floor(Math.random() * 100);   
            var answer = 0;

            if (page == "add"){
                URL = addURL;
                answer = x+y;
            }
            else if (page == "sub"){
                URL = subURL;
                answer = x-y;
            }
            else if (page == "mult"){
                URL = multURL;
                answer = x*y;
            }
            else if (page == "div"){
                URL = divURL;
                answer = x/y;
            }
            else if (page == "sqrt"){
                URL = sqrtURL;
                answer = Math.sqrt(x);
            }
            else if (page == "caret"){
                URL = caretURL;
                answer = Math.pow(x,y);
            }
            else if (page == "mod"){
                URL = modURL;
                answer = x%y;
            }
    
            let xhttp = new XMLHttpRequest();
            xhttp.open("GET",URL+"?x="+x+"&y="+y, false);
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var j = JSON.parse(this.responseText);
                    var result = j.answer;
                    if (result == answer){
                        pass++;
                    }
                    else if (result.toFixed(3) == answer.toFixed(3)){
                        pass++;
                    }
                    else {
                        fail++;
                        sendEmail();
                    }
                }
                else if (this.readyState == 4 && (this.status == 400 || this.status == 404)) {
                    fail++;
                    sendEmail();
                }
            };
            xhttp.addEventListener("error", function reqListener () {
            value = "ERROR - Couldn't connect";
            reply = (page + " status: " + value + "<br>");
            });
            xhttp.send(null);
        }
        console.log(page + " passed tests: " + pass + " | " + "failed tests: " + fail);
        return page + " passed tests: " + pass + " | " + "failed tests: " + fail + "<br>";
    }

    function sendEmail() {
        const process = spawn('python', ['./sendemail.py', 'my', 'args']);
      
        process.stdout.on(
          'data',
          logOutput('stdout')
        );
      
        process.stderr.on(
          'data',
          logOutput('stderr')
        );
      }
    

    app.use('/', router);
    app.listen(PORT, HOST);