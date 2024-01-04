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

module.exports = { addToCart, buyCart};