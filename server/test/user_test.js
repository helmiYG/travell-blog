var app = 'http://localhost:3000'
var chai = require('chai');
var expect = chai.expect;
var mongoose = require('mongoose');
var chaiHttp = require('chai-http');
chai.use(chaiHttp)
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const User = require('../models/user');
require('dotenv').config()

describe('Users', function () {
    this.timeout(10000)
    beforeEach(function (done) {
        mongoose.connect(process.env.test, { useNewUrlParser: true })
            .then((result) => {
                let name = 'wahyu'
                let password = 'wahyu'
                let email = 'wahyu@mail.com'
                var hash = bcrypt.hashSync(password, salt);
                User.create({
                        name: name,
                        email: email,
                        password: hash
                    })
                    .then((result) => {
                        console.log(result, 'ini before');
                        done()
                    })
                    .catch((err) => {
                       console.log(err);
                       
                        done()
                    });
            }).catch((err) => {
                console.log(err);
                done()
            });

    });

    it('POST /register should return info user registered', function (done) {
        chai.request(app)
            .post('/users/register')
            .send({
                name: 'andre',
                email: 'andre@mail.com',
                password: '12345'
            })
            .end(function (err, res) {
                expect(res.body).to.be.a('object')
                expect(res.body.result).to.have.property('name')
                expect(res.body.result).to.have.property('email')
                expect(res.body.result).to.have.property('password')
                expect(res.body.result.name).to.equal('andre')
                expect(res.body.result.email).to.equal('andre@mail.com')
                expect(res.body.msg).to.equal('register succes')
                expect(res).to.have.status(201)
                done()
            })
    }),

    it('POST /login should return token', function(done){
        chai.request(app)
            .post('/users/login')
            .send({
                email: 'wahyu@mail.com', 
                password: 'wahyu'
            })
            .end(function (err, res) {
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property('msg')
                expect(res.body).to.have.property('token')
                expect(res.body.msg).to.equal('succes login')
                done()
            })
    })


    it('POST /register should return msg error form required', function(done){
        chai.request(app)
            .post('/users/register')
            .send({
                name: '',
                email: '',
                password: ''
            })
            .end(function(err, res){
                expect(res).to.have.status(400)
                expect(res.body).to.have.property('msg')
                expect(res.body).to.have.property('err')
                done()
            })
    })

    afterEach(function (done) {
        mongoose.connect(process.env.test,{ useNewUrlParser: true })
        .then((result) => {
            User.collection.drop()
            .then((result) => {
                console.log('masuk after');
                done()
            })
            .catch((err) => {

                done()
            });
        }).catch((err) => {
            done()
        });
       
    })
});