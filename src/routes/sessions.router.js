const express = require("express");
const router = express.Router();
const passport = require("passport");
const handleError = require("../util/handleError.js");


router.post("/register", passport.authenticate("register", { failureRedirect: "/api/sessions/failregister" }), async (req, res) => {
    res.send({ status: "success", payload: "Usuario registrado con éxito" });
});

router.get("/failregister", (req, res) => {
  res.status(400).send({ status: "error", error: "Ocurrio un error" });
})

router.post("/login", passport.authenticate("login", { failureRedirect: "/api/sessions/faillogin" }), async (req, res) => {

    const userData = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
      role: req.user.role
    }
    req.session.user = userData
    res.send({ status: "success", payload: userData });
});

router.get("/faillogin", (req, res) => {
  res.status(400).send({ status: "error", error: "Ocurrio un error" });
})

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

router.get("/github", passport.authenticate("github",{scope: ["user:email"]}), async (req, res) => {})

router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/error"
}), async (req, res) => {
  req.session.user = req.user
  res.redirect("/products");
})

module.exports = router;
