var db = require('../bin/database');

var dessynta = db.model.define('dessynta', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    file_dessynta: {
        type: db.Sequelize.STRING,
        unique: true,
        allowNull: false
    }
});

module.exports = dessynta;