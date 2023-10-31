const githubcallback = (req, res) => {
  req.session.user = req.user;
  res.redirect("/products");
}

module.exports = githubcallback