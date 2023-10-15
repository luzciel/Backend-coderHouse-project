const register = (req, res) => {
  const cookieUserData = req.cookies?.userData;
  if (cookieUserData) {
    return res.redirect('/products');
  }
  res.render('register');
}

const login = (req, res) => {
  const cookieUserData = req.cookies?.userData;
  if (cookieUserData) {
    return res.redirect('/products');
  }
  res.render('login');
}

const perfile = (req, res) => {
  const cookieUserData = req.cookies?.userData;
  const userData = JSON.parse(cookieUserData);
  const { first_name, last_name, email, role } = userData;
  
  res.render('profile', { first_name, last_name, email, role });
}

const error = (req, res) => {
  res.render('error');
}

module.exports = {
  register,
  login,
  perfile,
  error
}