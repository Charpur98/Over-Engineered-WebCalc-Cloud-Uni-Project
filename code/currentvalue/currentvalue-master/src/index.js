'use strict';

const PORT = 80;
const HOST = '0.0.0.0';

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const app = express();
app.get('/', (req,res) => {

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Access-Control-Allow-Origin', '*')

    let ans = req.query.ans;

    if (ans != null){
      var jAns = {
        'answer': ans
      };
      
      const jsonString = JSON.stringify(jAns)
      writeJson(jsonString);
    }

      fs.readFile('./value.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading file:", err);
            var jAns = {
              'answer': 0
            };
            const jsonString = JSON.stringify(jAns)
            writeJson(jsonString);
        }
        try {
            var jAns = JSON.parse(jsonString)
            console.log("read " + jsonString);
      } catch(err) {
            console.log('Error parsing JSON string:', err)
        }
        response(jAns);
    })
    function writeJson(jsonString){
      fs.writeFile('value.json', jsonString, function (err) {
        if (err) throw err;
        console.log(jsonString + " written");
    });
    }

      function response(jAns){
   //     res.sendFile(path.join(__dirname+'/value.json'));
    res.end(JSON.stringify(jAns));
      }
});

    
    app.use('/', router);
    app.listen(PORT, HOST);