var stream   = require('stream'),
    Readable = stream.Readable,
    Writeble = stream.Writeble;
var util = require('util');
var fs = require('fs');

function ReadableStream(cfg) {
    Readable.call(this, cfg);
    this._max = 10000;
    this._index = 1;
};

util.inherits(ReadableStream, Readable);

ReadableStream.prototype._read = function (chunkSize) {
    var i = this._index++;
    if (i > this._max) {
        this.push(null)
    } else {
        var str = '' + i;
        var buf = new Buffer(str, 'utf8');
        this.push(buf.toString());
    }
};

var rs = new ReadableStream({});
var readData = '';
rs.on('data', function (chunk) {
    //console.log('');
    //console.log('Read a chunk of data');
    //console.log(chunk.toString());
    //console.log('');
    if (chunk.toString() === '5000'){
        console.log('ReadableStream on pause');
        rs.pause();
    }
    readData += chunk;
});

rs.on('end', function () {
    console.log('');
    console.log('ReadableStream: read ' + readData.length + ' bytes of data');
    console.log();
    var file = fs.createWriteStream('writeble.txt');
    file.write(readData);
    file.end('\n\nDone');

    file.on('finish', function() {
        console.log('');
        console.log('Writeble stream');
        console.log('');
    });
});

rs.on('close', function () {
    console.log('');
    console.log('ReadableStream closed');
    console.log('');
});

setTimeout(function(){
    console.log('');
    console.log('resume rs');
    console.log('');
    rs.resume();
}, 5000);
