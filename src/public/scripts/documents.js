//Deuda tecnica: armar un endpoint para cargar los docs con id de usuario 
const documents = async (idUser) => {
  try {
    const responseCart = await fetch(`/api/sessions/${idUser}/documents`, {
      method: "POST",
    });

    if (!responseCart.ok) {
      throw new Error("Error al cargar los documentos");
    }

    alert("Docuemntos cargados con exito");

    }catch (error) {
      console.error(error);
  }
}

module.exports = {documents}