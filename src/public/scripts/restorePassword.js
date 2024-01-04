const restorePassword = async (token) => {
  const inputPassword = document.querySelector("#restorePassword");
  let inputPasswordValue = inputPassword.value;
  const divPasswordIncorrect = document.querySelector(".error");
  divPasswordIncorrect.innerHTML = "";
  try {
      const responseRestore = await fetch(`/api/sessions/restore/${token}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: inputPasswordValue,
        }),
      });

      const dataRestore = await responseRestore.json();
      
      if(dataRestore.payload === "Token expirado"){
        alert("El token ha expirado");
        return window.location.href = "/passwordrecovery"
      }

      if(dataRestore.payload === "Contraseña dublicada"){
        const pElement = document.createElement("p");
        const textNode = document.createTextNode("La nueva contraseña no puede ser igual a la contraseña anterior");
        pElement.appendChild(textNode);
        pElement.style.color = "red";
        divPasswordIncorrect.appendChild(pElement);
        inputPasswordValue = "";
        return
      }

      if (dataRestore.status === "success") {
        alert("Se ha restablecido la contraseña");
        window.location.href = "/"
        return
      }

      if(!dataRestore.ok){
        alert("Error al restablecer la contraseña");
        return
      }
  } catch (error) {
          console.error(error);
    }
};

module.exports = { restorePassword }