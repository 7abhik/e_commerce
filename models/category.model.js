const { sequelize } = require('../connections/sequelize.connection')
const Sequelize = require('sequelize');

Category = sequelize.define('productcategories', {
    CategoryID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }, CategoryName: Sequelize.STRING, CreatedOn: Sequelize.DATE, UpdatedOn: Sequelize.DATE
});
SubCategory = sequelize.define('productsubcategories', {
    SubCategoryID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }, CategoryID: Sequelize.INTEGER, SubCategoryName: Sequelize.STRING, CreatedOn: Sequelize.DATE, UpdatedOn: Sequelize.DATE
});
module.exports = {
    Category: Category,
    SubCategory:SubCategory,
    sequelize: sequelize,
    Op: Sequelize.Op
}