const Sequelize = require('sequelize');
const path = 'mysql://root:cmr334@localhost:3306/e_commerce';
exports.sequelize = new Sequelize(path, {
    operatorsAliases: false, define: {
        timestamps: false
    }
});
