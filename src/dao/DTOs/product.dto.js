class ProductDTO {
  constructor(product) {
      this.title = product.title
      this.description = product.description
      this.price  = product.price
      this.code  = product.code
      this.stock  = product.stock
      this.category  = product.category
      this.owner  = product.owner ? product.owner : "administrador"
      this.thumbnail  = product.thumbnail
  }
}

module.exports = ProductDTO