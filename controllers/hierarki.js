var router = require('express').Router();

module.exports = {
    path: '/hierarki',
    router: router
};

router.get('/', (req, res) => {
    res.render('hierarki');
});