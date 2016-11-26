// init express
var express = require("express").createServer();
var app = express();

app.get('/', function(req, res) {
	res.send('ayy lmao');
});

app.listen(3000, function() {
	console.log('port 3000 lol');
});

//init socket.io
var io = require("socket.io")(app);