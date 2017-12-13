var express = require('express');
var app = express(); // Express App include
var http = require('http').Server(app); // http server
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT || 9090)
