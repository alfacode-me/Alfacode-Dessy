var router = require('express').Router();
var datetime = require('../bin/datetime');
var configApp = require('../config/app');
var modelInit = require('../model/init');
var dessy = require('../model/dessy');

module.exports = {
    path: '/',
    router: router
};

router.get('/', (req, res) => {
    res.redirect('/profile');
});

router.get('/sync', (req, res) => {
    modelInit.sync();
    res.send('SYNC DATABASE');
});