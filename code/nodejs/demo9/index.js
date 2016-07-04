var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var root = __dirname;

http.createServer(function (req, res) {
    var abspath = path.join(root, url.parse(req.url).pathname);
    var stream = fs.createReadStream(abspath);
    /*stream.on('data', function (chunk) {
        res.write(chunk);
    });
    stream.on('end', function () {
        res.end();
    });*/
    stream.pipe(res);
}).listen(3000);