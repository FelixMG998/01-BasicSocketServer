const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors')
class Server {
    constructor () {
        this.app = express();
        this.port = process.env.PORT;

        this.server = http.createServer(this.app);

        this.io = socketIO(this.server, {/* configuraciones del server */})
    }

    middelwares() {
        this.app.use(express.static(path.resolve(__dirname,'../public')))
        //CORS
        this.app.use(cors());
    }

    configurarSockets() {
        new Sockets(this.io);
    }

    execute() {
        //Midelwares init
        this.middelwares();
        this.configurarSockets();
        //Server init
        this.server.listen( this.port, () => {
            console.log('server corriendo en puerto: ', this.port)
        })
    }

}

module.exports = Server;