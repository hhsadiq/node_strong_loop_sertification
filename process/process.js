var util = require('util');
var time = process.hrtime();

process.on('exit', function(code){
    console.log('exit code: ', code);

    setTimeout(function(){
        console.log('Never executed code');
    }, 1000);
});

setTimeout(function () {
    console.log('This need to continue the process execution for 30 seconds');
}, 30000);


process.stderr.write('commands: argv kill memory cwd() info env mainModule test uptime hrtime' + "\n");

process.stdin.on('readable', function(){
   var chunk = process.stdin.read();
    if (chunk !== null){
        var str = chunk.toString().trim();
        switch (str){
            case 'argv':
                process.stdout.write('argv >');
                process.stdout.write(util.inspect(process.argv));
                process.stdout.write('\n');
                break;
            case 'kill':
                process.stdout.write('kill command');
                process.stdout.write('\n');
                process.kill();
                break;
            case 'memory':
                process.stdout.write('Memory usage > ');
                process.stdout.write(util.inspect(process.memoryUsage()));
                process.stdout.write('\n');
                break;
            case 'cwd()':
                process.stdout.write('cwd() > ');
                process.stdout.write(util.inspect(process.cwd()));
                process.stdout.write('\n');
                break;
            case 'info':
                process.stdout.write('Info > ');
                process.stdout.write('Version: ' + process.version + "\n");
                process.stdout.write('Lib versions: \n');
                process.stdout.write(util.inspect(process.versions) + '\n');
                process.stdout.write('Architecture: ' + process.arch + "\n");
                process.stdout.write('Title: ' + process.title + "\n");
                process.stdout.write('Platform: ' + process.platform + "\n");
                process.stdout.write('process\'s file mode creation mask ' + process.umask() + "\n");
                process.stdout.write('pid: ' + process.pid + "\n");
                break;
            case 'env':
                process.stdout.write('Env > ');
                process.stdout.write(util.inspect(process.env));
                process.stdout.write('\n');
                break;
            case 'mainModule':
                process.stdout.write('mainModule > ');
                process.stdout.write(process.mainModule);
                process.stdout.write('\n');
                break;
            case 'test':
                process.stderr.write('Error occured!' + "\n");
                process.stdout.write('Some output message!' + "\n");
                break;
            case 'uptime':
                process.stdout.write(process.uptime() + '\n');
                break;
            case 'hrtime':
                var diff = process.hrtime(time);
                time = process.hrtime();
                process.stdout.write('benchmark took '+  diff[0]*1e9 + diff[1] + ' nanoseconds: ') +'\n';
                break;
            default:
                process.stdout.write('Unknown command > ' + chunk);
        }
    }
});