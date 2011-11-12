var express = require('express');
var app = express.createServer();
var io = require('socket.io').listen(app);

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');

    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res) {
    res.render('index', {
	title: 'Express'
    });
});

io.sockets.on('connection', function(socket) {
    socket.emit('news', {hello: 'world'});
    socket.on('my other event', function(data) {
	console.log(data);
    });
    socket.on('send_message', function(data) {
	console.log('receive message: ' + data.message);
	socket.broadcast.emit('broadcastMessage', data.message);
    });
});
app.listen(8080);