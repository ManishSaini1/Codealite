const  passport= require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User= require('../models/user');

passport.use( new LocalStrategy({
        usernameField : 'email'
    },
        function(email, password, done)
        {
                User.findOne({email  :email}, function(error, user)
                {
                    if(error){console.log("Error in finding User ---> Passportjs"); return done(error);}
                    if(!user || user.password!=password)
                    {
                        console.log(" Invalid User Name/ password");
                        return done(null, false);
                    }
                    return done(null, user);

                })
        }
     ));

     // Serialize the useruser to decide which key is to be kept in the Cookie
     passport.serializeUser(function(user, done)
     {
         done(null,  user);
     });
     //deserialize the user from the key in the cookie
     passport.deserializeUser(function(id, done)
     {
                User.findById(id, function(error, user)
                {
                    if(error){console.log("Error in finding user -->> passpoer");return done(error);}
                    return done(null, user);
                });
     });
     passport.checkAuthentication= function(req,res , next)
     {
         if(req.isAuthenticated())
         {
                return next();
         }
         return res.redirect('/users/sign-in');
     }
     passport.setAuthenticatedUser =  function(req, res, next)
     {
         if(req.isAuthenticated())
         {
                            res.locals.user=req.user;
         }
         next();
     }

     module.exports=passport;    