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
    path: '/profile',
    router: router
};

router.get('/', (req, res) => {
    res.locals.profile = true;
    res.locals.js = "profile";
    res.render('profile');
});

router.get('/dessy', (req, res) => {
    res.locals.profile = true;
    res.locals.js = "profile";
    model.dessy.findAll({
        include: [model.users],
        where: {
            userId: req.signedCookies.id
        },
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
        res.render('profile-dessy');
    });
});

router.get('/dessynta', (req, res) => {
    res.locals.profile = true;
    res.locals.js = "profile";
    model.dessynta.findAll({
        include: [model.users],
        where: {
            userId: req.signedCookies.id
        },
        order: [
            ['createdAt', 'DESC']
        ]
    }).then((dessy) => {
        for (var i = 0; i < dessy.length; i++) {
            var file = JSON.parse(fs.readFileSync('public/dessynta/' + dessy[i].file_dessynta, 'utf8'));
            dessy[i].datetime = datetime.fromNow(dessy[i].createdAt);
            dessy[i].file = file;
            var ocw = [];
            var vkp = [];
            for (var a = 0; a < dessy[i].file.dessy.kriteria.length; a++) {
                var vp = [];
                for (var b = 0; b < dessy[i].file.vektorPrioritas[a].length; b++) {
                    vp.push((dessy[i].file.vektorPrioritas[a][b].value).toFixed(2));
                }
                ocw.push({
                    kriteria: dessy[i].file.dessy.kriteria[a].nama,
                    bobot: dessy[i].file.dessy.kriteria[a].bobot,
                    vp: vp
                });
            };
            for (var x = 0; x < dessy[i].file.dessy.kriteria.length; x++) {
                var v1 = [];
                for (var a = 0; a < dessy[i].file.alternatif.length; a++) {
                    v1.push({
                        alternatif: dessy[i].file.alternatif[a].nama,
                        vp: (dessy[i].file.vektorPrioritas[x][a].value).toFixed(2)
                    });
                };
                vkp.push({
                    kriteria: dessy[i].file.dessy.kriteria[x].nama,
                    value: v1 
                });
            }
            var cw = [];
            for (var a = 0; a < dessy[i].file.alternatif.length; a++) {
                var cowe = 0;
                for (var b = 0; b < dessy[i].file.vektorPrioritas.length; b++) {
                    for (var c = 0; c < dessy[i].file.alternatif.length; c++) {
                        if(a == c) {
                            cowe += parseFloat(ocw[b].bobot) * parseFloat(ocw[b].vp[c]);
                        }
                    }
                }
                cw.push(cowe.toFixed(4));
            };
            dessy[i].vkp = vkp;
            dessy[i].ocw = ocw;
            dessy[i].cw = cw;
        }
        res.locals.dessynta = dessy;
        res.render('profile-dessynta');
    });
});

