var router = require('express').Router();

// api router will mount other routers
// for all our resources

router.use('/habit', require('./habit/habitRoutes'));

module.exports = router;
