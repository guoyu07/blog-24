var events = require('events');
var net = require('net');

var chanel = new events.EventEmitter();
chanel.clients = {};
chanel.subscriptions = {};

chanel.on('join', function (id, client) {
    this.clients[id] = client;
    this.subscriptions[id] = function (senderid, message) {
        if (senderid != id) {
            chanel.clients[id].write(message);
        }
    };
    this.on('broadcast', this.subscriptions[id]);
    this.on('leave',function(id){
        chanel.removeEventListener('broadcast', this.subscriptions[id]);
        chanel.emit('broadcast',id,id+"离开");
    });
});

net.createServer(function (client) {
    var id = client.remotePort;
    chanel.emit('join', id, client);
    /*client.on('connection', function () {
        console.log("connect:");
        chanel.emit('join', id, client);
    });*/
    client.on('data', function (data) {
        data = data.toString();
        chanel.emit('broadcast', id, data)
    });
    client.on('close',function(){
        chanel.emit('leave',id);
    });
}).listen(8888);
