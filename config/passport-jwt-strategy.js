const passport= require('passport');
const JWTStrategy= require('passport-jwt').Strategy;
const ExtractJWT= require('passport-jwt').ExtractJwt;
const User= require('../models/user');
const env=require('./enviroment');
let opts ={
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_secret
}
passport.use(new JWTStrategy(opts, function(jwtPayload, done)
{
User.findById(jwtPayload._id,function(error, user)
{
    if(error){console.log("ERror in finding user Using JWT"); return;}
    if(user){ return done(null , user);}
    else{return done(null, false);}
})
}));
module.exports=passport;
