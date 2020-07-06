const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
var kue = require('kue');
//let ejs=require('ejs');
const expressLayout= require('express-ejs-layouts');
const db = require("./config/mongoose");
const session=require('express-session');
const passport= require('passport');
const passportJWT= require('./config/passport-jwt-strategy');
const passportLocal= require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo')(session);
const saasMiddleware= require('node-sass-middleware');
const flash= require('connect-flash');
const customMware =require('./config/middleware');
const passportGoogle= require('./config/passport-google-outh2-strategy');
const cors=require('cors');
app.use(cors());
//marked debug false for now
app.use(saasMiddleware({
    src: './assets/scss',
     dest: './assets/css', 
     debug: false,
     outputStyle: 'extended',
     prefix: '/css'   
}));


// for getting the data of psot request
app.use(express.urlencoded());

//cookie parser
app.use(cookieParser());
app.use(express.static('./assets'));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(expressLayout);
app.set('layout extractStyles' ,true);
app.set('layout extractScripts' ,true);


 //const path=require('path');
// app.set('view engine', 'ejs');
 app.set('view engine', 'ejs');
 app.set('views', './views');
// const path=require('path');

// mongo store is used to store the session cookie
app.use(session(
    {
        name:"codealite",
        //TODO befor Deployment
        secret:"blasomething",
        saveUninitialized:true,
        resave:true,
        cookie:{
            maxAge: (1000*60*10*60)
        },
        store: new MongoStore(
            {
                mongooseConnection  :db,
                autoremove :'disabled'
            },
            function(error)
            {
                if(error)
                {
                    console.log("error in storing cookies in mongoo");
                }
                else{ console.log("successfully stored");
            }
            })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
app.use('/', require('./routes'));

 
// app.set('views', path.join(__dirname, 'views'));
//kue.app.set('title', 'My Application');
//kue.app.listen(3000);
app.listen(port,function(error)
{
       if(error)
       {
           console.log(`Error in running server ${port}`);
       }
       console.log(`Server is running on port ${port}`);
});       