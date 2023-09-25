const passport = require("passport");
const local = require("passport-local");
const githubStrategy = require("passport-github2");
const { userModel } = require("../models/user.modelo.js");
const { createHash, isValidatePassword } = require("../util/hashPassword.js");

const localStrategy = local.Strategy;
const inicializePassport = () => {
  passport.use(
    "register",
    new localStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, age, email } = req.body;
        if (!first_name || !last_name || !email || !age || !password) {
          return done(null, false);
        }
        try {
          let user = await userModel.findOne({ email: username });
          if (user) {
            return done(null, false);
          }
          let role = "usuario";
          const hashedPassword = createHash(password);

          if (email === "adminCoder@coder.com" && password === "adminCod3r123") role = "administrador";

          const newUser = {
            first_name,
            last_name,
            age,
            email,
            password: hashedPassword,
            role,
          };
          let userCreated = await userModel.create(newUser);
          return done(null, userCreated);
        } catch (error) {
          return done("Error al obtener el ususario:" + error);
        }
      }
    )
  );

  passport.use(
    "login",
    new localStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          let user = await userModel.findOne({ email: username });
          if (!user) {
            console.error("Usuario no encontrado");
            return done(null, false);
          }
          if (!isValidatePassword(user, password)) {
            console.error("Contraseña incorrecta");
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

    passport.use("github", new githubStrategy({
        clientID: "Iv1.bad75f508c4d8757",
        clientSecret: "32d85773ded13d733dbd514d121b1a41d5ae17de",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"

    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userModel.findOne({ email: profile._json.email })
            if (!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: "",
                    age: "",
                    email: profile._json.email,
                    password: "",
                    role: "usuario"
                }
                let result = await userModel.create(newUser)
                done(null, result)
            }
            else {
                done(null, user)
            }
        } catch (error) {
            return done(error)
        }
    }
    ))
};

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  let user = userModel.findById(id);
  done(null, user);
});

module.exports = {
  inicializePassport,
};
