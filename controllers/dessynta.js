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
    path: '/dessynta',
    router: router
};

router.get('/id/:file', (req, res) => {
    var paramFile = req.params.file;
    model.dessynta.findOne({
        include: [model.users],
        where: {
            file_dessynta: paramFile
        }
    }).then((dss) => {
        var file = JSON.parse(fs.readFileSync('public/dessynta/' + dss.file_dessynta, 'utf8'));
        dss.datetime = datetime.fromNow(dss.createdAt);
        dss.file = file;
        var ocw = [];
        var vkp = [];
        for (var a = 0; a < dss.file.dessy.kriteria.length; a++) {
            var vp = [];
            for (var b = 0; b < dss.file.vektorPrioritas[a].length; b++) {
                vp.push((dss.file.vektorPrioritas[a][b].value).toFixed(2));
            }
            ocw.push({
                kriteria: dss.file.dessy.kriteria[a].nama,
                bobot: dss.file.dessy.kriteria[a].bobot,
                vp: vp
            });
        };
        for (var x = 0; x < dss.file.dessy.kriteria.length; x++) {
            var v1 = [];
            for (var a = 0; a < dss.file.alternatif.length; a++) {
                v1.push({
                    alternatif: dss.file.alternatif[a].nama,
                    vp: (dss.file.vektorPrioritas[x][a].value).toFixed(2)
                });
            };
            vkp.push({
                kriteria: dss.file.dessy.kriteria[x].nama,
                value: v1 
            });
        }
        var cw = [];
        for (var a = 0; a < dss.file.alternatif.length; a++) {
            var cowe = 0;
            for (var b = 0; b < dss.file.vektorPrioritas.length; b++) {
                for (var c = 0; c < dss.file.alternatif.length; c++) {
                    if(a == c) {
                        cowe += parseFloat(ocw[b].bobot) * parseFloat(ocw[b].vp[c]);
                    }
                }
            }
            cw.push(cowe.toFixed(4));
        };
        res.locals.vkp = vkp;
        res.locals.ocw = ocw;
        res.locals.cw = cw;
        res.locals.dss = dss;
        res.locals.js = "dessynta";
        res.render('dessynta');
    });
});