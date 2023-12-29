const { userServices } = require("../../repositories/index.js");

const documents = async (req, res) => { 
  const files = req.files;
  const idUser = req.params.uid;

  // Verificar si hay archivos
  if (!files || Object.keys(files).length === 0) {
    return res.status(400).send({ status: "error", error: "No se ha subido ningun archivo" });
  }

  // Verificar si hay algún error en la subida de archivos
  if (files.some(file => file.hasOwnProperty('error'))) {
    return res.status(500).send({ status: "error", error: "Error al subir archivos" });
  }

  const dateFiles = files.map(file => {
    return {
      name: file.originalname,
      reference: file.path
    }
  })
  
  try {
    await userServices.updateDocuments(idUser, dateFiles);
    res.status(200).send({ status: "success", payload: "Documentos cargados con éxito" });

  } catch (error) {
    return res.status(500).send({ status: "error", error: "Error al subir archivos" });
  }

}
module.exports = documents;