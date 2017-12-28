const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('./models/User');
const jwt = require('jsonwebtoken');


const bodyParse = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended : false});

// remove Powered by express
const removePowered = (req, res, next) => {
	res.header("X-Powered-By","DotDev:Mohamed");
    next();
};

// handel server errors  
const handelErrors = (err, req, res, next) => {
		if(err.message){
			res.end(err.message);
		}else{
			res.end("UNKOWNEN ERROR");
		}
};

// CORS
const CROS = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
};

const isAuthenticated = (req, res, next) => {
	token = req.header('x-token');
	if(!token){ 
		res.status(400).send('unauthenticated'); 
	}else{
		User.authCheck( token , (user) =>{
			if(!user){ res.status(400).send('unauthenticated'); }
			next();
		});	
	}
	
}


module.exports = {
	isAuthenticated,
	CROS,
	handelErrors,
	removePowered,
	bodyParse,
	urlencodedParser
}