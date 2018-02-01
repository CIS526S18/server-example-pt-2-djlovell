"use strict";

// PORT definition
const PORT = 8039;

// Import the HTTP library
const http = require('http');

// Import the fs library 
const fs = require('fs');

const cache = {};
cache['openhouse.html'] = fs.readFileSync('public/openhouse.html');
cache['openhouse.css'] = fs.readFileSync('public/openhouse.css');
cache['openhouse.js'] = fs.readFileSync('public/openhouse.js');

/**@serveIndex
 * Ser
 * 
 */
function serveIndex(path, res){
    fs.readdir(path, function(err, files){
        if(err){
            res.statuscode = 500;
            console.error(err);
            res.end("Server Error");
        }
        var html = "<p>Index of " + path + "</p>";
        html += "<ul>";
        html += files.map(function(item){
            return "<li>" + "<a href='>" + item + "'>" + item + "</a>" + "</li>";
        }).join("");
        html += "</ul>";
        res.end(html);
    });
}

/** @function serveFile
 * Serves the specified file with the provided response object.
 * @param {string} path - specified the file path to read
 * @param {http.serverResponse} res - the http response object
 */
function serveFile(path, res){
    fs.readFile(path, function (err, data){
                        if(err){
                            return console.error(err);
                            res.statuscode = 500;
                            res.end("Server Error: Could not read the file/ ");
                        } 
                        res.end(data);
    });
}

/**@function handleRequest
 * Request handler for our http Server
 * @param {http.ClientRequest} req - the http request object
 * @param {http.ServerResponse} res - the http response
 */
function handleRequest(req, res) {
    // map request URLs to files
    switch(req.url) {
        case '/':
            serveIndex("public",res);
        case '/openhouse.html':
            //res.end(cache['openhouse.html']);
            serveFile('public/openhouse.html', res);
            
            break;
        case '/openhouse.css':
            //res.end(cache['openhouse.css']);
            serveFile('public/openhouse.css', res);
            break;
        case '/openhouse.js':
            //res.end(cache['openhouse.js']);
            serveFile('public/openhouse.js', res);
            break;
        default:
            res.statusCode = 404;
            res.end("File Not Found");
    }

}

// Create the web server
var server = http.createServer(handleRequest);

// Start listening on port PORT
server.listen(PORT, function(){
    console.log("Listening on port " + PORT);
});