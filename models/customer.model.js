const { sequelize } = require('../connections/sequelize.connection')
const Sequelize = require('sequelize');

Users = sequelize.define('users', {
    UserID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }, UserEmail: Sequelize.STRING, UserPassword: Sequelize.STRING, UserFirstName: Sequelize.STRING, UserLastName: Sequelize.STRING, UserCity: Sequelize.STRING, UserState: Sequelize.STRING, UserZip: Sequelize.STRING, UserEmailVerified: Sequelize.TINYINT, UserVerificationCode: Sequelize.STRING, UserIP: Sequelize.STRING, UserPhone: Sequelize.STRING, UserCountry: Sequelize.STRING, UserAddress: Sequelize.STRING, UserAddress2: Sequelize.STRING, isBlocked: Sequelize.TINYINT, isDeleted: Sequelize.TINYINT
});
module.exports = {
    Users: Users,
    sequelize: sequelize,
     Op: Sequelize.Op
}