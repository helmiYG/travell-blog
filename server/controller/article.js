const Article = require('../models/article');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
let jwt = require('jsonwebtoken');

module.exports = {
    insertArtikel: (req, res) => {
        Article.create({
                title: req.body.title,
                category: req.body.category,
                userId: req.userLogin._id,
                content: req.body.content,
                image: req.body.image
            })
            .then((result) => {
                res.status(201).json({
                    result
                })
            })
            .catch((err) => {
                res.status(500)
            });
    },
    getArtikel: (req, res) => {
        Article.find().populate('userId')
            .then((result) => {
                res.status(200).json({
                    result
                })
            })
            .catch((err) => {
                res.status(500)
            });
    },

    updateArtikel: (req, res) => {
        Article.findById({
                _id: req.params.id
            })
            .then((result) => {
                if (result) {
                    if (String(result.userId) === String(req.userLogin._id)) {
                        Article.updateOne({
                                _id: req.params.id
                            }, {
                                title: req.body.title,
                                category: req.body.category,
                                content: req.body.content
                            })
                            .then((result) => {
                                res.status(201).json({
                                    result
                                })
                            })
                            .catch((err) => {
                                res.status(500)
                            });
                    }

                    // 
                } else {
                    res.status(400).json({
                        msg: 'data not found'
                    })
                }
            })
            .catch((err) => {

            });

    },

    deleteArtikel: (req, res) => {
        Article.deleteOne({
                _id: req.params.id
            })
            .then((result) => {
                res.status(201).json({
                    result
                })
            })
            .catch((err) => {
                res.status(500)
            });

    },

    getUserArtikel: (req, res) => {

        Article.find({
                userId: req.userLogin._id
            }).populate('userId')
            .then((result) => {
                console.log(result);

                res.status(200).json({

                    result
                })
            })
            .catch((err) => {
                res.status(500)
            });
    },

    getOneArticle: (req, res) => {
        let idArticle = req.params.id
        Article.findOne({
                _id: idArticle
            }).populate('userId')
            .then((article) => {
                res.status(200).json(
                    article
                )
            })
            .catch((err) => {
                res.status(400).json(err)
            });
    },

    addComments: (req, res) => {
        let idArticle = req.params.id
        console.log('masuk palk eko');

        let obj = {
            commenterId: req.userLogin._id,
            commenterName: req.userLogin.name,
            comment: req.body.comment
        }
        Article.updateOne({
                _id: idArticle
            }, {
                $push: {
                    comments: obj
                }
            })
            .then((result) => {
                res.status(201).json(result)

            }).catch((err) => {
                res.status(400).json(err)
            });
    },
    deleteComment: (req, res) => {
        let idArticle = req.params.id
        let idComment = req.params.idComment
        Article.findOne({
                _id: idArticle
            })
            .then((result) => {
                if (result) {
                    let confirm = false
                    result.comment.forEach(element => {
                        if (String(element.commenterId) === String(req.userLogin._id)) {
                            confirm = true
                        }
                    });
                    if (String(result.userId) === String(req.userLogin._id) || confirm) {
                        Article.updateOne({
                                _id: idArticle
                            }, {
                                $pull: {
                                    comment
                                    
                                    
                                }
                            })
                            .then((result) => {
                                res.status(201).json({
                                    result
                                })
                            }).catch((err) => {
                                res.status(400).json(err)
                            });
                    } else {
                        res.status(400).json({
                            msg: 'you are not authorized'
                        })
                    }
                } else {
                    res.status(400).json({
                        msg: 'data not found'
                    })
                }
            })
            .catch((err) => {

            });

    }
};