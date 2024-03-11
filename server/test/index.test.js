const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js');
const expect = chai.expect;

chai.use(chaiHttp);

describe('API Routes', () => {
  it('should respond with "hi" for GET /', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('Hello mern stack');
        done();
      });
  });
});
