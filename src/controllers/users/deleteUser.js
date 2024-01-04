const { userServices } = require("../../repositories/index.js");
const handleError = require("../../util/handleError.js");

const deleteUser = async (req, res) => {
  const { email } = req.params;

  try {
    const deletedUser = await userServices.deleteUsers(email);
   
    if(deletedUser.deletedCount === 0){
      res.status(404).send({ status: "error", error: `No se ha encontrado el usuario ${email}` });
      return;
    }

    res.status(200).send({ status: "success", payload: `Se elimino el usuario ${email}` });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = deleteUser