const request = require('supertest');
const app = require('./../src/app');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const User = require('../src/models/user')

const userOneID = new mongoose.Types.ObjectId();

const userOne = {
    _id: userOneID,
    name: 'Mike',
    email:'mike@gmail.ocm',
    password: 'redHook',
    tokens: [{
        token: jwt.sign({ _id: userOneID }, process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
    await User.deleteMany();
    const user =  new User(userOne)
    await user.save()
});

test('Should sign up a new user', async () => {
    await request(app).post('/users').set('Content-Type', 'application/json').send({
        name: 'Grunt',
        email:'lik@gmail.com',
        password: 'redHook'
    }).expect(201)
});

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
});

test('Should not login  nonexisting user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'thisIsNotMyPass'
    }).expect(400)
});

test('Should get profile for user', async () => {
    await request(app)
    .get('/users/me')
    .set('Auzthorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
});

test('Should not get unauthentificated user', async () => {
    await request(app).get('/users/me').send().expect(401)
});

test('Should delete account for user', async () => {
    await request(app).delete('users/me')
    .set('Auzthorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
});

test('Should not delete account for unauthentificated user', async () => {
    await request(app).delete('users/me').send().expect(401)
})