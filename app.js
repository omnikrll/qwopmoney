// init express
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var chokidar = require('chokidar');

server.listen(3000);

var watcher = chokidar.watch('example.txt', {
	ignored: /[\/\\]\./,
	persistent: true
});

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function (data) {
	console.log(data);
	});

	watcher.on('change', function() {
		console.log('ya did the thing');
		socket.emit('lol', {
			ayy: 'lmao'
		});
	});
});