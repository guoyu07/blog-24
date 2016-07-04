var http = require('http');
var items = [];
http.createServer(function (req, res) {
    var item = "";
    switch (req.method) {
        case 'POST':
            req.on('data', function (chunk) {
                item += chunk;
                console.log("OK");
            });
            req.on('end', function () {
                items.push(item);
                console.log("Done");
                res.end();
            });
            break;
        case 'GET':
            items.forEach(function (item, i) {
                res.write(i + ") " + item + "\n");
            });
            res.end();
            break;
    }
}).listen(3000);