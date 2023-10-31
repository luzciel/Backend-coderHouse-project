const { productService } = require("../../repositories/index.js");
const handleError = require("../../util/handleError.js");

const getAllProducts = async (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : 5;
  const page = req.query.page ? Number(req.query.page) : 1;
  let query = req.query.query ? req.query.query : {};
  query = typeof query === "object" ? query : JSON.parse(query);
  const sort = req.query.sort;
  const queryConveroted = encodeURIComponent(JSON.stringify(query));
  const link = `/api/products?limit=${limit}&query=${queryConveroted}&sort=${sort}`;

  const options = {
    limit: limit,
    page: page,
  };

  if (sort === "asc" || sort === "desc") {
    const price = sort === "asc" ? 1 : -1;
    options.sort = { price: sort };
  }

  try {
    const allproducts = await productService.getAllProducts(query, options);

    let prevPage = allproducts.prevPage;
    const nextPage = allproducts.nextPage;
    const prePageLink = prevPage === null ? null : `${link}&page=${prevPage}`;
    const nextPageLink = nextPage === null ? null : `${link}&page=${nextPage}`;

    allproducts.prevPage = prePageLink;
    allproducts.nextPage = nextPageLink;

    res.status(200).send({ status: "success", payload: allproducts });

  } catch (error) {
    handleError(res, error);
  }
};

module.exports = getAllProducts