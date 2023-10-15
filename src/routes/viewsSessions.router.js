const express = require('express');
const router = express.Router();
const passport = require("passport");
const viewsSessionsController = require ('../controllers/viewsSessionsControllert.js');
const authenticateJWT = passport.authenticate("jwt", { session: false })

router.get('/register', viewsSessionsController.register);

router.get('/', viewsSessionsController.login)

router.get('/profile', authenticateJWT, viewsSessionsController.perfile);

router.get("/error", viewsSessionsController.error);

module.exports = router;