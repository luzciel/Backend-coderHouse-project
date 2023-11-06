const { faker } = require('@faker-js/faker');

const generateMockingProducts = (count) => {
  let products = [];

  for (let i = 0; i < count; i++) {
    products.push({
      _id: faker.database.mongodbObjectId(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      code: faker.number.int({min: 1, max: 10000}),
      price: parseInt(faker.commerce.price()),
      status: faker.datatype.boolean(),
      stock:  parseInt(faker.string.numeric(1)),
      category: faker.commerce.department(),
      thumbnails: []
    });
  }

  const payload = {
    docs: products
  }

  return payload;  
}

module.exports = {
  generateMockingProducts
}