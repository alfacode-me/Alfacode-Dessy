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
    path: '/search',
    router: router
};

router.get('/dessy', (req, res) => {
    res.locals.profile = true;
    res.locals.js = "profile";
    if (req.param("cari")) {
        model.dessy.findAll({
            include: [model.users],
            where: ["nama_dessy like ?", "%" + req.param("cari") + "%"],
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
            res.locals.cari = req.param("cari");
            res.locals.dessy = dessy;
            res.render('search-dessy');
        });
    } else {
        res.locals.dessy = [];
        res.render('search-dessy');
    }
});