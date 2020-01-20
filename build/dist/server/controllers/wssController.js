"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function wssController(server) {
    server.on('connection', function (socket) {
        console.log('New connection', socket.id);
        socket.broadcast.emit('message', "new connection: " + socket.id);
    });
}
exports.wssController = wssController;
//# sourceMappingURL=wssController.js.map