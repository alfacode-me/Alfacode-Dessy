var router = require('express').Router();

module.exports = {
    path: '/dashboard',
    router: router
};

router.get('/', (req, res) => {
    res.locals.dashboard = true;
    res.render('dessy');
});