var events = require('events'),
EventEmitter = events.EventEmitter;

var eventBus = new EventEmitter();

eventBus.on('message', function(obj){
    console.log('"on" listener1 get new message: ');
    console.log(obj);
});

eventBus.on('message', function(obj){
    console.log('"on" listener2 get new message: ');
    console.log(obj);
});

eventBus.once('message', function(obj){
    console.log('"once" listener3 get new message (will be removed automaticaly): ');
    console.log(obj);
});

console.log('"message" listener count: ' + EventEmitter.listenerCount(eventBus, 'message'));
eventBus.emit('message', 'hello from emitter');

console.log('"message" listener count: ' + EventEmitter.listenerCount(eventBus, 'message'));
eventBus.removeListener('message', eventBus.listeners('message')[1]);
console.log('"message" listener count: ' + EventEmitter.listenerCount(eventBus, 'message'));

eventBus.emit('message', 'hello from emitter2');
eventBus.removeAllListeners('message');
console.log('"message" listener count: ' + EventEmitter.listenerCount(eventBus, 'message'));

eventBus.on('message', function(obj){
    console.log('"on" listener4 get new message with excaption: ');
    throw new Error('excaption');
});

eventBus.emit('message', 'message with text');
