const express = require('express');

const { Server: HttpServer } = require('http');
const { Server: IO } = require('socket.io');

const cproducts = require('../contenedores/products.js');
const cmessages = require('../contenedores/messages.js');
const { engine } = require("express-handlebars");

const products = new cproducts();
const messages = new cmessages();

//--------------------------------------------
// instancio servidor, socket y api
const app = express();
const httpServer = new HttpServer(app);
const io = new IO(httpServer);

app.engine('handlebars', engine());
app.set('views', '../public/plantillas');
app.set('view engine', 'handlebars');

//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
    //productos
    socket.emit('product', products.getAll());

    socket.on('new-product', data => {
        products.addProduct(data);
        io.sockets.emit('product', products.getAll());
    })

    //mensajes
    const msg = messages.getAll();
    socket.emit('message', msg);
    

    socket.on('new-message', data => {
        messages.addMessage(data);
        io.sockets.emit('message', messages.getAll())
    })
});

//--------------------------------------------
// agrego middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('../public'));

//--------------------------------------------
// inicio el servidor

const PORT = process.env.PORT || 8080;
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`);
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`));