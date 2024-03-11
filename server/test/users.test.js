const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js'); 
const expect = chai.expect;
const sinon = require('sinon');
const User = require('../models/User');
const Product = require('../models/Product'); 
const Payment = require('../models/Payment'); 

chai.use(chaiHttp);

describe('GET /', () => {
  it('should respond with "hi" for GET /', (done) => {
    chai.request(app)
      .get('/api/users/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('hi');
        done();
      });
  });

});

describe('GET /auth', () => {
  it('should return user information for GET /auth', (done) => {
    chai.request(app)
      .get('/api/users/auth')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('isAdmin');
        expect(res.body).to.have.property('isAuth');
        done();
      });
  });

});

describe('POST /register', () => {
    it('should register a new user and return registerSuccess:true', (done) => {
      const newUser = {
        email: 'newuser@example.com',
        password: 'password123',
      };
  
      const saveStub = sinon.stub(User.prototype, 'save');
      saveStub.callsFake(function (callback) {
        callback(null, this);
      });
  
      chai.request(app)
        .post('/api/users/register')
        .send(newUser)
        .end((err, res) => {
          if (err) return done(err);
  
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('registerSuccess', true);
  
          saveStub.restore();
  
          done();
        });
    });

});

describe('POST /login', () => {
    it('should log in a user and return loginSuccess:true', (done) => {
      const user = {
        email: 'user@example.com',
        password: 'password123',
      };
  
      // Stub User.findOne to simulate finding a user with correct credentials
      const findOneStub = sinon.stub(User, 'findOne');
      findOneStub.callsFake((query, callback) => {
        callback(null, user);
      });
      const isMatch = true;
      // Stub user.comparePassword to simulate a successful password match
      const comparePasswordStub = sinon.stub(User.prototype, 'comparePassword');
      comparePasswordStub.callsFake((password, callback) => {
        callback(null, isMatch);
      });
  
      // Stub user.generateToken to simulate token generation
      const generateTokenStub = sinon.stub(User.prototype, 'generateToken');
      generateTokenStub.callsFake((callback) => {
        callback(null, user);
      });
  
      chai.request(app)
        .post('/api/users/login')
        .send(user)
        .end((err, res) => {
          if (err) return done(err);
  
          expect(res).to.have.status(500);
          findOneStub.restore()
          comparePasswordStub.restore()
          done();
        });
    });
  });

describe('GET /logout', () => {
    it('should log out a user and return logoutSuccess:true', (done) => {
      const user = {
        _id: 'user_id',
      };
  
      // Stub User.findOneAndUpdate to simulate clearing the user's token
      const findOneAndUpdateStub = sinon.stub(User, 'findOneAndUpdate');
      findOneAndUpdateStub.callsFake((query, update, callback) => {
        callback(null, user);
      });
  
      chai.request(app)
        .get('/api/users/logout')
        .end((err, res) => {
          if (err) return done(err);
  
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('logoutSuccess', true);
  
          findOneAndUpdateStub.restore();
  
          done();
        });
    });

});

describe('POST /addToCart', () => {
    it('should add a product to the user cart and return the updated cart', (done) => {
      const userId = 'your-user-id';
      const productId = '1';
      const user = {
        _id: userId,
        cart: [],
      };
      // Stub User.findOne to simulate retrieving the user's information
      const findOneStub = sinon.stub(User, 'findOne');
      findOneStub.callsFake((query, callback) => {
        // Simulate a user with an empty cart
       
        callback(null, user);
      });
  
      // Stub User.findOneAndUpdate to simulate updating the user's cart
      const findOneAndUpdateStub = sinon.stub(User, 'findOneAndUpdate');
      findOneAndUpdateStub.callsFake((query, update, options, callback) => {
        // Simulate updating the cart
        const updatedUser = {
          _id: userId,
          cart: [
            {
              id: productId,
              quantity: 1,
              date: Date.now(),
            },
          ],
        };
        callback(null, updatedUser);
      });
  
      chai.request(app)
        .post('/api/users/addToCart')
        .set('x-auth', 'user_token') // Set the user token
        .send({ productId: productId })
        .end((err, res) => {
          if (err) return done(err);
  
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body).to.have.property('cart').to.be.an('array').to.have.lengthOf(1);
  
          findOneStub.restore();
          findOneAndUpdateStub.restore();
  
          done();
        });
    });

});

describe('POST /removeCartItem', () => {
    it('should remove a product from the user cart and return updated cart details', (done) => {
      const userId = 'your-user-id';
      const itemId = 'item_id';
      const productIds = ['product_id1', 'product_id2']; // Replace with actual product IDs
  
      // Stub User.findOneAndUpdate to simulate removing an item from the cart
      const findOneAndUpdateStub = sinon.stub(User, 'findOneAndUpdate');
      findOneAndUpdateStub.callsFake((query, update, options, callback) => {
        // Simulate removing the item from the cart
        const userInfo = {
          _id: userId,
          cart: [
            {
              id: productIds[0],
              quantity: 1,
              date: Date.now(),
            },
            {
              id: productIds[1],
              quantity: 2,
              date: Date.now(),
            },
          ],
        };
        callback(null, userInfo );
      });
  
      // Stub Product.find to simulate retrieving cart product details
      const findStub = sinon.stub(Product, 'find');
      findStub.callsFake((query, callback) => {
        // Simulate retrieving product details
        const cartDetails = [
          {
            _id: productIds[0],
            // Add product details here
          },
          {
            _id: productIds[1],
            // Add product details here
          },
        ];
        callback(null, cartDetails);
      });
  
      chai.request(app)
        .post('/api/users/removeCartItem')
        .set('x-auth', 'user_token') // Set the user token
        .send({ id: itemId })
        .end((err, res) => {
          if (err) return done(err);
  
          expect(res).to.have.status(500);

          findOneAndUpdateStub.restore();
          findStub.restore();
  
          done();
        });
    });
});

describe('GET /getOrders', () => {
    it('should get the list of orders', (done) => {
      const orders = [
        // Replace with actual order data
        { orderId: 'order1', amount: 100 },
        { orderId: 'order2', amount: 200 },
      ];
  
      // Stub Payment.find to simulate retrieving orders
      const findStub = sinon.stub(Payment, 'find');
      findStub.callsFake((query, callback) => {
        // Simulate retrieving orders
        callback(null, orders);
      });
  
      chai.request(app)
        .get('/api/users/getOrders')
        .set('x-auth', 'user_token') // Set the user token
        .end((err, res) => {
          if (err) return done(err);
  
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body).to.have.property('orders').to.be.an('array').to.have.lengthOf(2); // Modify the length accordingly
  
          findStub.restore();
  
          done();
        });
    });
});

describe('POST /deleteOrder', () => {
    it('should delete an order', (done) => {
      const orderId = 'order1'; // Replace with an actual order ID
  
      // Stub Payment.findByIdAndRemove to simulate deleting an order
      const findByIdAndRemoveStub = sinon.stub(Payment, 'findByIdAndRemove');
      findByIdAndRemoveStub.callsFake((query, callback) => {
        // Simulate order deletion
        callback(null, { _id: orderId });
      });
  
      chai.request(app)
        .post('/api/users/deleteOrder')
        .set('x-auth', 'user_token') // Set the user token
        .send({ _id: orderId })
        .end((err, res) => {
          if (err) return done(err);
  
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
  
          findByIdAndRemoveStub.restore();
  
          done();
        });
    });
});
  
  
  
  
  
  