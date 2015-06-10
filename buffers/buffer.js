var buf = new Buffer('hello nodejs world ☃', 'utf-8');

console.log(buf.toString());
console.log('is "utf-8" encoding (isEncoding): ', Buffer.isEncoding('utf-8'));
console.log('is buffer (isBuffer): ', Buffer.isBuffer(buf));
console.log('buffer length: ', buf.length);
console.log('string length: ', buf.toString().length);

var buf2 = new Buffer(1024); // 1KB
buf2.write('hello nodejs world! ☃', 'utf-8');

console.log('buffer length: ', buf2.length);
console.log('string length: ', buf2.toString().length);

var buf3 = new Buffer('It is comming!', 'utf-8');
console.log('toJSON: ', buf3.toJSON());

buf3.copy(buf,15);
console.log(buf3.toString());
console.log(buf.toString());

var buf4 = new Buffer(20);
console.log(buf4.toString());
buf4.fill('hello ');
console.log(buf4.toString());