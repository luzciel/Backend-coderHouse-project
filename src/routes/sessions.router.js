const express = require("express");
const router = express.Router();
const { userModel } = require("../models/user.modelo.js");
const { createHash, isValidatePassword } = require("../util/hashPassword");
const handleError = require("../util/handleError.js");

router.post("/register", async (req, res) => {
  //registro de usuario
  try {
    let { first_name, last_name, email, age, password } = req.body;
    if (!first_name || !last_name || !email || !age || !password) {
      return res.status(400).send({ status: "error", error: "Faltan datos." });
    }
    let role = "usuario";
    if (email === "adminCoder@coder.com" && password === "adminCod3r123")
      role = "administrador";
    const hashedPassword = createHash(password);
    let user = await userModel.create({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword,
      role,
    });
    res.send({ status: "success", payload: "Usuario registrado con éxito" });
  } catch (error) {
    handleError(res, error);
  }
});

router.post("/login", async (req, res) => {
  //login de usuario
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .send({ status: "error", error: "valores incorrectos" });

    const user = await userModel.findOne(
      { email: email },
      { email: 1, first_name: 1, last_name: 1, password: 1, role: 1 }
    );

    if (!user)
      return res
        .status(400)
        .send({ status: "error", error: "usuario no encontrado" });
    if (!isValidatePassword(user, password))
      return res
        .status(403)
        .send({ status: "error", error: "Password incorrecto" });
    const userData = { ...user._doc };
    delete userData.password;
    req.session.user = userData;
    res.send({ status: "success", payload: userData });
  } catch (error) {
    handleError(res, error);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
