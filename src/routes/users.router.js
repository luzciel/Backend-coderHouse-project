const {Router}= require('express');
const {userModel} = require('../models/user.modelo');
const router = Router();

router.get("/", async(req, res) => {
  try{
    const users = await userModel.find();
    res.json({result: "success", payload: users});
  }catch(error){
    res.status(500).send([{ error: "Ocurrio un error"}]);
  }
})

router.post("/", async(req, res) => {
  let {nombre, email} = req.body;
  if(!nombre || !email){
    res.send({status: "error", error: "Faltan parametros"});
    return;
  }
  try{
    const user = await userModel.create(req.body);
    res.send({result: "success", payload: user});

  }catch(error){
   res.status(500).send([{ error: "Ocurrio un error"}]);
  }
})

router.put("/:id", async(req, res) => {
  let {id} = req.params;
  const userToReplace = req.body;

  if(!userToReplace.nombre || !userToReplace.email || !id){
    res.send({status: "error", error: "Debe proporcionar todos los campos (id, nombre, email)."});
    return;
  } else if (!isValidObjectId(id)) {
    res.status(400).send({ result: "error", error: "ID no válido" });
    return;
  }

  try{
    const updateUser = await userModel.updateOne({_id: id}, userToReplace);

    if (updateUser.matchedCount === 0) {
      res
        .status(404)
        .send([
          {
            result: "error",
            error: "No se encontro el producto con el id:" + id
          },
        ]);
    } else {
      res.send({result: "success", payload: updateUser});
    }
    
  }catch
  (error){
   res.status(500).send([{ error: "Ocurrio un error"}]);
  }
})


router.delete("/:id", async(req, res) => {
  let {id} = req.params;

 if (!isValidObjectId(id)) {
    res.status(400).send({ result: "error", error: "debe proporcionar un id valido" });
    return
  }

  try{
    let deleteUser = await userModel.deleteOne({_id: id});

    if(deleteUser.deletedCount === 0){
      res
        .status(404)
        .send([
          {
            result: "error",
            error: "No se encontro el producto con el id:" + id
          },
        ]);
    } else{
          res.send({result: "success", payload: deleteUser});
    }

  }catch(error){
   res.status(500).send([{ error: "Ocurrio un error"}]);
  }
})

function isValidObjectId(id) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

module.exports = router