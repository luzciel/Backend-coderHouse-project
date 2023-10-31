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

    if (!responseAddToCart.ok) {
      throw new Error("Error al agregar el producto al carrito");
    }

    const dataAddToCart = await responseAddToCart.json();
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

module.exports = { addToCart, login, register, buyCart };
