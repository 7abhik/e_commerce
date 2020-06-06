const { Home, sequelize } = require('../models/home.model')

class HomeService {
    constructor() { }
    async getPost() {
        return await Home.findOne({ where: { notewote: 'this' } })
    };
    async validation() {
    }

    async ajaxform() {

    }

    async indexPage() {

    }
}

exports.HomeService = HomeService;