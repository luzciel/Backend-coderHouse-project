const express = require('express');
const router = express.Router();

router.get('/register', (req, res) => {
  if (req.session.user) {
    return res.redirect('/products');
  }
  res.render('register');
})

router.get('/', (req, res) => {
  if (req.session.user) {
    return res.redirect('/products');
  }
  res.render('login');
})

router.get('/profile', (req, res) => {
  if (!req.session.user) {
      return res.redirect('/');
  }
  const { first_name, last_name, email, role } = req.session.user;
  
  res.render('profile', { first_name, last_name, email, role });
});

router.get("/error", (req, res) => {
  res.render("error")
})


module.exports = router;