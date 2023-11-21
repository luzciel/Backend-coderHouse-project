const passwordRecovery = (req, res) => {
  const cookieUserData = req.cookies?.userData;

  if (cookieUserData) {
    return res.redirect('/products');
  }

  res.render('passwordRecovery');
}

module.exports = passwordRecovery;