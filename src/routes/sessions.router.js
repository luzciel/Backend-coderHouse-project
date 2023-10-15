const express = require("express");
const router = express.Router();
const passport = require("passport");
const usersController = require("../controllers/users.Controllert.js");

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/api/sessions/failregister",
  }), usersController.register);

router.get("/failregister", usersController.failRegister);

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/faillogin",
  }), usersController.login
);

router.get("/faillogin", usersController.failLogin);

router.get("/logout", usersController.logout);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/error" }), usersController.githubcallback
);

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }), usersController.current
);


module.exports = router;
