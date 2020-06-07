const { sequelize } = require('../connections/sequelize.connection')
const Sequelize = require('sequelize');
Product = sequelize.define('products', {
    ProductID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }, ProductSKU: Sequelize.STRING(50), ProductName: Sequelize.STRING(100), ProductPrice: Sequelize.FLOAT, ProductWeight: Sequelize.FLOAT, ProductShortDesc: Sequelize.STRING(1000), ProductLongDesc: Sequelize.TEXT, ProductThumb: Sequelize.STRING(250), ProductImage: Sequelize.STRING(250), ProductCategoryID: Sequelize.INTEGER,ProductSubCategoryID: Sequelize.INTEGER,ProductCreatedDate: Sequelize.DATE, ProductUpdatedDate: Sequelize.DATE, ProductStock: Sequelize.FLOAT, ProductColorOptions: Sequelize.STRING(100), ProductMeasurmentUnit: Sequelize.STRING(100), ProductLive: Sequelize.TINYINT, ProductUnlimited: Sequelize.TINYINT, ProductLocation: Sequelize.STRING(250)
});
module.exports = {
    Product: Product,
    sequelize: sequelize,
    Op: Sequelize.Op
}




