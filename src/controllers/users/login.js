
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const email = req.user.email;
  const password = req.user.password;

  const userData = {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    age: req.user.age,
    email,
    role: req.user.role
  }

  let token = jwt.sign({ email, password, role: userData.role }, "coderSecret", {
    expiresIn: "24h",
  });

  res
    .cookie("coderCookieToken", token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    })
    .cookie("userData", JSON.stringify(userData), {
      maxAge: 60 * 60 * 1000,
      httpOnly: false, 
    })
    .send({ status: "success", payload: "Usuario logueado con éxito" });
}

module.exports = login;