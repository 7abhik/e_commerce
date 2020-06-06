const { Users } = require('../models/customer.model')
const { ErrorHandler } = require('../helpers/error')
const express = require("express")
const {CustomerService} = require('../services/customer.service');
const customerService = new CustomerService();
class CustomerController {
    constructor() {
        this.path = '/customer';
        this.router = express.Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/', this.saveCustomer);
        this.router.get('/list', this.getCustomerList);
        this.router.patch('/update/:id', this.updateCustomer);
    }

    async saveCustomer(req, res, next) {
        next(new ErrorHandler(400, 'Page under construction',error));

    };

    async getCustomerList(req, res, next) {
        try {
            let users = await customerService.getCustomerList()
            res.status(200).send(JSON.stringify(users));
        } catch (error) {
            next(new ErrorHandler(500, 'Internal Server Error',error));
        }
    };

    async updateCustomer(req, res, next) {
        try {
            let userID = await customerService.updateCustomer(req.params.id)
            console.log(userID);
            res.status(200).send('Updtaed:' + userID)
        } catch (error) {
            next(new ErrorHandler(500, 'Internal Server Error',error));
        }
    }
    

}
exports.CustomerController = CustomerController;
