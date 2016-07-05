/**
 * 命令行1 运行:node echo_server.js
 * 命令行2 执行:telnet 127.0.0.1 8888
 *
 * Telnet窗口中按下“Ctrl+]”；然后，输入“set localecho”命令，再连续按两次回车键
 */
var net = require('net');
net.createServer(function (socket) {
    socket.on('data', function (data) {
        socket.write("socket data:"+data);
    });
}).listen(8888);