const chai = require('chai');
const superTest = require('supertest');

const expect  = chai.expect;
const requester = superTest('http://localhost:8080');

describe('Testing session', function () {

  it('should login a user', async function () {
    const mockUser= {
        email: 'test@gmail.com',
        password: 'test_password'
    }

    const result = await requester.post('/api/sessions/login').send(mockUser);
    const cookieResult = result.headers['set-cookie'][0];
    const cookie = {
      name: cookieResult.split('=')[0],
      value: cookieResult.split('=')[1]
    }
    
    expect(cookieResult).to.be.ok;
    expect(cookie.name).to.be.ok.and.eql('coderCookieToken');
    expect(cookie.value).to.be.ok;
  })
})
