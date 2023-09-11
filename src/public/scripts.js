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

module.exports = addToCart;
