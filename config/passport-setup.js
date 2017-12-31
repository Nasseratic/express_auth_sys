const passport = require('passport');













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
