var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(3000);

function handler(req, res) {
    fs.readFile(__dirname + '/socket.html', function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('error loading socket.html');
        }
        res.writeHead(200);
        res.end(data);
    })
}

io.on('connection', function (socket) {
    console.log('connected');

    socket.on('ping', function (data) {
        console.log('Intercepted event: ping');
        process.stdout.write('Data is: ');
        console.log(data);
        socket.emit('pong', data);
    });

    socket.on('broadcast', function(data){
        console.log('Intercepted event: broadcast');
        console.log('Data is: ');
        console.log(data);
        socket.broadcast.emit('message', data);
    });

    socket.on('all', function(data){
       console.log('Intercepted event: ');
        console.log('Data is: ');
        console.log(data);
        io.sockets.emit('message', data);
    });

    socket.on('disconnected', function () {
        process.stdout.write('disconnected');
    })
})