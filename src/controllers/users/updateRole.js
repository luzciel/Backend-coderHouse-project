const {userServices} = require("../../repositories/index.js");
const {isValidObjectId} = require("../../util/validObjectId.js");
const handleError = require("../../util/handleError.js");

const updateRole = async (req, res) => {
  const id = req.params.uid;
  const role = req.body.role;

  try{
    if(!id || !role){
      res.status(400).send({ status: "error", payload: "Faltan datos" });
      return;
    }

    if(!isValidObjectId(id)){
      res.status(400).send({ status: "error", payload: "ID no válido" });
      return;
      
    } else if(role !== "usuario" && role !== "premium") {
      res.status(400).send({ status: "error", payload: "Rol inválido" });
      return;
    }

    const user = await userServices.updateRole(id, role);

    res.status(200).send({ status: "success", payload: user });
  }catch(error){
    handleError(res, error);
  }

};

module.exports = updateRole