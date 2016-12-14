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
    path: '/dessy',
    router: router
};

router.get('/create', (req, res) => {
    res.locals.js = "dessy-create";
    res.render('dessy-create');
});

router.get('/new', (req, res) => {
    res.locals.profile = true;
    res.locals.js = "profile";
    model.dessy.findAll({
        include: [model.users],
        order: [
            ['createdAt', 'DESC']
        ]
    }).then((dessy) => {
        for (var i = 0; i < dessy.length; i++) {
            var file = JSON.parse(fs.readFileSync('public/dessy/' + dessy[i].file_dessy, 'utf8'));
            dessy[i].datetime = datetime.fromNow(dessy[i].createdAt);
            dessy[i].kriteria = [];
            for (var x = 0; x < file.kriteria.length; x++) {
                dessy[i].kriteria.push({
                    nama: file.kriteria[x].nama,
                    bobot: file.bobot[x].value.toFixed(2)
                });
            }
        }
        res.locals.dessy = dessy;
        res.render('dessy-new');
    });
});

router.get('/id/:file', (req, res) => {
    var file = req.params.file;
    model.dessy.findOne({
        include: [model.users],
        where: {
            file_dessy: file
        }
    }).then((dss) => {
        var file = JSON.parse(fs.readFileSync('public/dessy/' + dss.file_dessy, 'utf8'));
        dss.datetime = datetime.fromNow(dss.createdAt);
        dss.kriteria = [];
        for (var x = 0; x < file.kriteria.length; x++) {
            dss.kriteria.push({
                nama: file.kriteria[x].nama,
                bobot: file.bobot[x].value.toFixed(2)
            });
        }
        res.locals.dss = dss;
        res.locals.js = "dessy-use";
        res.render('dessy-use');
    });
});

router.post('/id/:file', (req, res) => {
    var file = req.params.file;
    model.dessy.findOne({
        include: [model.users],
        where: {
            file_dessy: file
        }
    }).then((dss) => {
        var file = JSON.parse(fs.readFileSync('public/dessy/' + dss.file_dessy, 'utf8'));
        dss.datetime = datetime.fromNow(dss.createdAt);
        dss.kriteria = [];
        for (var x = 0; x < file.kriteria.length; x++) {
            dss.kriteria.push({
                nama: file.kriteria[x].nama,
                bobot: file.bobot[x].value.toFixed(2)
            });
        }
        res.json({
            info: dss,
            kriteria: dss.kriteria,
            datetime: dss.datetime
        });
    });
});

router.post('/create', (req, res) => {
    var dss = req.body;
    var dessy = JSON.parse(dss.data);
    var d = new Date();
    var n = d.getTime();
    var c = chance.natural({
        min: 111111111111,
        max: 999999999999
    });
    var filename = n.toString() + c.toString() + ".dessy";
    model.dessy.create({
        nama_dessy: dessy.nama,
        versi_dessy: dessy.versi,
        goal_dessy: dessy.goal,
        file_dessy: filename,
        userId: req.signedCookies.id
    }).then(function (dss) {
        if (dss) {
            fs.writeFile("public/dessy/" + filename, JSON.stringify(dessy), function (err) {
                if (err) {
                    res.json({
                        status: false
                    });
                } else {
                    res.json({
                        status: true
                    });
                }
            });
        } else {
            res.json({
                status: false
            });
        }
    });
});

router.post('/use', (req, res) => {
    var dss = req.body;
    var dessy = JSON.parse(dss.data);
    var d = new Date();
    var n = d.getTime();
    var c = chance.natural({
        min: 111111111111,
        max: 999999999999
    });
    var filename = n.toString() + c.toString() + ".dessynta";
    model.dessynta.create({
        file_dessynta: filename,
        userId: req.signedCookies.id
    }).then(function (dss) {
        if (dss) {
            fs.writeFile("public/dessynta/" + filename, JSON.stringify(dessy), function (err) {
                if (err) {
                    res.json({
                        status: false
                    });
                } else {
                    res.json({
                        status: true
                    });
                }
            });
        } else {
            res.json({
                status: false
            });
        }
    });
});