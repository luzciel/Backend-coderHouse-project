const config = require("../../config/config.js");

const URL = config.URL;

const users = async (req, res) => {
  let isValid = true;
    
    try {
      const response = await fetch(`${URL}/api/sessions`);
      const data = await response.json();

      
      if (data.status !== "success") {
        isValid = false;
        return res.render("users", { isValid });
      }

      res.render("users", {
        users: data,
        isValid
      });
  } catch (error) {
      req.logger.error(error);
  }
}

module.exports = users;