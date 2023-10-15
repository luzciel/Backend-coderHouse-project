const {Router} = require('express');
const router = Router();
const reviwesController = require('../controllers/viewsCartsControllert.js');

router.get('/:cid?', reviwesController.getCart)


module.exports = router;