const {generateMockingProducts} = require('../../util/fakerMocking');

const getMockingProducts = (req, res) => {
  const countProduct = 50;
  const products = generateMockingProducts(countProduct);

  res.status(200).send({ status: "success", payload: products });
}

module.exports = getMockingProducts
