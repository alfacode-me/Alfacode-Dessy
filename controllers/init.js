var router = require('express').Router();

module.exports = {
    path: '/init',
    router: router
};

router.get('/', (req, res) => {
    res.render('init');
});