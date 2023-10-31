const login = (req, res) => {
  const cookieUserData = req.cookies?.userData;

  if (cookieUserData) {
    return res.redirect('/products');
  }

  res.render('login');
}

module.exports = login;