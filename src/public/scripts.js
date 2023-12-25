const addToCart = async (productId) => {
  try {
    const responseCart = await fetch("/api/carts/", {
      method: "POST",
    });

    if (!responseCart.ok) {
      throw new Error("Error al obtener el ID del carrito");
    }

    const dataCart = await responseCart.json();
    const cartId = dataCart.payload._id;

    const responseAddToCart = await fetch(
      `/api/carts/${cartId}/product/${productId}`,
      {
        method: "POST",
      }
    );
    const dataAddToCart = await responseAddToCart.json();

    if(dataAddToCart.payload === "forbidden") {
      alert("No estas autorizado para agregar este producto");
      throw new Error("Error al agregar el producto al carrito");
    }

    if (!responseAddToCart.ok) {
      throw new Error("Error al agregar el producto al carrito");
    }

    if (dataAddToCart.status === "success") {
      alert("Producto agregado al carrito");
    }
  } catch (error) {
    console.error(error);
  }
};

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

const buyCart = async (idCart) => {
  try {
    const responseCart = await fetch(`/api/carts/${idCart}/purchase`, {
      method: "POST",
    });

    if (!responseCart.ok) {
      throw new Error("Error al generar la compra");
    }

    alert("Compra realizada con exito");

    }catch (error) {
      console.error(error);
  }
}

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

//Deuda tecnica: armar un endpoint para cargar los docs con id de usuario 
// const documents = async (idUser) => {
//   try {
//     const responseCart = await fetch(`/api/sessions/${idUser}/documents`, {
//       method: "POST",
//     });

//     if (!responseCart.ok) {
//       throw new Error("Error al cargar los documentos");
//     }

//     alert("Docuemntos cargados con exito");

//     }catch (error) {
//       console.error(error);
//   }
// }

module.exports = { addToCart, login, register, buyCart, passwordRecovery, restorePassword, documents};
