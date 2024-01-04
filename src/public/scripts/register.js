const register = async () => {
  const firstName = document.querySelector("#first_name").value;
  const lastName = document.querySelector("#last_name").value;
  const age = document.querySelector("#age").value;
  const inputEmail = document.querySelector("#email_register").value;
  const inputPassword = document.querySelector("#password_register").value;
  const dataBody = {
    first_name: firstName,
    last_name: lastName,
    age: age,
    email: inputEmail,
    password: inputPassword,
  }
  const responseLogin = await fetch("/api/sessions/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataBody),
  });
  const dataSession = await responseLogin.json();

  if (dataSession.status === "success") {
    alert("Usuario registrado con éxito");
    return window.location.href = "/";
  }
  alert("Error al registrar usuario, por favor vuelve a intentarlo");
};

module.exports = { register };