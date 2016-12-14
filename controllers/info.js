var router = require('express').Router();
var fs = require('fs');
var model = require('../model/init');
var Chance = require('chance');
var chance = new Chance();
var configApp = require('../config/app');
var datetime = require('../bin/datetime');
var Cryptr = require('cryptr'),
    cryptr = new Cryptr(configApp.secret);

module.exports = {
    path: '/info',
    router: router
};

router.get('/ahp', (req, res) => {
    res.locals.js = "dessy";
    res.render('info-ahp');
});
router.get('/saatly', (req, res) => {
    res.locals.js = "dessy";
    res.render('info-ahp');
});
router.get('/ir', (req, res) => {
    res.locals.js = "dessy";
    res.render('info-ir');
});