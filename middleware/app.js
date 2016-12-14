var router = require('express').Router();
var configApp = require('../config/app');
var modelUsers = require('../model/users');
var model = require('../model/init');
var datetime = require('../bin/datetime');

module.exports = {
    path: '/',
    router: router
};

router.use('/', (req, res, next) => {
    res.redirect('/profile');
});

router.use('/profile', (req, res, next) => {
    if (req.signedCookies.id) {
        modelUsers.findOne({
            where: {
                id: req.signedCookies.id
            }
        }).then((user) => {
            if (user.jenkel == 1) {
                user.jenkel = "Laki-laki";
            } else {
                user.jenkel = "Perempuan";
            }
            if (user.status_validasi) {
                user.status_validasi = "Terverifikasi";
            } else {
                user.status_validasi = "Belum terverifikasi";
            }
            user.bergabung = datetime.full(user.createdAt);
            model.dessy.count({
                where: {
                    userId: req.signedCookies.id
                }
            }).then(function (c) {
                res.locals.cDessy = c;
                model.dessynta.count({
                    where: {
                        userId: req.signedCookies.id
                    }
                }).then(function (c) {
                    res.locals.cDessynta = c;
                    res.locals.user = user;
                    res.locals.app = configApp;
                    next();
                });
            });
        })
    } else {
        res.redirect('/auth/login');
    }
});

router.use('/dessy', (req, res, next) => {
    if (req.signedCookies.id) {
        modelUsers.findOne({
            where: {
                id: req.signedCookies.id
            }
        }).then((user) => {
            res.locals.user = user;
            res.locals.app = configApp;
            next();
        })
    } else {
        res.redirect('/auth/login');
    }
});

router.use('/search', (req, res, next) => {
    if (req.signedCookies.id) {
        modelUsers.findOne({
            where: {
                id: req.signedCookies.id
            }
        }).then((user) => {
            res.locals.user = user;
            res.locals.app = configApp;
            next();
        })
    } else {
        res.redirect('/auth/login');
    }
});

router.use('/dessynta', (req, res, next) => {
    if (req.signedCookies.id) {
        modelUsers.findOne({
            where: {
                id: req.signedCookies.id
            }
        }).then((user) => {
            res.locals.user = user;
            res.locals.app = configApp;
            next();
        })
    } else {
        res.redirect('/auth/login');
    }
});

router.use('/auth/login', (req, res, next) => {
    if (req.signedCookies.id) {
        res.redirect('/dashboard');
    } else {
        res.locals.app = configApp;
        next();
    }
});

router.use('/auth/register', (req, res, next) => {
    if (req.signedCookies.id) {
        res.redirect('/dashboard');
    } else {
        res.locals.app = configApp;
        next();
    }
});

router.use('/auth/verifikasi', (req, res, next) => {
    if (req.signedCookies.id) {
        res.redirect('/dashboard');
    } else {
        res.locals.app = configApp;
        next();
    }
});