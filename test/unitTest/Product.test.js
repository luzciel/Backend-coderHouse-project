const chai = require('chai');
const DB = require('mongoose');
const Product = require('../../src/dao/classes/product');
const config = require('../../src/config/config');

const MONGO_URL = config.MONGO_URL_TESTING;
const expect  = chai.expect;

DB.connect(MONGO_URL);

let productDao;

describe('Testing product Dao', function () {
  this.timeout(5000)

  before(function () {
    productDao = new Product()
  })
  beforeEach( function(){
    DB.connection.collections.products.drop()
  })

  it('should create a product', async function () {
    const mockProduct= {
        title: 'test_title_create',
        description: 'test_description',
        code: 6543,
        price: 1000,
        status: true,
        stock: 5,
        category: 'test_category',
        owner: 'test_owner',
        thumbnails: ['test']
    }

    const products = await productDao.createProduct(mockProduct)

    expect(products).to.be.an('object')
    expect(products.title).to.deep.equal("test_title_create")
    expect(products.code).to.deep.equal(6543)
    expect(products.price).to.deep.equal(1000)
    expect(products.status).to.deep.equal(true)
    expect(products.stock).to.deep.equal(5)
    expect(products.category).to.deep.equal("test_category")
    expect(products.owner).to.deep.equal("test_owner")
  })


  it('should get products', async function () {
    const mockProduct= {
      title: 'test_title',
      description: 'test_description',
      code: 123,
      price: 1000,
      status: true,
      stock: 5,
      category: 'test_category',
      owner: 'test_owner',
      thumbnails: ['test']
  }
    const query = {}
    const options = {
      limit: 5,
      page: 1
    }

    await productDao.createProduct(mockProduct)
    const products = await productDao.getAllProduct(query, options)

    expect(products).to.be.an('object')
    expect(Array.isArray(products.docs)).to.be.equals(true);
    expect(products.docs[0].title).to.equal("test_title")
    expect(products.page).to.equal(1)
    expect(products.limit).to.equal(5)
  })
})
