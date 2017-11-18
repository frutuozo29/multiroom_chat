var app = require('./config/server');

var server = app.listen(5000, function () {
    console.log('Servidor MultiroomChat rodando...');
});

var io = require('socket.io').listen(server);

app.set('io', io);

/** Criando conexão por websocket */
io.on('connection', function (socket) {
    console.log('Usuário logou.');

    socket.on('disconnect', function () {
        console.log('Usuário desconectou.')
    });

    socket.on('msgParaServidor', function (data) {
        socket.emit('msgParaCliente', { apelido: data.apelido, mensagem: data.mensagem });

        socket.broadcast.emit('msgParaCliente', { apelido: data.apelido, mensagem: data.mensagem });

        if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {
            socket.emit('participanteParaCliente', { apelido: data.apelido });
            socket.broadcast.emit('participanteParaCliente', { apelido: data.apelido });
        }
    })
}); 