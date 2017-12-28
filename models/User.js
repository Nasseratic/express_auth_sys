var mongoose = require('mongoose');
var bcrypt = require('bcrypt') , Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');


// User Schema
var UserSchema = mongoose.Schema({
    email :{
        type: String,
        required : true,
        match: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
        index:true,
        unique: true
    },
    password :{
        type: String,
        required : true,
    },
    first_name :{
        type: String,
        required : true,
    },
    last_name :{
        type: String,
        required : true,
    },
    img: { 
        type: String,
    },
    roll :{ 
        required : true,
        type: Schema.Types.ObjectId,
         ref: 'Roll' 
    },
    token:{
        type: String
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

// create a user + hashing the password
module.exports.createUser = (newUser, callback) => {
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash( newUser.password   , salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

// update user + hashing the password
module.exports.updateUser = (id, user, callback) => {
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(  user.password  , salt, function(err, hash) {
	        user.password = hash;
	        User
            .findByIdAndUpdate( id , user)
            .exec( (err,updated)=>{
                callback(err);
            });
	    });
	});
}

// login auth 
module.exports.auth = (email, password , callback) => {
	var query = {email: email};
	User.findOne(query).exec( (err , user) =>{
       if(err) throw err;        
        bcrypt.compare( password , user.password , function(err, isMatch) {
            let token = jwt.sign( user._id.toHexString()+';'+ new Date().toString() , 'dotdevkey').toString();
            user.token = token;
            user.save().then(()=>{
                callback(null, isMatch , token);
            });
        });
    });
}

// check token
module.exports.authCheck = (token , callback ) => {
	User.findOne({token}).exec( (err , user) =>{
       if(err){
           throw err;
        }
        callback(user);
    });
}