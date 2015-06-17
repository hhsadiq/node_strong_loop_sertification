process.on('uncaughtException', function(err){
   console.log('uncaught error: ');
    console.log(err.stack);
});

var throwError = function(text){
    throw new Error(text);
};

try {
    throw new Error('My error!');
} catch (e){
    console.log('message: ', e.message);
    console.log('name: ', e.name);
    console.log('fileName: ', e.fileName);
    console.log('lineNumber: ', e.lineNumber);
    console.log('columnNumber: ', e.columnNumber);
    console.log('stack: ', e.stack);
}

try {
    throwError('error 1');
} catch(e){
    console.log(e.stack);
}

process.nextTick(function(){
    try {
        throwError('error 2');
    } catch(e){
        console.log(e.stack);
    }
});

var Promise = require('promise');

var first = new Promise(function(fullfill, reject){
    process.nextTick(function () {
        try {
            throw new Error('promise error');
        }
        catch (err) {
            fullfill('');
        }
    });
});

var second = new Promise(function (fullfill, reject){
    throwError('promise error 2')
});

first
    .then(function(res){
        return second;
    }
    ).then(function(){
        throwError('promise chain error');
    })
    .catch(function(e){
        console.log('promise cached error');
        console.log(e.stack);
    });

process.nextTick(function(){throwError('uncaught error 1')});