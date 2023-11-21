const passwordRecoveryLinkExpired = (req, res) => {
  const cookieUserData = req.cookies?.userData;

  if (cookieUserData) {
    return res.redirect('/products');
  }

  res.render('passwordRecoveryLinkExpired');
}

module.exports = passwordRecoveryLinkExpired;