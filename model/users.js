var db = require('../bin/database');

var users = db.model.define('users', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nama_depan: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    nama_belakang: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: db.Sequelize.STRING,
        unique: true,
        allowNull: true
    },
    email: {
        type: db.Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    tgl_lahir: {
        type: db.Sequelize.DATEONLY,
        allowNull: false
    },
    jenkel: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    },
    status_validasi: {
        type: db.Sequelize.BOOLEAN,
        allowNull: false
    },
    kode_validasi: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    desc: {
        type: db.Sequelize.TEXT,
        allowNull: true
    },
    image: {
        type: db.Sequelize.STRING,
        allowNull: true
    }
});

module.exports = users;