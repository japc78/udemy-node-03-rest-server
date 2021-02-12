const express = require('express')
const cors = require('cors')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/user';
        this.middleWares();
        this.routes();
    }

    routes() {
        this.app.use(this.userPath, require('../routes/user'));
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