const { sequelize } = require('../connections/sequelize.connection')
const Sequelize = require('sequelize');

Home = sequelize.define('dummies', {
    description: Sequelize.STRING,
    notewote:Sequelize.STRING
});
module.exports = {
    Home: Home,
    sequelize: sequelize,
     Op: Sequelize.Op
};