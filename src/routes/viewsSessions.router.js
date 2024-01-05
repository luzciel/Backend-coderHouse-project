const express = require('express');
const passport = require("passport");
const register = require('../controllers/viewsSessions/register');
const login = require('../controllers/viewsSessions/login');
const perfile = require('../controllers/viewsSessions/perfile');
const error = require('../controllers/viewsSessions/error');
const passwordRecovery = require('../controllers/viewsSessions/passwordRecovery');
const restorePassword = require('../controllers/viewsSessions/restorePassword');
const passwordRecoveryLinkExpired = require('../controllers/viewsSessions/passwordRecoveryLinkExpired');
const documents = require('../controllers/viewsSessions/documents');
const users = require('../controllers/viewsSessions/users');
const {authorization} = require("../middlewares/middlewares");

const authenticateJWT = passport.authenticate("jwt", { session: false })
const router = express.Router();

router.get('/register', register);

router.get('/', login)

router.get('/profile', authenticateJWT, perfile);

router.get('/users', authenticateJWT, authorization("administrador"), users);

router.get("/error", error);

router.get("/passwordrecovery", passwordRecovery);

router.get("/password-recovery-link-expired", passwordRecoveryLinkExpired);

router.get("/restore/:token", restorePassword);

router.get("/documents", documents);

module.exports = router;