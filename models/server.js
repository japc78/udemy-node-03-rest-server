const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            authPath : '/api/auth',
            categoriesPath : '/api/categories',
            userPath : '/api/user',
        }
        this.dbConnection();
        this.middleWares();
        this.routes();
    }

    routes() {
        this.app.use(this.paths.authPath, require('../routes/auth'));
        this.app.use(this.paths.userPath, require('../routes/user'));
        this.app.use(this.paths.categoriesPath, require('../routes/categories'));
    }

    async dbConnection() {
        await dbConnection();
    }


    middleWares() {
        // Cors
        this.app.use( cors());

        // Get and parse of Body
        this.app.use( express.json());

        // Public path
        this.app.use(express.static('public'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`);
        })
    }
}

module.exports = Server;