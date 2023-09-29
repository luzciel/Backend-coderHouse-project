const express = require("express");
const router = express.Router();
const cookie = require("cookie");
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/api/sessions/failregister",
  }),
  async (req, res) => {
    res.send({ status: "success", payload: "Usuario registrado con éxito" });
  }
);

router.get("/failregister", (req, res) => {
  res.status(400).send({ status: "error", error: "Ocurrio un error" });
});

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/faillogin",
  }),
  async (req, res) => {
    const email = req.user.email;
    const password = req.user.password;

    let token = jwt.sign({ email, password }, "coderSecret", {
      expiresIn: "24h",
    });
    const userData = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email,
      role: req.user.role
    }

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
);

router.get("/faillogin", (req, res) => {
  res.status(400).send({ status: "error", error: "Ocurrio un error" });
});

router.get("/logout", (req, res) => {
  deleteCookie(res);
  res.redirect("/");
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/error" }),
  async (req, res) => {
    req.session.user = req.user;
    res.redirect("/products");
  }
);

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);

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

module.exports = router;
