const cookie = require("cookie");

const logout = (req, res) => {
  deleteCookie(res);
  res.redirect("/");
}
const deleteCookie = (res) =>  {
  const cookieToken = "coderCookieToken";
  const cookieUserData = "userData";
  const pastDate = new Date(0);
  const cookieOptions = {
    expires: pastDate,
    path: '/',
  };

  const cookieToDelete = [
    cookie.serialize(cookieToken, '', cookieOptions),
    cookie.serialize(cookieUserData, '', cookieOptions),
  ]
  res.setHeader('Set-Cookie', cookieToDelete);
}

module.exports = logout