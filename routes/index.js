const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
  // #swagger.tags = ['Hello World']
  res.send('Hello World');
});

router.use('/customers', require('./customers'));
router.use('/students', require('./students'));
// router.use('/api-docs', require('./swagger'));

module.exports = router;
