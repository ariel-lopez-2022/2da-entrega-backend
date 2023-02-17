
const express = require('express');
const {connectionSocket} = require('./utils/soket.io')
const handlebars = require('express-handlebars');
const productsRoute = require('./routes/products.routes');
const cardsRoute = require ('./routes/carts.routes')
const productsRouteBd = require('./routes/products.router.bd')
const cartsRouteBd = require('./routes/carts.router.bd')
const viewRoute = require('./routes/views.route')
const chatsRouter = require('./routes/chats.router')
const server = express();
const mongoose = require('mongoose');





const httpServer = server.listen(8080, ()=> {
    console.log('Servidor Listo en puerto 8080')
})
connectionSocket (httpServer);

//handlerbars
server.engine('handlebars', handlebars.engine());
server.set('views', __dirname + '/views');
server.set('view engine', 'handlebars');
//express
server.use(express.static(__dirname+'/public'));
server.use(express.json())
server.use(express.urlencoded({extended:true}))
//rutas

server.use("/api/products/", productsRoute);
server.use("/api/carts/", cardsRoute);
server.use("/", viewRoute);
server.use("/api/productsBd/", productsRouteBd );
server.use("/api/cartsBd/", cartsRouteBd );
server.use("/api/chats/", chatsRouter );


///Mongosse
mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://admin:w4Y4edtwtiZzRK6R@cluster0.7xcckea.mongodb.net/?retryWrites=true&w=majority',

(error)=>{
   if (error) {
     console.log('error de conexion', error);
     process.exit();
   }else {
    console.log('Conexion exitosa');
   }
});




