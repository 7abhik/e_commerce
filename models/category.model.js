const { sequelize } = require('../connections/sequelize.connection')
const Sequelize = require('sequelize');

Category = sequelize.define('productcategories', {
    CategoryID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }, CategoryName: Sequelize.STRING
});
module.exports = {
    Category: Category,
    sequelize: sequelize,
     Op: Sequelize.Op
}