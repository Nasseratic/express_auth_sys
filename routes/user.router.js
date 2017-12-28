const express = require('express');
const router = express.Router();
// const passport = require('passport')
// const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const Roll = require('../models/Roll');


// -------------------------------------------- get ----------------------------------
router.get('/user', (req, res, next) => {
    User
        .find({})
        .exec((err, users) => {
            if (err) {
                next(err);
            }
            res.json(users);
        });
});


// ---------------------------------- update -------------------------------------
router.put('/user/:id', (req, res, next) => {
    let {id}= req.params,
        user = req.body;
    user.img = Buffer.from(user.img, 'base64').toString();
    Roll
    .findOne({
        name: user.roll
    })
    .exec((err, roll) => {
        if (err) {
            next(err);
        }
        user.roll = roll._id;
        User.updateUser( id , user , (err) => {
            if (err) {
                next(err);
            }else{
                res.json("updated");
            }
        });
    });
});

// ------------------------ add ---------------------------------------
router.post('/user', function (req, res, next) {
    let user = req.body;
    user.img = Buffer.from(user.img, 'base64').toString();

    // I think its better to use populate here instead of nested execs :"D
    Roll
        .findOne({
            name: user.roll
        })
        .exec((err, roll) => {
           
            if (err) {
                next(err);
            }else{
                user.roll = roll._id;
                User.createUser( new User(user) , (err, saved) => {
                    if (err) {
                        next(err);
                    }else{
                        res.json( saved );
                    }
                });
            }
            
        });
});



// ----------------------- delete -------------------
router.delete('/user/:id', (req, res, next) => {
    let id = req.params.id;
    User
        .remove({
            _id: id
        })
        .exec((err, user) => {
            if (err) {
                next(err);
            }else{
                res.send("USER DELETED")
            }
        });
});




router.get('/logout', function (req, res) {
    req.logout();
    res.send('You are logged out');
});


module.exports = router