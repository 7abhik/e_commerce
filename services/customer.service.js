const { Users } = require('../models/customer.model')

class CustomerService {
    constructor() { }
    async saveCustomer() {

    };

    async getCustomerList() {
        return await Users.findAll()
    };

    async updateCustomer(userID) {
        return await Users.update(
            {
                isBlocked: 1
            }, {
            where: { userID: userID }
        })
    }
    async errorTest() {
    };
}

exports.CustomerService = CustomerService;