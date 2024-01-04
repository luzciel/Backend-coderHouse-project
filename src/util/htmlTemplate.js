
class HtmlTemplate {
  constructor() {
  }

  static createTableDetailProduct = (availableProducts, totalTicket) => {
    let tableHTML = `
        <table style="margin: 0 auto;">
          <thead>
            <tr>
              <th style="text-align: initial;">Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
      `;
  
    availableProducts.forEach((product) => {
      tableHTML += `
            <tr>
              <td style="text-align: initial;">${product.product.title}</td>
              <td>${product.quantity}</td>
              <td>${product.product.price}</td>
            </tr>
        `;
    });
  
    tableHTML += `
          </tbody>
          <tfoot>
          <tr>
            <th></th>
            <th>Total</th>
            <th>${totalTicket}</th>
          </tr>
          </tfoot>
        </table>
      `;
  
    return tableHTML;
  }

  static createMessagePurchaseConfirmation = ({   availableProduct,
    createTicket,
    totalTicket,}) => {
      const { code } = createTicket;

      const detailsProduct = this.createTableDetailProduct(availableProduct, totalTicket);

      const message = `
      <div>
        <h1 style="text-align: center;">¡Gracias por tu compra!</h1>
        <p>Te adjuntamos el detalle de tu compra, recuerda que con el número de tu boleta podrás hacer seguimiento a tu despacho.
        <br style="margin: 5px">
        Este es tu número de boleta N° ${code}</p>
        <h2 style="text-align: center;">Información de tu orden de compra</h2>
        <div style="text-align: center;">
        ${detailsProduct}
        </div>
      </div>
    `;

      return message
  }

  static createMessageRestorePassword = ({ linkRestore }) => {
    const message = `
      <div>
        <p>Te adjuntamos el link para restablecer tu contraseña, este link caducara en 1 hora</p>
        <a href="${linkRestore}">Restablecer contraseña</a>
      </div>
    `;

    return message
  
  }

  static createMessageAccountDeletion = () => {
    const message = `
      <div>
        <p>Tu cuenta ha sido eliminada por inactividad</p>
      </div>
    `;

    return message
  }

  static createMessageProductDeletion = ({productName, code}) => {
    const message = `
      <div>
        <p>El producto ${productName} con el código ${code} ha sido eliminado</p>
      </div>
    `;

    return message
  }
}

module.exports = HtmlTemplate;