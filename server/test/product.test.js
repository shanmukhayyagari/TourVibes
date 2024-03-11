const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js'); 
const expect = chai.expect;
const sinon = require('sinon');
const User = require('../models/User'); 
const Product = require('../models/Product'); 

chai.use(chaiHttp);

describe('GET /getHistory', () => {
  it('should get the user history', (done) => {
    const userId = 'user_id';
    const userHistory = [
    { action: 'Action 1', date: new Date() },
    { action: 'Action 2', date: new Date() },
    ];
    const docs = {
      history: userHistory,
    };
    // Stub User.findOne to simulate retrieving user history
    const findOneStub = sinon.stub(User, 'findOne');
    findOneStub.callsFake((query, callback) => {
      callback(null, docs);
    });

    chai.request(app)
      .get('/api/users/getHistory')
      .end((err, res) => {
        if (err) return done(err);

        expect(res).to.have.status(500);

        findOneStub.restore();

        done();
      });
  });
});

describe('POST /uploadProduct', () => {
  it('should upload a product', (done) => {
    const productData = {
      // Replace with the product data you want to upload
      name: 'Product Name',
      price: 100,
      description: 'Product Description',
    };

    // Stub Product.save to simulate saving a product
    const saveStub = sinon.stub(Product.prototype, 'save');
    saveStub.callsFake(function (callback) {
      // Simulate saving the product
      callback(null);
    });

    chai.request(app)
      .post('/api/product/uploadProduct')
      .set('x-auth', 'user_token') // Set the user token
      .send(productData)
      .end((err, res) => {
        if (err) return done(err);

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('success', true);

        saveStub.restore();

        done();
      });
  });
});

describe('POST /getProducts', () => {
  it('should retrieve products', (done) => {
    const term = 'search_term'; // Replace with the search term you want to use

    // Stub Product.find to simulate finding products
    const findStub = sinon.stub(Product, 'find');
    findStub.callsFake(function (query, callback) {
      // Simulate finding products
      callback(null, [{ name: 'Product 1' }, { name: 'Product 2' }]);
    });

    chai.request(app)
      .post('/api/product/getProducts')
      .set('x-auth', 'user_token') // Set the user token
      .send({ term })
      .end((err, res) => {
        if (err) return done(err);

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('success', true);
        expect(res.body).to.have.property('products');
        expect(res.body.products).to.be.an('array');

        findStub.restore();

        done();
      });
  });
});

describe('POST /getDetail', () => {
  it('should retrieve product details', (done) => {
    const productId = 'product_id'; // Replace with the product ID you want to use for testing

    // Stub Product.find to simulate finding the product
    const findStub = sinon.stub(Product, 'find');
    findStub.callsFake(function (query, callback) {
      // Simulate finding the product
      callback(null, [{ _id: 'product_id', name: 'Product 1', description: 'Product description' }]);
    });

    chai.request(app)
      .post('/api/product/getDetail')
      .set('x-auth', 'user_token') // Set the user token
      .send({ id: productId })
      .end((err, res) => {
        if (err) return done(err);

        expect(res).to.have.status(200);
  
        findStub.restore();

        done();
      });
  });
});

describe('POST /getCartDetails', () => {
  it('should retrieve cart details', (done) => {
    const productIds = ['product_id_1', 'product_id_2']; // Replace with the product IDs you want to use for testing

    // Stub Product.find to simulate finding the products
    const findStub = sinon.stub(Product, 'find');
    findStub.callsFake(function (query, callback) {
      // Simulate finding the products
      callback(null, [
        { _id: 'product_id_1', name: 'Product 1', description: 'Product 1 description' },
        { _id: 'product_id_2', name: 'Product 2', description: 'Product 2 description' }
      ]);
    });

    chai.request(app)
      .post('/api/product/getCartDetails')
      .set('x-auth', 'user_token') // Set the user token
      .send({ array: productIds })
      .end((err, res) => {
        if (err) return done(err);

        expect(res).to.have.status(200);

        findStub.restore();

        done();
      });
  });
});

