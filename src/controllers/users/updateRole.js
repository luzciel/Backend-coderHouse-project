const fs = require("fs");
const path = require("path");
const {userServices} = require("../../repositories/index.js");
const {isValidObjectId} = require("../../util/validObjectId.js");
const handleError = require("../../util/handleError.js");
const pathDir = path.join(__dirname, '../../public/uploads');

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

    fs.readdir(pathDir, async (err, files) => {
      if (err) {
        console.error(err);
        return;
      }

      const arrayFiles = files.filter(file => fs.statSync(`${pathDir}/${file}`).isFile());
      const fileLength = arrayFiles.length;

      if(fileLength >= 3 && role === "premium"){
        const user = await userServices.updateRole(id, role);
        res.status(200).send({ status: "success", payload:"Rol actualizado a premium" })

      } else if(fileLength < 3 && role === "premium"){
        res.status(403).send({ status: "error", payload: "El usuario no ha terminado de procesar su documentación" });
        
      } else if(role === "usuario"){
        const user = await userServices.updateRole(id, role);
        res.status(200).send({ status: "success", payload: "Rol actualizado a usuario" })
      }
    });

  }catch(error){
    handleError(res, error);
  }

};

module.exports = updateRole