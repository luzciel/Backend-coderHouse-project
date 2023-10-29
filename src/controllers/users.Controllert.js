const cookie = require("cookie");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    res.send({ status: "success", payload: "Usuario registrado con éxito" });
  } catch (error) {
    console.error(error);
  }
}

const failRegister = (req, res) => {
  res.status(400).send({ status: "error", error: "Ocurrio un error" });
}

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

const failLogin = async (req, res) => {
  res.status(400).send({ status: "error", error: "Ocurrio un error" });
}

const logout = (req, res) => {
  deleteCookie(res);
  res.redirect("/");
}

const githubcallback = (req, res) => {
  req.session.user = req.user;
  res.redirect("/products");
}

const current = async (req, res) => {
  res.send(req.user);
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

module.exports = {
  register,
  failRegister,
  login,
  failLogin,
  logout,
  githubcallback,
  current,
}