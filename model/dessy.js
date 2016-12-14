var db = require('../bin/database');

var dessy = db.model.define('dessy', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nama_dessy: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    versi_dessy: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    goal_dessy: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    file_dessy: {
        type: db.Sequelize.STRING,
        unique: true,
        allowNull: false
    }
});

module.exports = dessy;