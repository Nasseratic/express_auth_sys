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

// ----------------- LOGIN ---------------------
router.post('/logout', (req, res, next) => {
    let token = req.header('x-token');
    if( token ){
        User.findOne({token})
    }else{
        next();
    }
});


module.exports = router