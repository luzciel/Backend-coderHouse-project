const register = (req, res) => {
  const cookieUserData = req.cookies?.userData;

  if (cookieUserData) {
    return res.redirect('/products');
  }
  
  res.render('register');
}


module.exports = register;