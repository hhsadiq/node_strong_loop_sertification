var net = require('net'),
  repl = require('repl');

 net.createServer(function(socket){
    console.log('Server started');
     repl.start({
         prompt : ['[', process.pid, '] - ', socket.remoteAddress, ':', socket.remotePort, ' > '].join(''),
         input: socket,
         output: socket
     }).on('exit', function(){
         socket.end();
     })
 }).listen(5001, function(){
     console.log('TCP Server listening on 5001')
 });