const express = require('express');
require('dotenv/config')
const { sequelize } = require('./connections/sequelize.connection');
var expressLayouts = require('express-ejs-layouts');
const ejs = require('ejs')
var bodyParser = require('body-parser')

module.exports = class App {
    constructor(appInit) {
        this.app = express();
        this.port = appInit.port;
        this.initDatabase();
        this.middleWare(appInit.middleWares);
        this.assets();
        this.template();
        this.routes(appInit.controllers);
        this.errorHandler(appInit.errorHandlers);
    }

    middleWare(middleWares) {
        middleWares.forEach((middleWare) => {
            this.app.use(middleWare);
            this.app.use(bodyParser.json({
                limit: '100mb'
            }));
            this.app.use(bodyParser.urlencoded({
                limit: '100mb',
                extended: true
            }));
        });

    }
    assets() {
        this.app.use(express.static('public'));
        this.app.use(express.static('views'));
    }
    template() {
        this.app.set('view engine', 'html');
        this.app.engine('html', ejs.renderFile)
        this.app.set('layout', 'layouts/layout');
        this.app.set("layout extractScripts", true)
        this.app.use(expressLayouts);        
    }
    routes(controllers) {
        controllers.forEach((controller) => {
            this.app.use(controller.path, controller.router);
        });
    }

    errorHandler(errorHandlers) {
        errorHandlers.forEach((errorHandler) => {
            this.app.use(errorHandler)
        })
    }

    initDatabase() {
        sequelize.authenticate().then(() => {
            console.log('SQL Connection established successfully.');
        }).catch(err => {
            console.error('Unable to connect to the SQL database:', err);
        })
    }



    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`);
        });
    }
}