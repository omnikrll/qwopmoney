// init express
var express = require('express');
var app = express();
var fs = require('fs');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var chokidar = require('chokidar');

app.use('/assets', express.static(__dirname + '/assets'));

server.listen(3000);

var watcher = chokidar.watch('database.json', {
	ignored: /[\/\\]\./,
	persistent: true
});

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
	watcher.on('change', function() {
		var data = JSON.parse(fs.readFileSync('database.json'));
		var payload = data.accounts.pop().transactions.pop();
		console.log('ya did the thing');
		socket.emit('lol', payload);
	});
});