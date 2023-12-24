const cookie = require("cookie");
const { userServices } = require("../../repositories/index.js");

const logout = async (req, res) => {
  const userDataCookie = req.cookies.userData;
  const userData = JSON.parse(userDataCookie);
  const { email } = userData;
  const currentDate = new Date();
  
  await userServices.updateLastConnection(email, currentDate);

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