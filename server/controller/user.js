const User = require('../models/user');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
let jwt = require('jsonwebtoken');

module.exports = {
    insertUser:(req, res)=>{
        const {name, email, password} = req.body
        var hash = bcrypt.hashSync(password, salt);
        User.create({
            name: name,
            email : email,
            password: hash
        })
        .then((result) => {
            if (result) {
                res.status(201).json({
                    result,
                    msg: 'register succes'
                })
            } else {
                res.status(400).json({
                    msg :'email duplicated / value is null',
                    err
                })
            }
          
        })
        .catch((err) => {
            res.status(400).json({
                msg :'email duplicated / value is null',
                err
            })
        });
    },

    login: (req, res) => {
        const {email, password} = req.body
        User.findOne({email: email})
        .then((result) => {
            if(result){
                let decrypted = bcrypt.compareSync(password, result.password);
                if (decrypted) {
                    let token = jwt.sign({
                        email: result.email,
                        name: result.name,
                        id: result._id
                    }, process.env.secret)

                    res.status(200).json({
                        msg: 'succes login',
                        token
                        
                    })
                } else {
                    res.status(400).json({
                        msg: 'password salah pak ekoooo'
                    })
                }
            } else {
                res.status(400).json({
                    msg: 'user ga ada pak ekoooo'
                })
            }
        })
        .catch((err) => {
            res.status(400).json({
                msg: err.message
            })
        });
    }

};
