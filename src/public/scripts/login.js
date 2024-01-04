const login = async () => {
  const inputEmail = document.querySelector("#email");
  let inputEmailValue = inputEmail.value;
  const inputPassword = document.querySelector("#password");
  let inputPasswordValue = inputPassword.value;
  try{
  const responseLogin = await fetch("/api/sessions/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: inputEmailValue,
      password: inputPasswordValue,
    }),
  });
  const dataLogin = await responseLogin.json();
  if (dataLogin.error === "usuario no encontrado") {
    const divUserNotFound = document.querySelector(".error");
    const pElement = document.createElement("p");
    const textNode = document.createTextNode("Usuario no registrado");
    pElement.appendChild(textNode);
    pElement.style.color = "red";
    divUserNotFound.appendChild(pElement);
    inputEmailValue = "";
    inputPasswordValue = "";
    return;
  }

  if (dataLogin.error === "Password incorrecto") {
    const divPasswordIncorrect = document.querySelector(".error");
    const pElement = document.createElement("p");
    const textNode = document.createTextNode(
      "Usuario o contraseña incorrectos"
    );

    pElement.appendChild(textNode);
    pElement.style.color = "red";
    divPasswordIncorrect.appendChild(pElement);
    inputEmailValue = "";
    inputPasswordValue = "";
    return;
  }

  if (dataLogin.status === "success") {
    window.location.href = "/products";
  }
} catch (error) { 
  console.error(error);
  window.location.href = "/error"
}
};

module.exports = { login };