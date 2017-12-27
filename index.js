const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const middlewares = require('./middlewares');
const user = require('./routes/user.router');
const auth = require('./routes/auth.router');

// Db connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://root:root@ds131237.mlab.com:31237/dotdev_task', {
    useMongoClient: true
  }).then(() =>{
      console.log('Connected');
  }).catch((err)=>{
      if(err) throw err;
      console.log('Connection error');
  });

var app = express();

app.use( '/' , middlewares.CROS);
app.use( '/' , middlewares.bodyParse);
app.use( '/' , middlewares.urlencodedParser);
app.use( '/' , middlewares.removePowered);

// -------------- PASSPORT --------------------
// passport.serializeUser(function(user, done) {
//     done(null, user.id);
// });
   
// passport.deserializeUser(function(id, done) {
//     User.getUserById(id, function(err, user) {
//     done(err, user);
//     });
// });

// passport.use(new LocalStrategy(
//     function(email, password, done) {
//     User.getUserByEmail(email, function(err, user){
//         if(err) throw err;
//         if(!user){
//             return done(null, false, {message: 'Unknown User'});
//         }
//         User.comparePassword(password, user.password, function(err, isMatch){
//             if(err) throw err;
//             if(isMatch){
//                 return done(null, user);
//             } else {
//                 return done(null, false, {message: 'Invalid password'});
//             }
//         });
//     });
// }));


// router.post('/login',
//     passport.authenticate('local') , (req, res , next) => {

//         res.cookie('TOKEN', req.user.FB_TOKEN , {
// 			httpOnly: true,
// 			maxAge: 4 * 60 * 60 * 1000
// 		})
// 		next()
//     }
// );


// -----------------------------AUTH ROUTES --------------------
app.use('/', auth);


// ---------------------------- USER ROUTES --------------------
app.use('/', middlewares.isAuthenticated , user)



app.use( '/' , middlewares.handelErrors);
// catch 404. 404 should be consider as a default behavior, not a system error.
app.use(function(req, res, next) {
    res.status(404);
    res.send('Not Found');
});

app.listen(3000);