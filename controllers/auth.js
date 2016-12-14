var router = require('express').Router();
var configApp = require('../config/app');
var Chance = require('chance');
var chance = new Chance();
var Cryptr = require('cryptr'),
    cryptr = new Cryptr(configApp.secret);
var nodemailer = require('nodemailer');
var modelUsers = require('../model/users');

var transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
        user: 'email@alfacode.me',
        pass: 'surya2341996'
    }
});


module.exports = {
    path: '/auth',
    router: router
};

router.get('/logout', (req, res) => {
    res.clearCookie('id');
    res.redirect('/auth/login');
});

router.get('/register', (req, res) => {
    res.locals.register = true;
    res.render('register');
});

router.get('/login', (req, res) => {
    res.locals.login = true;
    res.render('login');
});

router.get('/verifikasi', (req, res) => {
    res.locals.verifikasi = true;
    res.render('verifikasi');
});

router.post('/login', (req, res) => {
    var reqData = req.body;
    reqData.password = cryptr.encrypt(reqData.password);
    var resData = {
        status: false
    };
    modelUsers.findOne({
        where: {
            username: reqData.username,
            password: reqData.password
        }
    }).then(function (user) {
        if (user) {
            if (reqData.remember) {
                res.cookie('id', user.id, {
                    httpOnly: true,
                    signed: true
                });
                res.json({
                    status: true
                });
            } else {
                res.cookie('id', user.id, {
                    maxAge: 1000 * 60 * 60,
                    httpOnly: true,
                    signed: true
                });
                res.json({
                    status: true
                });
            }
        } else {
            res.json({
                status: false
            });
        }
    });
});

router.post('/verifikasi', (req, res) => {
    var reqData = req.body;
    modelUsers.findOne({
        where: {
            username: reqData.username
        }
    }).then(function (user) {
        if (user) {
            res.json({
                status: 3
            });
        } else {
             modelUsers.update({
                username: reqData.username,
                status_validasi: true,
                kode_validasi: null
            }, {
                where: {
                    status_validasi: false,
                    kode_validasi: reqData.kode_verifikasi
                }
            }).then((result) => {
                if(result[0]) {
                    res.json({
                        status: 1
                    });
                } else {
                    res.json({
                        status: 2
                    });
                }
            });
        }
    });
});

router.post('/register', (req, res) => {
    var reqData = req.body;
    reqData.password = cryptr.encrypt(reqData.password);
    reqData.status_validasi = false;
    reqData.kode_validasi = chance.natural({
        min: 100000,
        max: 999999
    });
    var resData = {
        status: false
    };
    modelUsers.findOrCreate({
            where: {
                email: reqData.email
            },
            defaults: reqData
        })
        .spread(function (user, created) {
            resData.status = created;
            if (created) {
                var mailOptions = {
                    from: '"Alfacode.me" <email@alfacode.me>',
                    to: reqData.email,
                    subject: 'Verifikasi Akun Alfacode.me',
                    html: '<div style="text-align:center"><h2>Alfacode.me</h2><hr><h4>Verifikasi Akun</h4>Link : <a href="https://dessy.alfacode.me/auth/verifikasi">https://dessy.alfacode.me/auth/verifikasi</a><br><br>Kode : <strong>' + reqData.kode_validasi + '</strong><hr><a href="https://alfacode.me">https://alfacode.me</a></div>'
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: ' + info.response);
                });
            }
            res.json(resData);
        });
});