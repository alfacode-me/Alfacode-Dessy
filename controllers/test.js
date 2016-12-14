var router = require('express').Router();

module.exports = {
    path: '/test',
    router: router
};

router.get('/', (req, res) => {
    res.render('test');
});