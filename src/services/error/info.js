const generateUserErrorInfo = ({ first_name, last_name, age, email }) => {
  return `One or more properties were incomplete or not valid.
    List of required properties:
    *first_name: needs to be a String, recieved: ${first_name},
    *last_name: needs to be a String, recieved: ${last_name},
    *email: needs to be a String, recieved: ${email},
    *age: needs to be a Number, recieved: ${age}
  `
}

const generateProductErrorInfo = (product) => {
  return `One or more properties were incomplete or not valid.
    List of required properties:
    *title: needs to be a String, recieved: ${product.title},
    *description: needs to be a String, recieved: ${product.description},
    *code: needs to be a Number, recieved: ${product.code},
    *price: needs to be a Number, recieved: ${product.price},
    *stock: needs to be a Number, recieved: ${product.stock},
    *category: needs to be a String, recieved: ${product.category}
  `
}


module.exports = {
  generateUserErrorInfo,
  generateProductErrorInfo
}