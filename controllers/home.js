var router = require('express').Router();
var datetime = require('../bin/datetime');
var configApp = require('../config/app');
var users = require('../model/users');

module.exports = {
    path: '/',
    router: router
};

router.get('/', (req, res) => {
    res.render('home');
});