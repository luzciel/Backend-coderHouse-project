const express = require("express");
const passport = require("passport");
const uploader = require("../middlewares/multer");
const register = require("../controllers/users/register");
const login = require("../controllers/users/login");
const failLogin = require("../controllers/users/failLogin");
const failRegister = require("../controllers/users/failRegister");
const logout = require("../controllers/users/logout");
const githubcallback = require("../controllers/users/githubcallback");
const current = require("../controllers/users/current");
const updateRole = require("../controllers/users/updateRole");
const passwordRecovery = require("../controllers/users/passwordRecovery");
const restorePassword = require("../controllers/users/restorePassword");
const getAllUsers = require("../controllers/users/getAllUsers");
const documents = require("../controllers/users/documents");
const deleteInactiveUsers = require("../controllers/users/deleteInactiveUsers");
const deleteUser = require("../controllers/users/deleteUser");

const router = express.Router();

router.get("/", getAllUsers );

router.post( "/register", passport.authenticate("register", { failureRedirect: "/api/sessions/failregister"}), register);

router.get("/failregister", failRegister);

router.post( "/login", passport.authenticate("login", { failureRedirect: "/api/sessions/faillogin"}), login );

router.get("/faillogin", failLogin);

router.get("/logout", logout);

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get( "/githubcallback", passport.authenticate("github", { failureRedirect: "/error" }),githubcallback
);

router.get( "/current", passport.authenticate("jwt", { session: false }), current );

router.patch("/premium/:uid", passport.authenticate("jwt", { session: false }), updateRole );

router.post("/passwordrecovery", passwordRecovery);

router.patch("/restore/:token", restorePassword);

router.post("/:uid/documents/", uploader.array('documents'), documents);

router.delete("/", deleteInactiveUsers)

router.delete("/:email", deleteUser)

module.exports = router;
