const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();

        // se agrega la linea de abajo para que funcione el puerto
        this.port = process.env.PORT || 3000;

        this.paths = {
            clientes: '/api/clientes',
            //empresas: '/api/empresas',
            //movimientos: '/api/movimientos',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
            uploads: '/api/uploads'
        }
        /* this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.categoriasPath = '/api/categorias'; */

        this.conectarDB();

        //Middlewares
        this.middlewares();

        // Rutas de mi app
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        this.app.use( cors() );

        this.app.use( express.json() );

        this.app.use( express.static('public'));

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath : true
        }));

    }

    routes(){
        this.app.use( this.paths.clientes , require('../routes/clientes'));
        //this.app.use( this.paths.empresas , require('../routes/empresas'));
        //this.app.use( this.paths.movimientos, require('../routes/movimientos'));
        this.app.use( this.paths.productos, require('../routes/productos'));
        this.app.use( this.paths.usuarios, require('../routes/usuarios'));
        this.app.use( this.paths.uploads, require('../routes/uploads'));
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log(`Servidor corriendo en el puerto ${ this.port }`)
        });
    }
}

module.exports = Server;