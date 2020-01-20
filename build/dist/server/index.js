"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express')
var express = require("express");
var http = require("http");
var io = require("socket.io");
var path = require("path");
var logger = require("morgan");
// const wssController = require('./controllers/ws')
var wssController_1 = require("./controllers/wssController");
// define port for the express app
var port = process.env.PORT || 3000;
// create express app
var app = express();
var used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log("The script uses approximately " + Math.round(used * 100) / 100 + " MB");
// create the httpsever with the express app
var server = http.createServer(app);
used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log("The script uses approximately " + Math.round(used * 100) / 100 + " MB");
var wss = io(server);
used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log("The script uses approximately " + Math.round(used * 100) / 100 + " MB");
app.use(logger('common'));
used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log("The script uses approximately " + Math.round(used * 100) / 100 + " MB");
var __dirname = path.resolve(path.dirname(''));
var DIST_DIR = path.join(__dirname, 'build');
var HTML_FILE = path.join(DIST_DIR, 'index.html');
// handle all static file requests
app.use(express.static(DIST_DIR));
app.get('*', function (req, res) {
    console.log('req', req);
    res.sendFile(HTML_FILE);
});
wssController_1.wssController(wss);
server.listen(port, function () {
    console.log('App listening on port: ' + port);
});
used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log("The script uses approximately " + Math.round(used * 100) / 100 + " MB");
//# sourceMappingURL=index.js.map