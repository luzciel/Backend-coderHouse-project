const passwordRecovery = async () => {
  const inputEmail = document.querySelector("#email");
  let inputEmailValue = inputEmail.value;
  try {
    const responseRecovery = await fetch("/api/sessions/passwordrecovery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: inputEmailValue,
      }),
    });
    const dataRecovery = await responseRecovery.json();

    if (dataRecovery.payload === "Usuario no encontrado") {
      const divUserNotFound = document.querySelector(".error");
      const pElement = document.createElement("p");
      const textNode = document.createTextNode("Usuario no registrado");
      pElement.appendChild(textNode);
      pElement.style.color = "red";
      divUserNotFound.appendChild(pElement);
      inputEmailValue = "";
      return;
    }

    if (dataRecovery.status === "success") {
      alert("Se ha enviado un correo para restablecer la contraseña");
    }
   
  } catch (error) {
    console.error(error);
  }
}

module.exports = { passwordRecovery }