const {Router} = require('express');
const router = Router();
const getCart = require('../controllers/viewsCarts/getCart.js');

router.get('/:cid?', getCart)

module.exports = router;