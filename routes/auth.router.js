const express = require('express')
const router = express.Router()
const User = require('../models/User');



// ----------------- LOGIN ---------------------
router.post('/login', (req, res, next) => {
    let {email} = req.body, 
    {password} = req.body;
    
    User.auth( email , password ,  (err, isMatch , token) => {
        if (err) throw err;
        if (isMatch) {
            res.header('x-token',token).send("logged in");
        } else {
            return next({
                message: 'Invalid email or password',
                status: 400
            });
        }
    });

});

// ----------------- LOGOUT ---------------------
router.get('/logout', (req, res, next) => {
    let token = req.header('x-token');
    if( token ){
        User.findOne({token}).exec((err,user) =>{
            if(user){
                user.token = " ";
                user.save().then( () =>{
                    res.send("you are out");
                });
            }else{
                next();
            }
        });
    }else{
        next();
    }
});


module.exports = router