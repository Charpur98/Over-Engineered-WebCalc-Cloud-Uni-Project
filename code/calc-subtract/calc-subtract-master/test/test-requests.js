var expect  = require('chai').expect;
var sub = require('../subtract');
const express = require('express');
var server = require('../server');

const PORT = 80;
const HOST = 'http://calc-subtract.40174730.qpc.hal.davecutting.uk';

const app = express();

it('Test Request', function(done) {

    app.get('/', (req,res) => {

        let x = 10;
        let y = 5;

        let xhttp = new XMLHttpRequest();
        xhttp.open("GET",HOST+"?x="+x+"&y="+y, false);
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var j = JSON.parse(this.responseText);
                if (j.answer == answer){
                    console.log("pass");
                }
                else {
                    console.log("fail");
                }
            }
        };
        xhttp.addEventListener("error", function reqListener () {
        value = "ERROR - Couldn't connect";
        reply = (page + " status: " + value + "<br>");
        });
        xhttp.send(null);
        console.log("passed tests: " + pass + " | " + "failed tests: " + fail);

            res.send("test");
        });
    app.listen(PORT, HOST);

    expect(1).to.equal(1);
    done();
});

