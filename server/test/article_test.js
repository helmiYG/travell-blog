// var app = 'http://localhost:3000'
// var chai = require('chai');
// var expect = chai.expect;
// var mongoose = require('mongoose');
// var chaiHttp = require('chai-http');
// chai.use(chaiHttp)
// const bcrypt = require('bcryptjs');
// var salt = bcrypt.genSaltSync(10);
// const User = require('../models/user');
// const Article = require('../models/article');
// require('dotenv').config()

// let token = ''
// let idUser = ''
// let idArticle = ''
// let idComment = ''
// let idCommenter = ''
// describe('Article', function () {
//     this.timeout(100000)

//     before(function (done) {
//         mongoose.connect(process.env.test, {
//                 useNewUrlParser: true
//             })
//             .then((result) => {
//                 let name = 'wahyu'
//                 let password = 'wahyu'
//                 let email = 'wahyu@mail.com'
//                 var hash = bcrypt.hashSync(password, salt);
//                 User.create({
//                         name: name,
//                         email: email,
//                         password: hash
//                     })
//                     .then((resultReg) => {
//                         chai.request(app)
//                             .post('/users/login')
//                             .send({
//                                 email: email,
//                                 password: password
//                             })
//                             .end(function (err, res) {
//                                 token = res.body.token
//                                 idUser = resultReg._id
//                                 done()
//                             })
//                     })
//                     .catch((err) => {

//                         done()
//                     });
//             })
//             .catch((err) => {

//             });
//     })

//     it('POST /articles should return info new article', function (done) {
//         chai.request(app)
//             .post('/articles')
//             .set('token', token)
//             .send({
//                 title: 'title',
//                 category: 'category',
//                 content: 'content',
//                 image: 'https://www.w3schools.com/w3css/img_lights.jpg',
//                 userId: idUser
//             })
//             .end(function (err, res) {
//                 idArticle = res.body.result._id
//                 expect(res).to.have.status(201)
//                 expect(res.body).to.be.a('object')
//                 expect(res.body.result).to.be.a('object')
//                 expect(res.body.result).to.have.property('_id')
//                 expect(res.body.result).to.have.property('title')
//                 expect(res.body.result).to.have.property('category')
//                 expect(res.body.result).to.have.property('userId')
//                 expect(res.body.result).to.have.property('content')
//                 expect(res.body.result).to.have.property('image')
//                 expect(res.body.result).to.have.property('comments')
//                 expect(res.body.result).to.have.property('createdAt')
//                 expect(res.body.result).to.have.property('updatedAt')
//                 expect(res.body.result.title).to.equal('title')
//                 expect(res.body.result.category).to.equal('category')
//                 expect(res.body.result.content).to.equal('content')
//                 expect(res.body.result.image).to.equal('https://www.w3schools.com/w3css/img_lights.jpg')
//                 done()
//             })
//     })

//     it('GET /articles should return all info article', function (done) {
//         chai.request(app)
//             .get('/articles')
//             .set('token', token)
//             .end(function (err, res) {
//                 expect(res).to.have.status(200)
//                 expect(res.body).to.be.a('object')
//                 expect(res.body.result).to.be.a('array')
//                 expect(res.body.result[0]).to.have.property('_id')
//                 expect(res.body.result[0]).to.have.property('title')
//                 expect(res.body.result[0]).to.have.property('category')
//                 expect(res.body.result[0]).to.have.property('userId')
//                 expect(res.body.result[0]).to.have.property('content')
//                 expect(res.body.result[0]).to.have.property('image')
//                 expect(res.body.result[0]).to.have.property('comments')
//                 expect(res.body.result[0]).to.have.property('createdAt')
//                 expect(res.body.result[0]).to.have.property('updatedAt')
//                 expect(res.body.result[0].title).to.equal('title')
//                 expect(res.body.result[0].category).to.equal('category')
//                 expect(res.body.result[0].content).to.equal('content')
//                 expect(res.body.result[0].image).to.equal('https://www.w3schools.com/w3css/img_lights.jpg')
//                 done()
//             })
//     })

//     it('PUT /articles/:id should update info by id', function (done) {
//         chai.request(app)
//             .put(`/articles/${idArticle}`)
//             .set('token', token)
//             .send({
//                 title: 'new title',
//                 category: 'new category',
//                 content: 'new content',
//             })
//             .end(function (err, res) {
//                 expect(res).to.have.status(201)
//                 expect(res.body).to.be.a('object')
//                 expect(res.body.result).to.be.a('object')
//                 expect(res.body.result).to.have.property('n')
//                 expect(res.body.result).to.have.property('nModified')
//                 expect(res.body.result).to.have.property('opTime')
//                 expect(res.body.result).to.have.property('electionId')
//                 expect(res.body.result).to.have.property('ok')
//                 expect(res.body.result.n).to.equal(1)
//                 expect(res.body.result.nModified).to.equal(1)
//                 expect(res.body.result.ok).to.equal(1)
//                 done()
//             })
//     })

//     it('GET /articles/userarticle should return all info article user login', function (done) {
//         chai.request(app)
//             .get('/articles/userarticles')
//             .set('token', token)
//             .end(function (err, res) {
//                 expect(res).to.have.status(200)
//                 expect(res.body).to.be.a('object')
//                 expect(res.body.result).to.be.a('array')
//                 expect(res.body.result[0]).to.have.property('_id')
//                 expect(res.body.result[0]).to.have.property('title')
//                 expect(res.body.result[0]).to.have.property('category')
//                 expect(res.body.result[0]).to.have.property('userId')
//                 expect(res.body.result[0]).to.have.property('content')
//                 expect(res.body.result[0]).to.have.property('image')
//                 expect(res.body.result[0]).to.have.property('comments')
//                 expect(res.body.result[0]).to.have.property('createdAt')
//                 expect(res.body.result[0]).to.have.property('updatedAt')
//                 expect(res.body.result[0].title).to.equal('new title')
//                 expect(res.body.result[0].category).to.equal('new category')
//                 expect(res.body.result[0].content).to.equal('new content')
//                 expect(res.body.result[0].userId).to.be.a('object')
//                 expect(res.body.result[0].userId).to.have.property('_id')
//                 expect(res.body.result[0].userId).to.have.property('name')
//                 expect(res.body.result[0].userId).to.have.property('email')
//                 expect(res.body.result[0].userId.name).to.equal('wahyu')
//                 expect(res.body.result[0].userId.email).to.equal('wahyu@mail.com')
//                 done()
//             })
//     })

//     it('PUT /articles/:id/comment should return new comment',function(done){
//         chai.request(app)
//             .put(`/articles/${idArticle}/comment`)
//             .set('token', token)
//             .send({
//                 comment: 'comment test'
//             })
//             .end(function(err, res) {
//                 expect(res).to.have.status(201)
//                 expect(res.body).to.be.a('object')
//                 expect(res.body).to.have.property('n')
//                 expect(res.body).to.have.property('nModified')
//                 expect(res.body).to.have.property('opTime')
//                 expect(res.body).to.have.property('electionId')
//                 expect(res.body).to.have.property('ok')
//                 expect(res.body.n).to.equal(1)
//                 expect(res.body.nModified).to.equal(1)
//                 expect(res.body.ok).to.equal(1)
//                 done()
                
//             })
//     })

//     it('GET /articles/detailarticle/:id should return detail article selected', function (done){
//         chai.request(app)
//             .get(`/articles/${idArticle}/detailarticle`)
//             .end(function(err, res) {
//                 idComment = res.body.comments[0]._id
//                 idCommenter = res.body.comments[0].commenterId
//                 expect(res).to.have.status(200)
//                 expect(res.body).to.be.a('object')
//                 expect(res.body).to.have.property('_id')
//                 expect(res.body).to.have.property('title')
//                 expect(res.body).to.have.property('category')
//                 expect(res.body).to.have.property('userId')
//                 expect(res.body).to.have.property('content')
//                 expect(res.body).to.have.property('image')
//                 expect(res.body).to.have.property('comments')
//                 expect(res.body).to.have.property('createdAt')
//                 expect(res.body).to.have.property('updatedAt')
//                 expect(res.body.title).to.equal('new title')
//                 expect(res.body.category).to.equal('new category')
//                 expect(res.body.content).to.equal('new content')
//                 expect(res.body.userId).to.be.a('object')
//                 expect(res.body.userId).to.have.property('_id')
//                 expect(res.body.userId).to.have.property('name')
//                 expect(res.body.userId).to.have.property('email')
//                 expect(res.body.userId.name).to.equal('wahyu')
//                 expect(res.body.userId.email).to.equal('wahyu@mail.com')
//                 done()
//             })
//     })

//     it('PUT /articles/:id/comment/:idComment/delete should delete a comment', function(done){
//         chai.request(app)
//             .put(`/articles/${idArticle}/comment/${idComment}/delete`)
//             .set('token', token)
//             .end(function(err, res){
//                 expect(res).to.have.status(201)
//                 expect(res.body.updated).to.be.a('object')
//                 expect(res.body.updated).to.have.property('n')
//                 expect(res.body.updated).to.have.property('nModified')
//                 expect(res.body.updated).to.have.property('opTime')
//                 expect(res.body.updated).to.have.property('electionId')
//                 expect(res.body.updated).to.have.property('ok')
//                 expect(res.body.updated.n).to.equal(1)
//                 expect(res.body.updated.nModified).to.equal(1)
//                 expect(res.body.updated.ok).to.equal(1)

//                 done()
//             })



//     })

//     it('DELETE /articles/:id should delete a selected article', function(done){
//         chai.request(app)
//             .delete(`/articles/${idArticle}`)
//             .set('token', token)
//             .end(function (err, res) {
//                 expect(res).to.have.status(201)
//                 expect(res.body).to.be.a('object')
//                 expect(res.body.result).to.be.a('object')
//                 expect(res.body.result).to.have.property('n')
//                 expect(res.body.result).to.have.property('opTime')
//                 expect(res.body.result).to.have.property('electionId')
//                 expect(res.body.result).to.have.property('ok')
//                 expect(res.body.result.n).to.equal(1)
//                 expect(res.body.result.ok).to.equal(1)
//                 done()
//             })
//     })

//     after(function (done) {
//         mongoose.connect(process.env.test, {
//                 useNewUrlParser: true
//             })
//             .then((result) => {
//                 User.collection.drop()
//                     .then((result) => {
//                         mongoose.connect(process.env.test, {
//                                 useNewUrlParser: true
//                             })
//                             .then((result) => {
//                                 Article.collection.drop()
//                                     .then((result) => {
//                                         console.log('masuk after');
//                                         done()
//                                     })
//                                     .catch((err) => {

//                                         done()
//                                     });
//                             }).catch((err) => {
//                                 done()
//                             });
//                     })
//                     .catch((err) => {

//                         done()
//                     });
//             }).catch((err) => {
//                 done()
//             });

//     })


// })