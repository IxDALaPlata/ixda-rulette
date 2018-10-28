var express = require('express');
var app = express(); // Express App include
var http = require('http').Server(app); // http server
var path = require('path');
var port = process.env.PORT | 9090

app.use(express.static(path.join(__dirname, './')));


app.listen(port);
console.log(`Running on port ${port}`);
