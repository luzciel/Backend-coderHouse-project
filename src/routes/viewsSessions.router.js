const express = require('express');
const router = express.Router();
const passport = require("passport");

const authenticateJWT = passport.authenticate("jwt", { session: false })

router.get('/register', (req, res) => {
  const cookieUserData = req.cookies?.userData;
  if (cookieUserData) {
    return res.redirect('/products');
  }
  res.render('register');
})

router.get('/', (req, res) => {
  const cookieUserData = req.cookies?.userData;
  if (cookieUserData) {
    return res.redirect('/products');
  }
  res.render('login');
})

router.get('/profile', authenticateJWT, (req, res) => {
  const cookieUserData = req.cookies?.userData;
  const userData = JSON.parse(cookieUserData);
  const { first_name, last_name, email, role } = userData;
  
  res.render('profile', { first_name, last_name, email, role });
});

router.get("/error", (req, res) => {
  res.render("error")
})

module.exports = router;