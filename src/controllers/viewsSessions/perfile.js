const perfile = (req, res) => {
  const cookieUserData = req.cookies?.userData;
  const userData = JSON.parse(cookieUserData);
  const { first_name, last_name, email, role } = userData;
  
  res.render('profile', { first_name, last_name, email, role });
}

module.exports = perfile;