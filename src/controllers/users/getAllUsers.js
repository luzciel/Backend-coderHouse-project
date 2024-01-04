const { userServices } = require("../../repositories/index.js");
const handleError = require("../../util/handleError.js");
const User = require("../../dao/DTOs/user.dto.js");

const getAllUsers = async (req, res) => {
  try {
    const users = await userServices.getAllUsers();

    const mainUserData = users.map((user) => {
      return new User(user);
    });

    res.status(200).send({ status: "success", payload: mainUserData });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = getAllUsers;