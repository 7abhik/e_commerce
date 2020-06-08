const express = require('express');
var App = require('./app')
const { loggerMiddleware } = require('./middlewares/logger');
const { errorHandler, pageNotAvailable } = require('./middlewares/error-handler');

const { HomeController } = require('./controllers/home.controller');
const { CustomerController } = require('./controllers/customer.controller');
const { ProductController } = require('./controllers/product.controller');
const { CategoryController } = require('./controllers/category.controller');

const app = new App({
    port: 3000,
    middleWares: [express.json(), express.urlencoded(), loggerMiddleware],
    controllers: [new HomeController(), new CustomerController(), new ProductController(), new CategoryController()],
    errorHandlers: [pageNotAvailable, errorHandler]
});

/**************For development Only************ */
global.cl = function (str) {
    console.log(str)
    /*************************************** */
}
app.listen()