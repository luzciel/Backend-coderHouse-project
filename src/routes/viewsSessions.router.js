const express = require('express');
const passport = require("passport");
const register = require('../controllers/viewsSessions/register');
const login = require('../controllers/viewsSessions/login');
const perfile = require('../controllers/viewsSessions/perfile');
const error = require('../controllers/viewsSessions/error');
const authenticateJWT = passport.authenticate("jwt", { session: false })
const router = express.Router();

router.get('/register', register);

router.get('/', login)

router.get('/profile', authenticateJWT, perfile);

router.get("/error", error);

module.exports = router;