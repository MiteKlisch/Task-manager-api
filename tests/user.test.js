const request = require('supertest');
const app = require('./../src/app');


beforeEach(() => {
    console.log('beforeEach')
});
afterEach(() => {
    console.log('afterEach')
})
test('Should sign up a new user', async () => {
    await request(app).post('/users').set('Content-Type', 'application/json').send({
        name: 'Grunt',
        email:'lik@gmail.com',
        password: 'redHook'
    }).expect(201)
})